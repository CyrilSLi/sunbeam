import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrganizersDashboard from "./OrganizersDashboard";

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

async function getCurrentUserEmail(token: string): Promise<string | null> {
	const res = await fetch("https://auth.hackclub.com/api/v1/me", {
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!res.ok) return null;
	const user = await res.json();
	return user.identity?.primary_email?.toLowerCase() ?? null;
}

export default async function OrganizersPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get("hca_token")?.value;

	if (!token) {
		redirect("/organizer-auth");
	}

	const [email, organizerEmails] = await Promise.all([
		getCurrentUserEmail(token),
		getApprovedOrganizerEmails(),
	]);

	if (!email || !organizerEmails.includes(email)) {
		return <AccessDenied email={email} />;
	}

	return <OrganizersDashboard />;
}

function AccessDenied({ email }: { email: string | null }) {
	return (
		<div className="min-h-screen bg-[#fdf6e3] outfit flex flex-col items-center justify-center gap-4">
			<h1 className="galindo text-blue-dark text-2xl">organizer portal</h1>
			<p className="text-sm text-pink-dark font-semibold">
				{email
					? `${email} is not an approved organizer yet.`
					: "Could not verify your identity."}
			</p>
			<a href="/organizer-auth" className="text-xs text-blue-bright underline">
				Sign in with a different account
			</a>
		</div>
	);
}
