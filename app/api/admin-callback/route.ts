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
	const adminUrl = new URL("/admin", base);
	const redirectUri = `${base}/api/admin-callback`;

	function abort() {
		const response = NextResponse.redirect(adminUrl);
		response.cookies.set(OAUTH_STATE_COOKIE, "", { path: "/", maxAge: 0 });
		return response;
	}

	const expectedNonce = request.cookies.get(OAUTH_STATE_COOKIE)?.value;
	const { nonce } = parseOAuthState(state);
	const stateValid = Boolean(expectedNonce) && nonce === expectedNonce;

	if (error || !code || !stateValid) {
		if (!error && code && !stateValid) {
			console.error("[admin-callback] state mismatch — possible CSRF, aborting login");
		}
		return abort();
	}

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
		return abort();
	}

	const { access_token } = await tokenRes.json();

	const response = NextResponse.redirect(adminUrl);
	response.cookies.set("hca_admin_token", access_token, {
		path: "/",
		maxAge: 60 * 60 * 8, // 8 hours for admin
		httpOnly: true,
		sameSite: "lax",
	});
	response.cookies.set(OAUTH_STATE_COOKIE, "", { path: "/", maxAge: 0 });

	return response;
}
