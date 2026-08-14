"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { DoodleArrow, DoodleCircle, DoodleUnderline, DoodleStar, DoodleSquiggle, DoodleFace, DoodleCrown, DoodleEye, DoodleSwirl, DoodleSpark } from "@/components/Doodles";

const heroQuotes = [
  "We are all stories in the end. Just make it a good one.",
  "A word after a word after a word is power.",
  "There is no greater agony than bearing an untold story inside you.",
  "The first draft is just you telling yourself the story.",
  "Literature is the most agreeable way of ignoring life.",
];

const sectionCards = [
  {
    href: "/stories",
    title: "Stories & Poems",
    description: "Original work by our members — fiction, poetry, and everything between.",
    icon: "✍",
  },
  {
    href: "/events",
    title: "Events",
    description: "Open mics, workshops, retreats, and gatherings that bring words to life.",
    icon: "✦",
  },
  {
    href: "/library",
    title: "The Library",
    description: "Our curated bookshelf — reviews and recommendations from avid readers.",
    icon: "📖",
  },
  {
    href: "/about",
    title: "About Us",
    description: "Who we are, what we do, and why stories matter to us.",
    icon: "◈",
  },
];

const featuredPoem = {
  lines: [
    "We live in the margins",
    "of books we haven't finished,",
    "scribbling our real thoughts",
    "in the white space",
    "between someone else's certainties.",
  ],
  author: "Priya Nair",
  title: "Margins",
};

// Letter stagger animation for the hero title
const titleContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
};

const titleLetter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function LandingPage() {
  const clubName = "Ink in Quills";

  return (
    <div>
      {/* ============= HERO ============= */}
      <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-electric-blue text-text-primary px-6" style={{ background: 'linear-gradient(135deg, #012CEB 0%, #001066 100%)' }}>
        {/* Background Silhouette Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
           <div className="w-[800px] h-[800px] bg-midnight blur-[100px] rounded-full" />
        </div>

        {/* Central 3D Text */}
        <div className="relative z-10 text-center select-none">
           <div className="absolute -top-12 -left-12 w-24 h-24 rotate-12 text-[#F4F2EC] opacity-80">
             <DoodleStar className="w-full h-full" delayIndex={0.5} />
           </div>
           <h1 className="font-display text-6xl sm:text-8xl md:text-[12rem] leading-[0.8] text-[#F4F2EC] text-3d -rotate-2 hover:scale-105 transition-transform duration-500 cursor-default">
             Ink in<br />Quills
           </h1>
           <div className="absolute -bottom-16 -right-8 w-32 h-16 -rotate-6 text-[#F4F2EC] opacity-80">
             <DoodleSquiggle className="w-full h-full" delayIndex={1} />
           </div>
        </div>

        {/* Top Left: Est Card */}
        <div className="absolute top-16 left-4 sm:top-24 sm:left-6 md:top-32 md:left-16 lg:left-24 z-20">
          <div className="bg-[#F4F2EC] text-midnight border-2 border-midnight p-2 sm:p-3 md:p-4 shadow-[4px_4px_0_var(--electric-blue)] md:shadow-[6px_6px_0_var(--electric-blue)] font-body text-xs sm:text-sm font-bold text-center -rotate-3 hover:rotate-0 transition-transform cursor-default">
            EST. 2026<br />
            <span className="font-normal text-[10px] sm:text-xs border-t border-midnight/20 mt-1 pt-1 block">Literary Club</span>
          </div>
        </div>

        {/* Top Right: Graph Lockup */}
        <div className="absolute top-36 right-4 sm:top-24 sm:right-6 md:top-32 md:right-16 lg:right-24 z-20 flex items-start gap-2 sm:gap-4 scale-75 origin-top-right sm:scale-100">
          <div className="text-right font-display text-sm sm:text-xl md:text-2xl leading-tight">
            Creative by night,<br />
            more creative by <span className="bg-[#F4F2EC] text-electric-blue border-2 border-midnight px-1 sm:px-2 py-0.5 sm:py-1 shadow-[4px_4px_0_var(--electric-blue)] inline-block mt-1">midnight.</span>
          </div>
          {/* Simple SVG Graph */}
          <div className="w-16 h-10 sm:w-24 sm:h-16 border-l-2 border-b-2 border-[#F4F2EC] relative mt-1 sm:mt-0">
            <svg viewBox="0 0 100 100" className="absolute bottom-0 left-0 w-full h-full overflow-visible">
               <path d="M 0 80 Q 50 80 100 20" fill="none" stroke="#F4F2EC" strokeWidth="4" strokeLinecap="round" />
               <circle cx="100" cy="20" r="6" fill="#F4F2EC" />
            </svg>
            <div className="absolute -bottom-6 left-0 text-[8px] sm:text-[10px] font-ui">20:00</div>
            <div className="absolute -bottom-6 right-0 text-[8px] sm:text-[10px] font-ui">00:00</div>
            <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-8 h-8 sm:w-12 sm:h-12 text-metro-yellow">
               <DoodleFace className="w-full h-full" delayIndex={2} />
            </div>
          </div>
        </div>

        {/* Bottom Left: Timeline */}
        <div className="absolute bottom-28 left-4 sm:bottom-32 sm:left-6 md:bottom-40 md:left-16 lg:left-24 z-20 flex flex-col gap-3 sm:gap-6">
           <div className="relative pl-4 sm:pl-6">
             <div className="absolute left-0 top-1 sm:top-2 bottom-[-1rem] sm:bottom-[-1.5rem] w-[1px] sm:w-[2px] border-l sm:border-l-2 border-dashed border-[#F4F2EC]/30" />
             <div className="text-[8px] sm:text-[10px] font-ui text-[#F4F2EC]/70 uppercase tracking-widest">Started As</div>
             <div className="font-display text-sm sm:text-xl">Reader</div>
           </div>
           <div className="relative pl-4 sm:pl-6">
             <div className="absolute left-0 top-1 sm:top-2 bottom-[-1rem] sm:bottom-[-1.5rem] w-[1px] sm:w-[2px] border-l sm:border-l-2 border-dashed border-[#F4F2EC]/30" />
             <div className="text-[8px] sm:text-[10px] font-ui text-[#F4F2EC]/70 uppercase tracking-widest">Became</div>
             <div className="font-display text-sm sm:text-xl">Writer</div>
           </div>
           <div className="relative pl-4 sm:pl-6">
             <div className="text-[8px] sm:text-[10px] font-ui text-[#F4F2EC]/70 uppercase tracking-widest">Currently</div>
             <div className="font-display text-base sm:text-2xl">Storyteller</div>
           </div>
        </div>

        {/* Bottom Center: CTA */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
           <div className="absolute -top-8 -left-10 sm:-top-12 sm:-left-16 w-12 h-12 sm:w-20 sm:h-20 text-metro-yellow/50 -rotate-12">
             <DoodleEye className="w-full h-full" delayIndex={1.5} />
           </div>
           <div className="absolute -top-2 -right-10 sm:-top-4 sm:-right-16 w-10 h-10 sm:w-16 sm:h-16 text-electric-blue/50 rotate-12">
             <DoodleSpark className="w-full h-full" delayIndex={2} />
           </div>
           <div className="bg-midnight text-[#F4F2EC] border-2 border-[#F4F2EC] px-4 py-2 sm:px-6 font-ui text-[10px] sm:text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-[#F4F2EC] hover:text-midnight transition-colors">
             GO ON, SCROLL DOWN
           </div>
           <div className="w-8 h-8 sm:w-16 sm:h-16 mt-2 relative">
             <svg viewBox="0 0 100 100" fill="none" stroke="#F4F2EC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M 50 10 L 50 90 M 30 70 L 50 90 L 70 70" />
             </svg>
           </div>
        </div>

        {/* Bottom Right: Audio Icon */}
        <div className="absolute bottom-28 right-4 sm:bottom-32 sm:right-6 md:bottom-32 md:right-16 lg:right-24 z-20">
           <div className="bg-[#F4F2EC] border-2 border-midnight w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative cursor-pointer shadow-[4px_4px_0_var(--midnight)] hover:-translate-y-1 transition-transform group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--midnight)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                 <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                 <line x1="23" y1="9" x2="17" y2="15"></line>
                 <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
              <div className="absolute -inset-2 sm:-inset-4 pointer-events-none">
                 <DoodleCircle className="w-full h-full stroke-metro-yellow" delayIndex={1} />
              </div>
           </div>
        </div>
      </section>

      {/* ============= FEATURED PIECE ============= */}
      <section className="py-24 md:py-32 px-6 bg-surface-elevated relative overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 text-midnight/10 -rotate-12">
           <DoodleCrown className="w-full h-full" delayIndex={0} />
        </div>
        <div className="absolute bottom-10 right-10 w-32 h-16 text-metro-yellow/20 rotate-12">
           <DoodleSquiggle className="w-full h-full" delayIndex={0} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <p className="font-ui text-xs uppercase tracking-[0.3em] text-metro-yellow mb-8">
              Featured Poem
            </p>
          </ScrollReveal>

          <div className="space-y-1">
            {featuredPoem.lines.map((line, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <p className="font-body text-xl md:text-2xl text-text-primary leading-relaxed italic">
                  {line}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.6}>
            <div className="mt-8 space-y-1">
              <div className="gold-line-center" />
              <p className="mt-4 font-display text-sm text-text-muted">
                &ldquo;{featuredPoem.title}&rdquo; — {featuredPoem.author}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.8}>
            <Link
              href="/stories"
              className="inline-block mt-8 font-ui text-sm font-bold text-metro-yellow hover:text-text-primary transition-colors border-b border-metro-yellow/30 hover:border-text-primary/30 pb-0.5"
            >
              Read more from our writers →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ============= SECTION CARDS ============= */}
      <section className="py-24 md:py-32 px-6 bg-surface relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-text-primary mb-16 relative inline-block">
              Explore
              <div className="absolute -top-6 -right-12 w-16 h-16 text-electric-blue -rotate-12">
                <DoodleStar className="w-full h-full" delayIndex={0} />
              </div>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectionCards.map((card, i) => (
              <ScrollReveal key={card.href} delay={0.1 * i}>
                <Link href={card.href} className="group block h-full">
                  <div className="h-full bg-surface-elevated rounded-2xl p-8 border border-ink-black shadow-offset hover:shadow-offset-lg hover:-translate-y-2 transition-all duration-300 group-hover:border-metro-yellow/50">
                    <span className="text-4xl mb-4 block">{card.icon}</span>
                    <h3 className="font-display text-xl font-bold text-text-primary mb-2 group-hover:text-metro-yellow transition-colors">
                      {card.title}
                    </h3>
                    <p className="font-body text-sm text-text-muted leading-relaxed">
                      {card.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-metro-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-ui text-xs font-medium">Explore</span>
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CALL TO ACTION ============= */}
      <section className="py-24 md:py-32 px-6 bg-midnight text-text-primary text-center relative overflow-hidden">
        <div className="absolute top-20 left-10 w-48 h-48 text-electric-blue/10 -rotate-12 pointer-events-none">
          <DoodleSwirl className="w-full h-full" delayIndex={0} />
        </div>
        <div className="absolute bottom-20 right-10 w-32 h-32 text-metro-yellow/10 rotate-12 pointer-events-none">
          <DoodleFace className="w-full h-full" delayIndex={1} />
        </div>
        <ScrollReveal>
          <p className="font-ui text-xs uppercase tracking-[0.3em] text-metro-yellow mb-6">
            Our Signature Feature
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 relative inline-block">
            The Book Wall
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%]">
              <DoodleCircle className="w-full h-full" delayIndex={1} />
            </div>
          </h2>
          <div className="relative">
            <p className="font-body text-lg text-text-muted max-w-lg mx-auto mb-10 leading-relaxed">
              Browse our curated bookshelf. Pull a book from the shelf. Read our
              review. Find your next obsession.
            </p>
            <div className="absolute -top-4 -right-16 w-24 h-24 hidden md:block">
              <DoodleArrow className="w-full h-full rotate-90" delayIndex={2} />
            </div>
          </div>
          <Link
            href="/library"
            className="inline-flex items-center gap-3 btn-primary font-ui font-semibold text-sm px-8 py-4 animate-pulse-glow"
          >
            Enter the Library
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}

// ============= ROTATING QUOTE COMPONENT =============
function RotatingQuote({ quotes }: { quotes: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev: number) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="h-16 flex items-center justify-center overflow-hidden">
      <motion.p
        key={index}
        className="font-body text-sm md:text-base text-text-dim italic max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        &ldquo;{quotes[index]}&rdquo;
      </motion.p>
    </div>
  );
}
