export default function Home() {
	return (
		<div className="relative">
			{/* ── HERO ── */}
			<div className="relative min-h-screen md:min-h-[110vh] w-full">
				<div className="absolute inset-0 h-full md:h-[110vh] overflow-hidden">
					<img
						src="/imgs/water.png"
						className="w-full h-full object-cover object-bottom"
						alt=""
					/>
				</div>

				{/* Shark */}
				<img
					src="/imgs/shark1.png"
					className="absolute top-[-2vh] left-[2.5vw] z-5 w-[30vw] md:w-[17.5vw]"
					alt=""
				/>

				{/* Foam wave */}
				<img
					src="/imgs/foam.png"
					className="absolute bottom-[-20vh] left-0 z-5 w-full"
					alt=""
				/>

				<div className="flex flex-col relative z-5">
					{/* Logo + video */}
					<div className="relative w-full px-4 md:w-[80vw] md:mx-auto flex flex-col md:flex-row mt-[5vh] mb-[5vh] md:mb-[9vh] gap-4 md:gap-0">
						<img
							src="/imgs/sunbeam.png"
							className="w-[70vw] mx-auto md:w-[49vw] md:mx-0 md:absolute md:bottom-[-6vh] md:left-[5vw]"
							alt="Sunbeam"
						/>
						{/* Video placeholder */}
						<div className="w-full md:w-[45vw] h-[30vh] md:h-[40vh] bg-neutral-200/80 md:ml-auto flex items-center justify-center rounded-sm">
							<span className="galindo text-black text-[4.5vw] md:text-[1.8vw]">launch video</span>
						</div>
					</div>

					<h2 className="galindo text-[4.5vh] text-[#2E599C] text-center px-4">
						A social coding event for girls 13-18 around the world
					</h2>
					<h3 className="outfit text-[#0E387A] text-center text-[3vh] px-4">
						August 29th, 2026 || 20+ cities worldwide
					</h3>
					<h1 className="galindo text-[6.5vh] text-center gradient-text mt-[1.5vh] px-4">
						Organize a Sunbeam Social in your city!
					</h1>
					<a
						href="/apply"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<img src="/imgs/apply.png" className="w-[50vw] md:w-[25vw] mx-auto" alt="apply!" />
					</a>
				</div>
			</div>

			{/* ── SAND SECTION (What is + How-To) ── */}
			<div className="relative w-full pb-[20vh]" style={{ backgroundImage: "url('/imgs/sand.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>

				{/* ── WHAT IS A SUNBEAM SOCIAL ── */}
				<div className="relative z-5 w-full flex flex-col items-center pt-[25vh] pb-[8vh]">
					<h2 className="galindo text-[8vw] md:text-[7vh] text-[#D88127] text-center mb-[3vh] px-4">
						What is a Sunbeam Social?
					</h2>
					<div className="relative overflow-hidden rounded-2xl border border-pink-300 mx-[3.5%] w-[93%]" style={{ backgroundColor: "#ffc7da" }}>
						<svg className="absolute left-0 top-0 h-full hidden md:block" style={{ width: "12.2%" }} viewBox="0 0 197 832" preserveAspectRatio="none" fill="none">
							<path d="M197 832V0H156.255L0 68.8309L156.255 192.425L0 256.232L156.255 359.729L0 423.034L156.255 514.976L13.4498 595.865L156.255 682.28L13.4498 754.126L156.255 832H197Z" fill="#FBF0F2"/>
						</svg>
						<svg className="absolute top-0 h-full hidden md:block" style={{ left: "12.2%", width: "1.3%" }} viewBox="0 0 21 832" preserveAspectRatio="none" fill="none">
							<path d="M21 0H0L0.488372 832H21V0Z" fill="#FFF0F3"/>
						</svg>
						<svg className="absolute right-0 top-0 h-full hidden md:block" style={{ width: "12.1%" }} viewBox="0 0 196 832" preserveAspectRatio="none" fill="none">
							<path d="M0 832V0H40.5381L196 68.8309L40.5381 192.425L196 256.232L40.5381 359.729L196 423.034L40.5381 514.976L182.618 595.865L40.5381 682.28L182.618 754.126L40.5381 832H0Z" fill="#FBF0F2"/>
						</svg>
						<svg className="absolute top-0 h-full hidden md:block" style={{ right: "12.1%", width: "1.3%" }} viewBox="0 0 21 832" preserveAspectRatio="none" fill="none">
							<path d="M0 0H21L20.5116 832H0V0Z" fill="#FFF0F3"/>
						</svg>
						<p className="outfit text-center text-[#0E387A] text-base md:text-[1.8vw] leading-[1.5] py-[4vh] px-[6%] md:px-[21%]">
							Sunbeam is a day-long hangout where girls can make projects together, chat with other girls, learn to code from scratch, and enjoy delicious food.
							<br/><br/>
							We want every Sunbeam social to have a friendly, chill, and supportive environment that helps even complete beginners make something they&apos;re proud of. This event is more of a <span className="font-bold">SOCIAL</span> coding get together than a hackathon!!!
						</p>
					</div>
				</div>

				{/* ── HOW-TO ── */}
				<div className="relative z-5 w-full flex flex-col items-center pt-[6vh] pb-[8vh]">
					<img src="/imgs/ray1.png" className="absolute top-[2vh] right-[6vw] z-5 w-[17.5vw] hidden md:block" alt="" />
					<h2 className="galindo text-[8vw] md:text-[6.5vh] text-[#D88127] text-center w-[90vw] md:w-[50vw] leading-tight md:leading-[7.5vh] mb-[1vh] px-4">
						How do you organize a Sunbeam Social?
					</h2>
					<div className="w-[90vw] md:w-[77.5vw] flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-[3vw] my-[4vh]">
						<div className="w-full h-auto md:h-[65vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.75vw]">
							<div className="border-[1vh] border-[#C54390] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-4 md:p-[1vw]">
								<img src="/imgs/img1.png" className="pb-[2vh] max-h-[25vh] w-auto object-contain" alt="" />
								<h2 className="galindo text-center text-[6vw] md:text-[4vh] text-[#C54390]">APPLY!</h2>
								<p className="outfit text-sm md:text-[2.25vh] text-center text-[#C54390]">
									Apply to <span className="underline">organize</span>{" "}a Sunbeam using our form. Experience helps but isn&apos;t necessary!
								</p>
							</div>
						</div>
						<div className="w-full h-auto md:h-[72.5vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.75vw]">
							<div className="border-[1vh] border-[#2E599C] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-4 md:p-[1vw]">
								<img src="/imgs/img2.png" className="pb-[2vh] max-h-[25vh] w-auto object-contain" alt="" />
								<h2 className="galindo text-center text-[6vw] md:text-[4vh] text-[#2E599C]">PLAN!</h2>
								<p className="outfit text-sm md:text-[2.25vh] text-center text-[#2E599C]">
									Plan your event: secure a <span className="underline">venue</span>, plan your <span className="underline">budget</span>, advertise, and <span className="underline">get participants</span>{" "}to sign up! Shop for food, drinks, &amp; prizes for your participants.
								</p>
							</div>
						</div>
						<div className="w-full h-auto md:h-[65vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.75vw]">
							<div className="border-[1vh] border-[#C79713] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-4 md:p-[1vw]">
								<img src="/imgs/img3.png" className="pb-[2vh] max-h-[25vh] w-auto object-contain" alt="" />
								<h2 className="galindo text-center text-[6vw] md:text-[4vh] text-[#C79713]">EVENT!</h2>
								<p className="outfit text-sm md:text-[2.25vh] text-center text-[#C79713]">
									August 29!! Have fun during your event and make friends with fellow organizers &amp; participants.
								</p>
							</div>
						</div>
					</div>
					<a href="/" className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto">
						<img src="/imgs/read.png" className="w-[70vw] md:w-[35vw] mx-auto" alt="Read our ultimate guide to organizing events >>>" />
					</a>
					<h2 className="outfit text-[6vw] md:text-[6vh] text-[#C54390] text-center w-[90vw] md:w-[60vw] leading-tight md:leading-[7.5vh] my-[4vh] drop-shadow-sm">
						Ready? Let the sun beam in your city!
					</h2>
					<a href="/apply" className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto">
						<img src="/imgs/apply.png" className="w-[50vw] md:w-[25vw] mx-auto" alt="apply!" />
					</a>
				</div>
			</div>

			{/* ── FOOTER ── */}
			<div className="relative min-h-[80vh] w-full flex flex-col pt-[15vh] md:pt-[23vh]">
				<div className="absolute inset-0 h-[80vh] overflow-hidden">
					<img
						src="/imgs/water.png"
						className="w-full h-full object-cover object-bottom rotate-180"
						alt=""
					/>
				</div>
				<img
					src="/imgs/foam2.png"
					className="absolute top-[-15vh] left-0 z-5 w-full"
					alt=""
				/>
				<img
					src="/imgs/ray2.png"
					className="absolute bottom-[2vh] right-0 z-5 w-[20vw] hidden md:block"
					alt=""
				/>

				<div className="relative z-5 flex flex-col">
					{/* Footer headline */}
					<h3 className="outfit text-[#FBF6E7]/90 font-semibold text-[5.5vw] md:text-[5.5vh] text-center px-4">
						made with ♡ by{" "}
						<a href="https://athena.hackclub.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
							Hack Club Athena
						</a>{" "}Team
					</h3>

					{/* Nav + description */}
					<div className="flex flex-col md:flex-row gap-6 md:gap-[8vw] mt-[6vh] px-6 md:px-[5.3%]">
						{/* Left nav */}
						<div className="flex flex-col gap-[1.2vh] flex-shrink-0">
							{[
								{ label: "Hack Club", href: "https://hackclub.com" },
								{ label: "Slack", href: "https://hackclub.com/slack" },
								{ label: "Athena", href: "https://athena.hackclub.com" },
								{ label: "Clubs", href: "https://hackclub.com/clubs" },
								{ label: "Code of Conduct", href: "https://hackclub.com/conduct" },
							].map(({ label, href }) => (
								<a key={label} href={href} target={href !== "#" ? "_blank" : undefined} rel="noopener noreferrer" className="galindo text-[#D5F0E8] text-[5vw] md:text-[1.8vw] hover:underline leading-tight">
									{label}
								</a>
							))}
						</div>

						{/* Right description */}
						<p className="outfit text-[#FAF0D3] text-sm md:text-[1.5vw] leading-relaxed md:max-w-[60vw]">
							Hack Club is a 501(c)(3) nonprofit and network of 60k+ technical high schoolers. We believe you learn best by building so we&apos;re creating community and providing grants so you can make awesome projects. In the past few years, we&apos;ve partnered with GitHub to run&nbsp;Summer of Making, hosted the&nbsp;world&apos;s longest hackathon on land, and ran&nbsp;Canada&apos;s largest high school hackathon.
							<br /><br />
							At Hack Club, students are building real projects every single day.
						</p>
					</div>

					{/* Copyright */}
					<p className="outfit text-[#FCF7E8] text-xs md:text-[0.75vw] mt-[4vh] text-center pb-4">
						© 2026 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
					</p>
				</div>
			</div>
		</div>
	);
}
