import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

const VALID_STATUSES = ["approved", "rejected", "unreviewed"];
const AIRTABLE_RECORD_ID_REGEX = /^rec[a-zA-Z0-9]{14}$/;

export async function PATCH(request: Request) {
  const { id, status, eventId } = await request.json();

  if (
    !id ||
    typeof id !== "string" ||
    !AIRTABLE_RECORD_ID_REGEX.test(id) ||
    !VALID_STATUSES.includes(status)
  ) {
    return Response.json({ error: "invalid request" }, { status: 400 });
  }

  // Admin path: admins can update volunteers for any event, gated by admin auth only —
  // same split as PATCH /api/update-event-venue.
  if (eventId) {
    const denied = await requireAdmin();
    if (denied) return denied;
  } else {
    const role = await getOrganizerRole();
    if (!role.ok) return role.response;
    if (!role.roles.includes("nda-signed")) {
      return Response.json(
        { error: "You need to sign the NDA before you can review volunteers" },
        { status: 403 }
      );
    }
    const [ownId] = role.eventInfoIds;
    if (!ownId) {
      return Response.json({ error: "No event to update" }, { status: 404 });
    }

    // Verify this volunteer actually belongs to the organizer's own event before letting them
    // change its status — same event_info / ref_event fallback as get-event-volunteers.
    const [individuals, orgRecords] = await Promise.all([
      fetchAllAirtableRecords(process.env.AIRTABLE_ATTENDEE_TABLE_ID!),
      fetchAllAirtableRecords(process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID!),
    ]);
    const record = individuals.find((r) => r.id === id);
    if (!record || (record.fields.type as string | undefined) !== "volunteer") {
      return Response.json({ error: "Volunteer not found" }, { status: 404 });
    }

    const eventByOrgId = new Map(
      orgRecords.map((r) => [r.id, (r.fields.event_info as string[] | undefined)?.[0] ?? null])
    );
    const directEventIds = (record.fields.event_info as string[] | undefined) ?? [];
    const refEventIds = (record.fields.ref_event as string[] | undefined) ?? [];
    const belongsToOwnEvent =
      directEventIds.includes(ownId) || refEventIds.some((orgId) => eventByOrgId.get(orgId) === ownId);
    if (!belongsToOwnEvent) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  try {
    const safeId = encodeURIComponent(id);
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ATTENDEE_TABLE_ID}/${safeId}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: { approve_as_volunteer: status } }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[update-volunteer-status] Airtable error:", err);
      return Response.json({ error: "Failed to update status" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[update-volunteer-status] error:", err);
    return Response.json({ error: "Failed to update status" }, { status: 500 });
  }
}
