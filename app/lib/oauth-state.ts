import "server-only";

// Anti-CSRF protection for the HCA OAuth login flows: a random nonce is minted and stored
// in a short-lived httpOnly cookie when a flow starts, then compared against the `state`
// query param the callback receives. Without this, an attacker could complete their own
// OAuth flow, hand a victim a link containing the attacker's `code`, and have the victim's
// browser end up authenticated as the attacker (login CSRF).
export const OAUTH_STATE_COOKIE = "oauth_state";
export const OAUTH_STATE_MAX_AGE = 60 * 10; // 10 minutes — long enough to complete the HCA login

export function createOAuthState(returnTo?: string): { nonce: string; state: string } {
  const nonce = crypto.randomUUID();
  const state = returnTo ? `${nonce}.${encodeURIComponent(returnTo)}` : nonce;
  return { nonce, state };
}

export function parseOAuthState(state: string | null): { nonce: string | null; returnTo?: string } {
  if (!state) return { nonce: null };
  const dot = state.indexOf(".");
  if (dot === -1) return { nonce: state };
  return { nonce: state.slice(0, dot), returnTo: decodeURIComponent(state.slice(dot + 1)) };
}
