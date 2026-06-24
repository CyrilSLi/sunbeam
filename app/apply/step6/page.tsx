"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Step6() {
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [form, setForm] = useState({
		attended_or_organized_hackathon: false,
		which_hackathons: "",
	});

	useEffect(() => {
		const saved = JSON.parse(localStorage.getItem("sunbeam_app") || "{}");
		setFirstName(saved.first_name || "");
	}, []);

	function handleNext() {
		const saved = JSON.parse(localStorage.getItem("sunbeam_app") || "{}");
		localStorage.setItem("sunbeam_app", JSON.stringify({ ...saved, ...form }));
		router.push("/apply/step7");
	}

	return (
		<div className="relative w-full min-h-screen">
			<img src="/imgs/sand.png" className="absolute inset-0 w-full h-full object-cover z-0" alt="" />
			<div className="relative mx-[1.7%] mt-[7vh] mb-[4vh] z-[1]">
				<img
					src="/imgs/boardwalk.png"
					className="absolute inset-0 w-full h-full object-fill pointer-events-none rounded-sm"
					alt=""
				/>

				<div className="relative z-10 w-[86%] mx-auto pt-[5vh] pb-[8vh]">
					<h1 className="galindo pink-outlined-text text-center text-[4.8vw] leading-tight">
						{firstName}, tell us more about your previous hackathon experiences!
					</h1>

					<div className="flex items-start gap-[1.5vw] mt-[5vh]">
						<div
							onClick={() => setForm((f) => ({ ...f, attended_or_organized_hackathon: !f.attended_or_organized_hackathon }))}
							className="flex-shrink-0 w-[1.8vw] h-[1.8vw] bg-white border-[3px] border-[#0e387a] rounded-md cursor-pointer mt-[0.3vw] flex items-center justify-center"
						>
							{form.attended_or_organized_hackathon && (
								<span className="pink-gradient-text text-[1.44vw] leading-none">✓</span>
							)}
						</div>
						<span className="galindo pink-outlined-text text-[2.4vw] leading-snug">
							Check this box if you&apos;ve attended or organized a hackathon before!
						</span>
					</div>

					<div className="flex flex-col gap-[1.2vh] mt-[5vh]">
						<label className="galindo text-[#2E599C] text-[2.4vw] leading-tight">
							Which hackathons did you attend or organize?
						</label>
						<textarea
							maxLength={500}
							value={form.which_hackathons}
							onChange={(e) => setForm((f) => ({ ...f, which_hackathons: e.target.value }))}
							className="outfit bg-white w-full px-4 py-3 text-[1.2vw] text-[#2E599C] border-[3px] border-[#0e387a] rounded-2xl outline-none focus:border-[#0e387a] transition-colors resize-none"
							style={{ height: "16vh" }}
						/>
						<p className="outfit text-[#359BBF] text-[1.2vw]">*max 500 characters</p>
					</div>

					<div className="flex justify-center mt-[8vh]">
						<button
							type="button"
							onClick={handleNext}
							className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0"
							style={{ width: "25vw" }}
						>
							<img src="/imgs/surfboard_next4.png" className="w-full" alt="next!" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
