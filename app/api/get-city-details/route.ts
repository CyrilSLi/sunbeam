type ScheduleItem = { time: string; event: string };
type Sponsor = { name: string; logo: string; website?: string };

function parseJsonArray<T>(value: unknown): T[] {
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Airtable doesn't store venue coordinates yet, so the venue address is geocoded
// on read (same Nominatim lookup the admin venue picker uses) rather than at write time.
async function geocodeQuery(query: string) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");

  const res = await fetch(url, {
    headers: {
      "User-Agent": "sunbeam-city-page (hackclub.com)",
      "Accept-Language": "en",
    },
    next: { revalidate: 86400 },
  });
  if (!res.ok) return null;

  const data = await res.json();
  const first = data?.[0];
  const latitude = parseFloat(first?.lat);
  const longitude = parseFloat(first?.lon);
  if (!first || isNaN(latitude) || isNaN(longitude)) return null;
  return { latitude, longitude };
}

// The stored `venue` string is often a Nominatim reverse-geocode display_name, whose
// disambiguation components (e.g. "Manhattan Community Board 3") don't always resolve back
// to the same place. Falling back to the plain venue name lets a landmark like "The Cooper
// Union" still resolve when its full address string comes up empty.
async function geocodeVenue(venue: string, venueName: string) {
  try {
    if (venue) {
      const byAddress = await geocodeQuery(venue);
      if (byAddress) return byAddress;
    }
    if (venueName) {
      const byName = await geocodeQuery(venueName);
      if (byName) return byName;
    }
    return null;
  } catch (err) {
    console.error("[get-city-details] geocode error:", err);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json(
      { error: "Missing city parameter" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const escapedCity = city.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const params = new URLSearchParams({
    filterByFormula: `LOWER({city}) = LOWER("${escapedCity}")`,
  });

  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_EVENT_TABLE_ID}?${params}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[get-city-details] Airtable error:", err);
    return Response.json(
      { error: "Failed to fetch city details" },
      { status: 502, headers: CORS_HEADERS }
    );
  }

  const data = await res.json();
  const record = data.records?.[0];

  if (!record) {
    return Response.json(
      { error: "City not found" },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  const schedule = parseJsonArray<ScheduleItem>(record.fields.schedule);
  const sponsors = parseJsonArray<Sponsor>(record.fields.sponsors);
  const venue = typeof record.fields.venue === "string" ? record.fields.venue.trim() : "";
  const venueName = typeof record.fields.venue_name === "string" ? record.fields.venue_name.trim() : "";

  const geo = venue || venueName ? await geocodeVenue(venue, venueName) : null;

  return Response.json(
    {
      city: record.fields.City ?? city,
      schedule,
      sponsors,
      venue: venue || null,
      venueName: venueName || null,
      latitude: geo?.latitude ?? null,
      longitude: geo?.longitude ?? null,
    },
    { headers: CORS_HEADERS }
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
