import { NextRequest, NextResponse } from "next/server";
import { OAUTH_STATE_COOKIE, OAUTH_STATE_MAX_AGE, createOAuthState } from "@/app/lib/oauth-state";

export async function GET(request: NextRequest) {
	const forwardedHost = request.headers.get("x-forwarded-host");
	const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
	const base = forwardedHost
		? `${forwardedProto}://${forwardedHost}`
		: request.nextUrl.origin;

	const clientId = process.env.HCA_CLIENT_ID ?? "";
	const redirectUri = `${base}/api/admin-callback`;
	const scopes = "openid profile email name";
	const { nonce, state } = createOAuthState();
	const authUrl =
		`https://auth.hackclub.com/oauth/authorize` +
		`?client_id=${encodeURIComponent(clientId)}` +
		`&redirect_uri=${encodeURIComponent(redirectUri)}` +
		`&response_type=code` +
		`&scope=${encodeURIComponent(scopes)}` +
		`&state=${encodeURIComponent(state)}`;

	const response = NextResponse.redirect(authUrl);
	response.cookies.set("hca_admin_token", "", { path: "/", maxAge: 0 });
	response.cookies.set(OAUTH_STATE_COOKIE, nonce, {
		path: "/",
		maxAge: OAUTH_STATE_MAX_AGE,
		httpOnly: true,
		sameSite: "lax",
	});
	return response;
}
