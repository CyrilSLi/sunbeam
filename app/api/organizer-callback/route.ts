import { NextRequest, NextResponse } from "next/server";
import { OAUTH_STATE_COOKIE, parseOAuthState } from "@/app/lib/oauth-state";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");
  const state = request.nextUrl.searchParams.get("state");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const base = forwardedHost
    ? `${forwardedProto}://${forwardedHost}`
    : request.nextUrl.origin;
  const organizers = new URL("/organizers", base);

  const { nonce, returnTo: returnToPath } = parseOAuthState(state);
  // Only relative, same-site paths are honored — anything else (or absent) falls back to /organizers.
  const returnTo = returnToPath && returnToPath.startsWith("/") && !returnToPath.startsWith("//")
    ? new URL(returnToPath, base)
    : organizers;

  function abort() {
    const response = NextResponse.redirect(returnTo);
    response.cookies.set(OAUTH_STATE_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  }

  const expectedNonce = request.cookies.get(OAUTH_STATE_COOKIE)?.value;
  const stateValid = Boolean(expectedNonce) && nonce === expectedNonce;

  if (error || !code || !stateValid) {
    if (!error && code && !stateValid) {
      console.error("[organizer-callback] state mismatch — possible CSRF, aborting login");
    }
    return abort();
  }

  const redirectUri = `${base}/api/organizer-callback`;

  const tokenRes = await fetch("https://auth.hackclub.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.HCA_CLIENT_ID,
      client_secret: process.env.HCA_CLIENT_SECRET,
      redirect_uri: redirectUri,
      code,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    console.error("[organizer-callback] token exchange failed:", tokenRes.status, err);
    console.error("[organizer-callback] redirect_uri used:", redirectUri);
    return abort();
  }

  const { access_token } = await tokenRes.json();
  const response = NextResponse.redirect(returnTo);

  response.cookies.set("hca_token", access_token, {
    path: "/",
    maxAge: 60 * 60 * 8,
    httpOnly: true,
    sameSite: "lax",
  });
  response.cookies.set(OAUTH_STATE_COOKIE, "", { path: "/", maxAge: 0 });

  return response;
}
