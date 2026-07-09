import "server-only";
import { cookies } from "next/headers";

async function getApprovedOrganizerEmails(): Promise<string[]> {
  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.records ?? [])
    .filter((r: { fields: { approve_as_org?: string } }) => r.fields.approve_as_org === "approved")
    .map((r: { fields: { email?: string } }) => r.fields.email?.toLowerCase())
    .filter(Boolean);
}

export async function requireOrganizer(): Promise<Response | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("hca_token")?.value;
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const meRes = await fetch("https://auth.hackclub.com/api/v1/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await meRes.json();
  const email: string = user.identity?.primary_email?.toLowerCase() ?? "";
  if (!email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizerEmails = await getApprovedOrganizerEmails();
  if (!organizerEmails.includes(email)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
