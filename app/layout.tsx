import type { Metadata } from "next";
import { Geist, Geist_Mono, Galindo, Outfit } from "next/font/google";
import RouteTracker from "../components/RouteTracker";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const galindo = Galindo({
	variable: "--font-galindo",
	weight: "400",
	subsets: ["latin"],
});

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Sunbeam - Hack Club",
    description: "A free social coding event for girls 13–18, running simultaneously in 20+ cities on August 29th. No experience required.",
    openGraph: {
        title: "Sunbeam - Hack Club",
        description: "A free social coding event for girls 13–18, running simultaneously in 20+ cities on August 29th. No experience required.",
        url: "https://sunbeam.hackclub.com",
        siteName: "Sunbeam",
        images: [
            {
                url: "https://sunbeam.hackclub.com/imgs/sunbeam.webp",
                width: 1200,
                height: 630,
            }
        ],
    },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} ${galindo.variable} ${outfit.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col" suppressHydrationWarning>
				<RouteTracker />
				{children}
			</body>
		</html>
	);
}
