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
        className="w-1/3 h-screen flex flex-col lg:px-4 xl:px-12 lg:py-8 xl:py-16 gap-8 xl:gap-14"
        style={{
          backgroundImage: "url('/imgs/sidebar-water-desktop.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Link href="/">
          <img src="/imgs/logo_orgportal.png" className="w-3/4"></img>
        </Link>
        <SidebarItem href="/organizers" text="Home" />
        <SidebarItem href="/organizers/docs" text="Docs" />
        <SidebarItem href="/organizers/docs" text="More Resources" />
        <SidebarItem href="/organizers/docs" text="Branding & Social Media" />
        <SidebarItem href="/organizers/docs" text="Contact HQ" />   
        <img src="/imgs/ray_back.png" alt="" className="w-5/8 -m-6"></img>                  
      </div>
      {/* homepage */}
      <div className="h-screen w-2/3"></div>
    </div>
  );
}

export function SidebarItem({ href, text }: { href: string; text: string }) {
  return (
    <div>
      <Link href={href}>
        <div className="grid grid-cols-1 grid-rows-1 w-5/8">
          <h2 className="col-start-1 row-start-1 outfit pink-outlined-text-drop-shadow lg:text-3xl xl:text-6xl font-bold">
            {text}
          </h2>
          <h2 className="col-start-1 row-start-1 outfit pink-gradient-text lg:text-3xl xl:text-6xl font-bold z-10">
            {text}
          </h2>
        </div>
      </Link>
    </div>
  );
}
