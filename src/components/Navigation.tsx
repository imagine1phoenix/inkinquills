"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/events", label: "Events" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
  { href: "/auditions", label: "Auditions" },
  { href: "/members", label: "Members" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-surface-elevated/90 backdrop-blur-md border border-ink-black rounded-full px-2 py-2 shadow-2xl flex items-center gap-1 md:gap-2">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 font-ui text-sm font-bold tracking-widest uppercase rounded-full transition-colors duration-200 z-10 ${
                  isActive ? "text-text-primary" : "text-text-muted hover:text-text-primary"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-electric-blue rounded-full -z-10 shadow-offset"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile active item & Hamburger */}
        <div className="md:hidden flex items-center gap-4 pl-4 pr-2">
           <span className="font-ui text-sm font-bold tracking-widest uppercase text-text-primary">
             {navLinks.find(l => l.href === pathname)?.label || "Menu"}
           </span>
           <button
             onClick={() => setMobileOpen(!mobileOpen)}
             className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-electric-blue text-text-primary"
             aria-label="Toggle navigation menu"
           >
             <motion.span
               className="block w-4 h-[2px] bg-text-primary origin-center"
               animate={mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
             />
             <motion.span
               className="block w-4 h-[2px] bg-text-primary"
               animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
             />
             <motion.span
               className="block w-4 h-[2px] bg-text-primary origin-center"
               animate={mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
             />
           </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[55] bg-midnight/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`font-display text-4xl font-bold tracking-tight transition-colors px-6 py-2 rounded-full ${
                      pathname === link.href
                        ? "bg-electric-blue text-text-primary"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
