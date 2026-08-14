import Link from "next/link";

const footerLinks = [
  { href: "/stories", label: "Stories" },
  { href: "/events", label: "Events" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-black text-text-muted mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-3xl font-bold text-metro-yellow">
              Ink in Quills
            </h3>
            <p className="font-body text-sm leading-relaxed text-text-dim max-w-xs">
              A community of readers, writers, and dreamers. We believe every
              story deserves to be told and every voice deserves to be heard.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-ui text-xs font-semibold uppercase tracking-widest text-metro-yellow">
              Explore
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ui text-sm text-text-dim hover:text-metro-yellow transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Social placeholder */}
          <div className="space-y-4">
            <h4 className="font-ui text-xs font-semibold uppercase tracking-widest text-metro-yellow">
              Connect
            </h4>
            <p className="font-ui text-sm text-text-dim">
              Find us at the Student Activities Center, Room 204.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim/70 hover:text-metro-yellow transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="mailto:inksnquils@college.edu"
                className="text-text-dim/70 hover:text-metro-yellow transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 pt-8 border-t border-text-dim/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-ui text-xs text-text-dim/50">
            © {new Date().getFullYear()} Ink in Quills Literary Club. All rights reserved.
          </p>
          <p className="font-display text-sm italic text-text-dim">
            &ldquo;We are all stories in the end.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
