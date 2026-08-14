"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DoodleCrown, DoodleSpark, DoodleEye, DoodleSwirl, DoodleStar, DoodleSquiggle } from "@/components/Doodles";

const navLinks = [
  { href: "/", label: "Home", color: "bg-electric-blue", textColor: "text-[#F4F2EC]", rot: -12, x: "-35vw", y: "-30vh", doodle: DoodleStar },
  { href: "/stories", label: "Stories", color: "bg-metro-yellow", textColor: "text-midnight", rot: 8, x: "25vw", y: "-35vh", doodle: DoodleSwirl },
  { href: "/events", label: "Events", color: "bg-[#F4F2EC]", textColor: "text-midnight", rot: -20, x: "-40vw", y: "10vh", doodle: DoodleSpark },
  { href: "/library", label: "Library", color: "bg-midnight", textColor: "text-[#F4F2EC]", rot: 15, x: "35vw", y: "5vh", doodle: DoodleEye },
  { href: "/about", label: "About", color: "bg-metro-yellow", textColor: "text-midnight", rot: -5, x: "-20vw", y: "35vh", doodle: DoodleCrown },
  { href: "/auditions", label: "Auditions", color: "bg-electric-blue", textColor: "text-[#F4F2EC]", rot: 25, x: "20vw", y: "35vh", doodle: DoodleSquiggle },
  { href: "/members", label: "Members", color: "bg-[#F4F2EC]", textColor: "text-midnight", rot: -10, x: "0vw", y: "-10vh", doodle: DoodleStar },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Handle window resize for mobile vs desktop positions (simplification: we'll just use responsive vw/vh in the framer motion variants)
  // For mobile, the spread should be tighter.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* 
        THE TRIGGER
        A chaotic floating tape sticker in the bottom right corner 
      */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[70] bg-metro-yellow border-[4px] border-midnight px-4 py-2 md:px-6 md:py-4 shadow-[8px_8px_0_var(--midnight)] group"
        whileHover={{ scale: 1.1, rotate: isOpen ? 0 : -5 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 0 : 3 }}
      >
        <div className="absolute -top-3 -left-3 w-8 h-4 bg-white/90 border-[2px] border-midnight rotate-[-15deg] shadow-sm pointer-events-none" />
        <span className="font-display text-3xl md:text-5xl font-black uppercase text-midnight block leading-none">
          {isOpen ? "CLOSE" : "MENU"}
        </span>
      </motion.button>

      {/* 
        THE OVERLAY & MOOD BOARD
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-blueprint border-[8px] border-midnight overflow-hidden flex items-center justify-center"
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 100%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 100%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 100%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ambient Background Noise */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 2px, transparent 2px)', backgroundSize: '24px 24px' }} />

            <div className="relative w-full h-full max-w-[100vw] max-h-[100vh] flex items-center justify-center perspective-[1000px]">
              
              <h2 className="absolute top-10 left-10 font-display text-4xl md:text-8xl font-black text-[#F4F2EC] uppercase text-3d -rotate-6 opacity-30 select-none">
                Where to?
              </h2>

              {navLinks.map((link, i) => {
                const Doodle = link.doodle;
                // On mobile, halve the scatter distance so it fits on screen
                const targetX = isMobile ? `calc(${link.x} * 0.5)` : link.x;
                const targetY = isMobile ? `calc(${link.y} * 0.8)` : link.y;

                return (
                  <motion.div
                    key={link.href}
                    className="absolute"
                    initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                    animate={{ 
                      scale: 1, 
                      x: targetX, 
                      y: targetY, 
                      rotate: link.rot 
                    }}
                    exit={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: i * 0.05, 
                      type: "spring", 
                      bounce: 0.4 
                    }}
                    style={{ zIndex: navLinks.length - i }}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 0, 
                      zIndex: 100,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`block ${link.color} ${link.textColor} border-[4px] border-midnight p-6 md:p-10 shadow-[10px_10px_0_var(--midnight)] relative group`}
                    >
                      {/* Top Tape */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/90 border-[3px] border-midnight shadow-sm rotate-[4deg] z-10 transition-transform group-hover:rotate-0" />
                      
                      {/* Active Indicator */}
                      {pathname === link.href && (
                         <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#F4F2EC] border-[3px] border-midnight rounded-full flex items-center justify-center text-midnight shadow-[4px_4px_0_var(--midnight)] rotate-12 z-20 font-ui text-xs font-bold uppercase tracking-widest">
                           Here
                         </div>
                      )}

                      <div className="absolute top-4 right-4 w-12 h-12 opacity-20 pointer-events-none group-hover:opacity-60 transition-opacity">
                         <Doodle className="w-full h-full" delayIndex={0} />
                      </div>

                      <h3 className="font-display text-4xl md:text-6xl font-black uppercase mt-4">
                        {link.label}
                      </h3>
                      
                      <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-ui text-sm font-bold tracking-widest uppercase border-[2px] border-current px-3 py-1">
                          Go
                        </span>
                        <motion.span
                          className="inline-block text-3xl font-display font-bold"
                          initial={{ x: 0 }}
                          whileHover={{ x: 10 }}
                        >
                          →
                        </motion.span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
