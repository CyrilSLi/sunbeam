import Link from "next/link";

export default function Organizers() {
  return (
    <div
      className="flex overflow-hidden"
      style={{
        backgroundImage: "url('/imgs/sand.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* sidebar */}
      <div
        className="w-1/3 h-screen flex flex-col lg:px-4 2xl:px-12 lg:py-8 2xl:py-16 gap-8 2xl:gap-14"
        style={{
          backgroundImage: "url('/imgs/sidebar-water-desktop.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>

        </div>
        <Link href="/">
          <img src="/imgs/logo_orgportal.png" className="w-3/4"></img>
        </Link>
        <SidebarItem href="/organizers" text="Home" />
        <SidebarItem href="/organizers/docs" text="Docs" />
        <SidebarItem href="/organizers/docs" text="More Resources" />
        <SidebarItem href="/organizers/docs" text="Branding & Social Media" />
        <SidebarItem href="/organizers/docs" text="Contact HQ" />
        <button>
          <img src="/imgs/ray_back.png" alt="" className="w-5/8 -m-6"></img>
        </button>
      </div>
      {/* homepage */}
      <div className="h-screen w-2/3 2xl:p-12">
        <h1 className="2xl:text-6xl galindo text-transparent bg-clip-text bg-linear-to-b from-[#72BFDA] to-blue-bright">
          Welcome, Sunbeamer!
        </h1>
        <div>
          {/* 2 boxes row */}
          <div className="flex justify-between">
            {/* event countdown */}
            <div className="glassbox-white w-1/2 2xl:p-16 2xl:m-8 2xl:rounded-2xl text-center">
              <h1 className="galindo 2xl:text-[150px] text-blue-bright">XX</h1>
              <h3 className="galindo text-[32px] -mt-10 text-pink-dark">
                days until the event!!!
              </h3>
            </div>
            {/* check-in call countdown */}
            <div className="glassbox-white w-1/2 2xl:p-16 2xl:m-8 2xl:rounded-2xl text-center">
              <h1 className="galindo 2xl:text-[150px] text-pink-dark">XX</h1>
              <h3 className="galindo text-[32px] -mt-10 text-orange-dark">
                days until the next check-in call
              </h3>
            </div>
          </div>
          {/* 2 boxes row */}
          <div className="flex">
            {/* weekly to-do */}
            <div className="w-1/2 2xl:mx-8">
              <h3 className="galindo 2xl:text-4xl 2xl:m-8 text-blue-bright">
                Week X To-Do
              </h3>
              <div className="h-[60vh] boardwalk 2xl:p-8 2xl:mx-8 flex flex-col">
                <p className="text-blue-dark outfit 2xl:text-3xl text-pretty 2xl:leading-12">
                  <strong>1.</strong> Sign up to be an organizer in your city!
                  (wait for approval - you’ll receive an email from us soon)
                  <br /> <strong>2.</strong> once approved, join
                  #sunbeam-organizers
                  <br /> <strong>3.</strong> share feedback on our ULTIMATE
                  ORGANIZER GUIDE
                  <br /> <strong>4.</strong> join the very first check in call
                  [date]
                </p>
                <a
                  href="placeholder"
                  className="text-blue-dark outfit 2xl:text-3xl text-pretty font-bold mt-auto mb-20"
                >
                  Click here to see the full 9-week plan
                </a>
              </div>
            </div>
            {/* check-in call link */}
            <div className="w-1/2 2xl:m-8">
              <div className="glassbox-clear 2xl:p-8 h-1/2 flex justify-items-center rounded-t-2xl">
                <img
                  src="/imgs/ray1.png"
                  alt=""
                  className="mx-auto 2xl:p-4"
                ></img>
              </div>
              <div className="glassbox-white flex flex-col p-12 rounded-b-2xl text-center">
                <a
                  href="placeholder"
                  className="galindo 2xl:text-4xl text-orange-dark underline hover:decoration-wavy"
                >
                  Check-in Call Link
                </a>
                <h3 className="text-pink-dark outfit 2xl:text-2xl">
                  meeting platform (zoom?)
                </h3>
                <h3 className="text-pink-dark outfit 2xl:text-2xl">
                  00:00 EST - MM/DD
                </h3>
                <h3 className="text-blue-bright outfit 2xl:text-2xl">
                  more details &#8680;
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarItem({ href, text }: { href: string; text: string }) {
  return (
    <div>
      <Link href={href}>
        <div className="grid grid-cols-1 grid-rows-1 w-5/8">
          <h2 className="col-start-1 row-start-1 outfit pink-outlined-text-drop-shadow lg:text-3xl 2xl:text-6xl font-bold">
            {text}
          </h2>
          <h2 className="col-start-1 row-start-1 outfit pink-gradient-text lg:text-3xl 2xl:text-6xl font-bold z-10">
            {text}
          </h2>
        </div>
      </Link>
    </div>
  );
}
