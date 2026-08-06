"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type QnaEntry = {
	question: string;
	answer: React.ReactNode;
};

const generalFaqs: QnaEntry[] = [
	{
		question: "What is Sunbeam?",
		answer: (
			<>
				A combination of 20+ Athena events, each happening in their own city!
				Check out the website{" "}
				<a
					href="https://sunbeam.hackclub.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="underline"
				>
					here
				</a>
				.
			</>
		),
	},
	{
		question: "What is Athena?",
		answer: (
			<>
				Athena is Hack Club&apos;s program for getting more girls into STEM.
				Check out our{" "}
				<a
					href="https://athena.hackclub.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="underline"
				>
					website
				</a>{" "}
				to learn more about what we do!
			</>
		),
	},
	{
		question: "What is Hack Club?",
		answer: (
			<>
				<a
					href="https://hackclub.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="underline"
				>
					Hack Club
				</a>{" "}
				is a US-based charity that operates all around the world to get more
				young people involved in tech and coding. They&apos;ve run events on
				an island, partnered with NASA, and hosted the world&apos;s largest
				all-girls high school hackathon!
			</>
		),
	},
];

const eligibilityFaqs: QnaEntry[] = [
	{
		question: "Am I eligible to apply?",
		answer:
			"If you are a girl between 13 and 18 (includes being 13 or being 18, but not 12 or 19) and currently live in the US then you are eligible to apply. If you're not sure whether you're eligible, reach out to us at charlotte@events.hackclub.com!",
	},
	{
		question: "What's the difference between this and organizing a Sunbeam?",
		answer:
			"When you organize a Sunbeam, you advertise your own event to girls in your area. As a Sunbeam ambassador, you'd advertise the Sunbeam satellite as a whole to girls around the globe through social media, and get more connected with your local Sunbeam community by running get-togethers!",
	},
	{
		question: "I'm already organizing a Sunbeam. Can I still apply?",
		answer:
			"Yes! You will be doing different things as an ambassador than you would as an organizer.",
	},
];

const moreFaqs: QnaEntry[] = [
	{
		question: "What if I have more questions?",
		answer: "Reach out to us at charlotte@events.hackclub.com",
	},
];

function QnaItem({ entry }: { entry: QnaEntry }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border-b border-black/10 last:border-b-0 py-[1.2vh]">
			<button
				type="button"
				onClick={() => setIsOpen((v) => !v)}
				aria-expanded={isOpen}
				className="w-full flex items-center gap-[1.2vw] text-left cursor-pointer"
			>
				<span
					className={`galindo text-[#0E387A] text-[2vh] shrink-0 transition-transform duration-300 ${
						isOpen ? "rotate-90" : ""
					}`}
				>
					▶
				</span>
				<h3 className="galindo text-[#0E387A] text-[2.1vh] md:text-[2.3vh] leading-snug">
					{entry.question}
				</h3>
			</button>
			<div
				className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen ? "grid-rows-[1fr] opacity-100 mt-[0.75vh]" : "grid-rows-[0fr] opacity-0"
				}`}
			>
				<p className="outfit text-[#0E387A] text-[1.8vh] md:text-[1.9vh] leading-relaxed pl-[3.2vw] overflow-hidden">
					{entry.answer}
				</p>
			</div>
		</div>
	);
}

function QnaBlanket({
	entries,
	blanketSrc,
	align,
}: {
	entries: QnaEntry[];
	blanketSrc: string;
	align: "start" | "end" | "center";
}) {
	return (
		<div
			className={`w-full bg-no-repeat px-[10vw] py-[5vh] md:py-[6vh] ${
				align === "center"
					? "md:w-[42vw] md:mx-auto"
					: align === "start"
						? "md:w-[48vw] md:self-start md:px-[9vw]"
						: "md:w-[48vw] md:self-end md:px-[9vw]"
			}`}
			style={{ backgroundImage: `url(${blanketSrc})`, backgroundSize: "100% 100%" }}
		>
			{entries.map((entry, i) => (
				<QnaItem key={i} entry={entry} />
			))}
		</div>
	);
}

type Slide = {
	src: string;
	caption: string;
};

function Carousel({ slides }: { slides: Slide[] }) {
	const [index, setIndex] = useState(0);

	const goTo = (i: number) => {
		setIndex((i + slides.length) % slides.length);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % slides.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [slides.length]);

	return (
		<div className="flex items-center gap-[3vw] md:gap-[1.5vw] mt-[3vh] w-full">
			<button
				type="button"
				onClick={() => goTo(index - 1)}
				aria-label="Previous image"
				className="shrink-0 h-[5.5vh] w-[5.5vh] rounded-full bg-blue-dark text-white text-[2.25vh] leading-none flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
			>
				‹
			</button>

			<div className="flex-1 overflow-hidden rounded-2xl min-w-0">
				<div
					className="flex transition-transform duration-500 ease-in-out"
					style={{ transform: `translateX(-${index * 100}%)` }}
				>
					{slides.map((slide, i) => (
						<div className="shrink-0 w-full" key={i}>
							<img
								src={slide.src}
								alt={slide.caption}
								loading="lazy"
								className="w-full h-auto rounded-2xl"
							/>
							<p className="outfit text-[#0E387A] text-center mt-[1.5vh] text-[1.7vh] md:text-[1.9vh]">
								{slide.caption}
							</p>
						</div>
					))}
				</div>
			</div>

			<button
				type="button"
				onClick={() => goTo(index + 1)}
				aria-label="Next image"
				className="shrink-0 h-[5.5vh] w-[5.5vh] rounded-full bg-blue-dark text-white text-[2.25vh] leading-none flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
			>
				›
			</button>
		</div>
	);
}

export default function Ambassadors() {
	const slides: Slide[] = [
		{
			src: "/imgs/ambassadors/carousel-cascade.webp",
			caption: "A workshop on web development at Cascade in Atlanta, Georgia",
		},
		{ src: "/imgs/ambassadors/carousel-parthenon.webp", caption: "Coding at Parthenon in NYC" },
		{
			src: "/imgs/ambassadors/carousel-ascend.webp",
			caption: "Girls at Ascend with a SpaceX rocket",
		},
	];

	return (
		<div className="relative bg-[url('/imgs/sandNoFade.webp')] bg-cover bg-center bg-repeat-y outfit">
			{/* back btn */}
			<p
				className="galindo absolute z-20"
				style={{ top: 10, left: 20, fontSize: "2.5vw", color: "#D88127", lineHeight: 1.2 }}
			>
				<Link href="/">Back</Link>
			</p>

			{/* hero */}
			<div className="relative min-h-screen w-full overflow-hidden">
				<img
					src="/imgs/ambassadors/hero.webp"
					alt=""
					className="absolute inset-0 w-full h-full object-cover object-bottom"
				/>
				<img
					src="/imgs/ambassadors/shark.webp"
					alt=""
					className="absolute z-0 w-[22vw] max-w-[160px] bottom-[12%] left-[1vw] -rotate-6 pointer-events-none"
				/>
				<div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-[8vw] py-[10vh]">
					<h1 className="galindo text-[4vh] md:text-[6vh] leading-tight text-[#2E599C] [-webkit-text-stroke:1.5px_#0E387A] [paint-order:stroke_fill] max-w-[45em] mt-[6vh] md:mt-[8vh]">
						Become a{" "}
						<img
							src="/imgs/ambassadors/sunbeam-logo.webp"
							alt="Sunbeam"
							className="inline-block h-[5vh] md:h-[7vh] align-middle -mt-[0.5vh]"
						/>{" "}
						<span className="font-bold">Ambassador</span> and share Sunbeam with
						your community!
					</h1>
					<p className="text-[#0E387A] text-[2vh] md:text-[2.25vh] mt-[2.5vh] max-w-[40em]">
						If you are a girl in the US between 13 and 18 (inclusive), then
						you&apos;re eligible to become a Sunbeam ambassador.
					</p>
					<a
						href="https://forms.hackclub.com/sunbeam-ambassadors"
						target="_blank"
						rel="noopener noreferrer"
						className="mt-[3.5vh] hover:scale-105 transition-transform"
					>
						<img
							src="/imgs/ambassadors/apply-btn.webp"
							alt="Apply now"
							className="w-[55vw] md:w-[16vw]"
						/>
					</a>
				</div>
			</div>

			{/* pitch */}
			<div className="relative flex flex-col items-center px-[6vw] pt-[6vh] md:pt-[10vh] pb-[4vh]">
				<img
					src="/imgs/ambassadors/ray1.webp"
					alt=""
					className="hidden md:block w-[10vw] max-w-[170px] -mb-[4vh]"
				/>
				<div
					className="relative w-full md:w-[52vw] px-[11vw] md:px-[4.5vw] py-[9vh] md:py-[10vh]"
					style={{ backgroundImage: "url('/imgs/ambassadors/letter.webp')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}
				>
					<p className="galindo text-[#C54390] [-webkit-text-stroke:1px_#0E387A] [paint-order:stroke_fill] text-[3vh] md:text-[3.5vh]">
						<span className="font-bold">We need your help</span> getting more
						girls into tech.
					</p>

					<p className="text-[#0E387A] text-[1.9vh] md:text-[2.1vh] leading-relaxed mt-[3vh]">
						This summer,{" "}
						<a
							href="https://sunbeam.hackclub.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="font-bold underline"
						>
							Athena
						</a>
						, Hack Club&apos;s program to close the gender gap in tech, is
						organizing{" "}
						<a
							href="https://sunbeam.hackclub.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="font-bold underline"
						>
							Sunbeam
						</a>
						, a girls-only social coding event in 20+ cities around the globe.
					</p>

					<p className="text-[#0E387A] text-[1.9vh] md:text-[2.1vh] leading-relaxed mt-[2vh]">
						We&apos;re looking for{" "}
						<span className="font-bold">Sunbeam ambassadors</span> to spread
						the word about Sunbeam and Athena. As a Sunbeam ambassador,
						you&apos;ll:
					</p>

					<ul className="text-[#0E387A] text-[1.9vh] md:text-[2.1vh] leading-relaxed mt-[2vh] list-disc pl-[1.4em] space-y-[0.5vh]">
						<li>
							<span className="font-bold">talk to girls in your area</span>{" "}
							about Sunbeam
						</li>
						<li>
							hang up <span className="font-bold">Sunbeam posters</span>
						</li>
						<li>
							organize <span className="font-bold">local meetups</span>
						</li>
						<li>
							create <span className="font-bold">social media posts</span>{" "}
							about Sunbeam
						</li>
					</ul>

					<p className="text-[#0E387A] text-[1.9vh] md:text-[2.1vh] leading-relaxed mt-[2vh]">
						You&apos;ll get{" "}
						<span className="font-bold">
							$5 for each person you refer that attends
						</span>{" "}
						a Sunbeam event. You&apos;ll also gain marketing and leadership
						experience and inspire more girls to explore coding.
					</p>

					<p className="text-[#0E387A] text-[1.9vh] md:text-[2.1vh] leading-relaxed mt-[2vh]">
						We can&apos;t wait to review your application!
					</p>

					<p className="text-[#0E387A] text-[1.9vh] md:text-[2.1vh] leading-relaxed mt-[1vh]">
						- The Athena Team
					</p>
				</div>
			</div>

			{/* carousel */}
			<div className="relative px-[6vw] pt-[4vh] pb-[2vh] flex flex-col items-center">
				<h2 className="galindo blue-outlined-text text-[3.5vh] md:text-[5vh] text-center max-w-[45em]">
					Get more girls involved in events like these:
				</h2>
				<div className="w-full md:w-[55vw]">
					<Carousel slides={slides} />
				</div>
			</div>

			{/* qna */}
			<div className="relative px-[6vw] pt-[6vh] pb-[8vh]">
				<div className="flex items-center justify-between max-w-[1200px] mx-auto mb-[3vh] gap-[2vw]">
					<h2 className="galindo blue-outlined-text text-[3.5vh] md:text-[5vh]">Q&amp;A</h2>
					<img
						src="/imgs/ambassadors/ray2.webp"
						alt=""
						className="hidden md:block w-[15vw] max-w-[280px] -mt-[6vh]"
					/>
				</div>

				<div className="flex flex-col gap-[4vh] max-w-[1200px] mx-auto">
					<QnaBlanket
						entries={generalFaqs}
						blanketSrc="/imgs/ambassadors/pink-blanket.webp"
						align="start"
					/>
					<QnaBlanket
						entries={eligibilityFaqs}
						blanketSrc="/imgs/ambassadors/blue-blanket.webp"
						align="end"
					/>
					<QnaBlanket
						entries={moreFaqs}
						blanketSrc="/imgs/ambassadors/yellow-blanket.webp"
						align="center"
					/>
				</div>
			</div>

			{/* footer */}
			<div className="relative min-h-[28vh] md:min-h-[35vh] w-full flex flex-col items-center justify-center overflow-hidden">
				<img
					src="/imgs/ambassadors/bottom-rocks.webp"
					alt=""
					className="absolute inset-0 w-full h-full object-cover object-top"
				/>
				<div className="relative z-10 text-center px-[6vw]">
					<p className="text-[#0E387A] text-[2vh] md:text-[2.25vh]">
						Made with &lt;3 by the Hack Club Athena team
					</p>
					<p className="text-[#0E387A] text-[1.8vh] md:text-[2vh] mt-[1vh]">
						Check out the{" "}
						<a
							href="https://hackclub.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							Hack Club website
						</a>{" "}
						and join the{" "}
						<a
							href="https://hackclub.com/slack"
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							Slack
						</a>
						!
					</p>
				</div>
			</div>
		</div>
	);
}
