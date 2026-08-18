import Link from "next/link";
import { DoodleCrown, DoodleSpark, DoodleSquiggle } from "@/components/Doodles";

const footerLinks = [
  { href: "/stories", label: "Stories" },
  { href: "/events", label: "Events" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="bg-midnight text-[#F4F2EC] relative overflow-hidden border-t-[4px] border-midnight">
      {/* Ambient Doodles */}
      <div className="absolute top-10 left-10 w-48 h-48 text-metro-yellow/10 -rotate-12 pointer-events-none">
        <DoodleCrown className="w-full h-full" delayIndex={0} />
      </div>
      <div className="absolute bottom-20 right-20 w-32 h-32 text-electric-blue/10 rotate-45 pointer-events-none">
        <DoodleSpark className="w-full h-full" delayIndex={1} />
      </div>
      <div className="absolute top-[40%] left-[30%] w-64 h-32 text-[#F4F2EC]/5 rotate-12 pointer-events-none">
        <DoodleSquiggle className="w-full h-full" delayIndex={2} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

        {/* Massive Logo / Title */}
        <div className="mb-20 flex flex-wrap items-center gap-4 md:gap-8 select-none">
          <div className="bg-metro-yellow border-[4px] border-midnight px-6 py-2 shadow-[8px_8px_0_var(--electric-blue)] -rotate-2">
            <span className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase text-midnight leading-none">
              Ink
            </span>
          </div>
          <span className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase text-[#F4F2EC] leading-none text-3d rotate-3">
            In
          </span>
          <div className="bg-[#F4F2EC] border-[4px] border-midnight px-6 py-2 shadow-[8px_8px_0_var(--metro-yellow)] rotate-1 mt-4 md:mt-0">
            <span className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase text-midnight leading-none">
              Quills
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand Box */}
          <div className="md:col-span-5">
            <div className="relative bg-electric-blue border-[4px] border-midnight p-8 shadow-[8px_8px_0_var(--midnight)] -rotate-1">
              <div className="absolute -top-3 right-8 w-16 h-6 bg-white/90 border-[2px] border-midnight shadow-sm rotate-[4deg] z-10" />
              <p className="font-body text-xl font-bold leading-relaxed text-[#F4F2EC] uppercase tracking-wide">
                A community of readers, writers, and dreamers. <br /><br />
                We believe every story deserves to be told and every voice deserves to be heard.
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-ui text-sm font-black uppercase tracking-widest text-metro-yellow bg-midnight inline-block">
              Explore
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative inline-block font-display text-2xl font-bold uppercase text-[#F4F2EC] hover:text-metro-yellow transition-colors duration-200"
                  >
                    {link.label}
                    <div className="absolute bottom-1 left-0 w-full h-[4px] bg-metro-yellow origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="font-ui text-sm font-black uppercase tracking-widest text-metro-yellow bg-midnight inline-block">
              Connect
            </h4>

            <div className="bg-[#F4F2EC] border-[4px] border-midnight p-4 shadow-[6px_6px_0_var(--electric-blue)] rotate-2">
              <p className="font-body text-base font-bold text-midnight uppercase leading-tight">
                wherever you see 3 people discussing about kafka
              </p>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <a
                href="https://www.instagram.com/_.the_literature_club._/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-16 h-16 bg-metro-yellow border-[4px] border-midnight rounded-full flex items-center justify-center shadow-[4px_4px_0_var(--midnight)] hover:-translate-y-1 transition-transform"
                aria-label="Instagram"
              >
                <svg className="w-8 h-8 text-midnight group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="mailto:inkinquills@gmail.com"
                className="group relative w-16 h-16 bg-[#F4F2EC] border-[4px] border-midnight rounded-full flex items-center justify-center shadow-[4px_4px_0_var(--midnight)] hover:-translate-y-1 transition-transform"
                aria-label="Email"
              >
                <svg className="w-8 h-8 text-midnight group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-20 pt-8 border-t-[4px] border-dashed border-[#F4F2EC]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-ui text-sm font-bold tracking-widest uppercase text-[#F4F2EC]/50">
            © {new Date().getFullYear()} Ink in Quills. All rights reserved.
          </p>
          <div className="bg-metro-yellow border-[3px] border-midnight px-4 py-2 rotate-1">
            <p className="font-display text-xl font-black uppercase text-midnight">
              "We are all stories in the end."
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
