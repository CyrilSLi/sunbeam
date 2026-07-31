import HCASignInButton from "./HCASignInButton";

export default async function HCASignIn({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { return_to } = await searchParams;
	const authUrl = typeof return_to === "string"
		? `/api/organizer-signin?return_to=${encodeURIComponent(return_to)}`
		: "/api/organizer-signin";

	return <HCASignInButton authUrl={authUrl} />;
}
