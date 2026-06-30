import { requireAdmin } from "@/app/lib/admin-auth";

export async function GET(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[get-all-apps] Airtable error:", err);
    return Response.json({ error: "Failed to fetch applications" }, { status: res.status });
  }

  const data = await res.json();

  return Response.json({ records: data.records });
}