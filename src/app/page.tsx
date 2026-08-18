"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { DoodleArrow, DoodleCircle, DoodleUnderline, DoodleStar, DoodleSquiggle, DoodleFace, DoodleCrown, DoodleEye, DoodleSwirl, DoodleSpark } from "@/components/Doodles";

const sectionCards = [
  {
    href: "/stories",
    title: "Stories & Poems",
    description: "Original work by our members — fiction, poetry, and everything between.",
    doodle: "squiggle",
    theme: "bg-electric-blue text-[#F4F2EC]",
    shadow: "var(--metro-yellow)",
  },
  {
    href: "/events",
    title: "Events",
    description: "Open mics, workshops, retreats, and gatherings that bring words to life.",
    doodle: "spark",
    theme: "bg-metro-yellow text-midnight",
    shadow: "var(--electric-blue)",
  },
  {
    href: "/library",
    title: "The Library",
    description: "Our curated bookshelf — reviews and recommendations from avid readers.",
    doodle: "eye",
    theme: "bg-midnight text-[#F4F2EC]",
    shadow: "var(--metro-yellow)",
  },
  {
    href: "/about",
    title: "About Us",
    description: "Who we are, what we do, and why stories matter to us.",
    doodle: "face",
    theme: "bg-[#F4F2EC] text-midnight",
    shadow: "var(--midnight)",
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
  title: "Margins",
};

export default function LandingPage() {
  const clubName = "Ink in Quills";

  return (
    <div>
      {/* ============= HERO ============= */}
      <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-blueprint text-text-primary px-6 border-b-[4px] border-midnight">
        {/* Background Smoky / Cloudy Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
          <motion.div
            className="absolute top-[10%] left-[10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-white/10 blur-[100px] sm:blur-[120px] rounded-full mix-blend-overlay"
            animate={{ 
              x: [0, 100, -50, 0], 
              y: [0, -100, 50, 0],
              scale: [1, 1.2, 0.9, 1] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-midnight/30 blur-[100px] sm:blur-[120px] rounded-full mix-blend-multiply"
            animate={{ 
              x: [0, -80, 60, 0], 
              y: [0, 80, -40, 0],
              scale: [1, 1.1, 0.8, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[50vw] md:w-[60vw] md:h-[30vw] bg-[#F4F2EC]/10 blur-[120px] sm:blur-[140px] rounded-[100%]"
            animate={{ 
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center mix-blend-multiply">
             <div className="w-[80vw] h-[80vw] md:w-[800px] md:h-[800px] bg-midnight blur-[100px] sm:blur-[120px] rounded-full opacity-60" />
          </div>
        </div>

        {/* Central 3D Text */}
        <div className="relative z-10 text-center select-none">
           <div className="absolute -top-12 -left-12 w-24 h-24 rotate-12 text-[#F4F2EC] opacity-80">
             <DoodleStar className="w-full h-full" delayIndex={0.5} />
           </div>
           <h1 className="font-display text-[7.5rem] leading-[0.8] sm:text-8xl md:text-[12rem] sm:leading-[0.8] text-[#F4F2EC] text-3d -rotate-2 hover:scale-105 transition-transform duration-500 cursor-default whitespace-nowrap">
             Ink in<br />Quills
           </h1>
           <div className="absolute -bottom-16 -right-8 w-32 h-16 -rotate-6 text-[#F4F2EC] opacity-80">
             <DoodleSquiggle className="w-full h-full" delayIndex={1} />
           </div>
        </div>

        {/* Top Left: Est Card */}
        <div className="absolute top-16 left-4 sm:top-24 sm:left-6 md:top-32 md:left-16 lg:left-24 z-20">
          <div className="bg-[#F4F2EC] text-midnight border-2 border-midnight p-2 sm:p-3 md:p-4 shadow-[4px_4px_0_var(--electric-blue)] md:shadow-[6px_6px_0_var(--electric-blue)] font-body text-xs sm:text-sm font-bold text-center -rotate-3 hover:rotate-0 transition-transform cursor-default">
            EST. 2023<br />
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




      </section>

      {/* ============= FEATURED PIECE (ZINE STYLE) ============= */}
      <section className="py-24 md:py-32 px-6 bg-metro-yellow relative overflow-hidden border-b-[4px] border-midnight">
        <div className="absolute top-10 left-10 w-32 h-32 text-midnight/20 rotate-[-15deg]">
           <DoodleCrown className="w-full h-full" delayIndex={0} />
        </div>
        <div className="absolute bottom-10 right-10 w-40 h-24 text-electric-blue/30 rotate-[20deg]">
           <DoodleSquiggle className="w-full h-full" delayIndex={0} />
        </div>
        <div className="absolute top-1/2 -left-16 w-48 h-48 text-[#F4F2EC]/40 -rotate-[35deg]">
           <DoodleEye className="w-full h-full" delayIndex={1.5} />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="mb-12 flex justify-center">
            <div className="bg-midnight border-[4px] border-midnight px-6 py-2 shadow-[8px_8px_0_var(--electric-blue)] -rotate-2 inline-block">
              <span className="font-ui text-sm font-bold tracking-[0.3em] uppercase text-[#F4F2EC]">
                Featured Poem
              </span>
            </div>
          </div>

          <div className="relative bg-[#F4F2EC] border-[4px] border-midnight p-8 md:p-16 shadow-[16px_16px_0_var(--midnight)] rotate-1">
            {/* Top Tape */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/80 border-[3px] border-midnight shadow-sm -rotate-[3deg] z-10" />
            
            {/* Giant quote mark */}
            <div className="absolute -top-8 -left-6 font-display text-[120px] leading-none text-electric-blue rotate-12 select-none">
              "
            </div>

            <div className="space-y-2 relative z-10">
              {featuredPoem.lines.map((line, i) => (
                <ScrollReveal key={i} delay={0.1 * i}>
                  <p className="font-display text-3xl md:text-5xl lg:text-6xl text-midnight leading-[1.1] font-bold uppercase mix-blend-multiply">
                    {line}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.6}>
              <div className="mt-12 md:mt-16 pt-8 border-t-[4px] border-dashed border-midnight flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-black text-midnight uppercase bg-metro-yellow inline-block px-2">
                    {featuredPoem.title}
                  </h3>

                </div>

                <Link
                  href="/stories"
                  className="group relative inline-block bg-electric-blue border-[3px] border-midnight px-6 py-3 font-ui text-xs md:text-sm font-bold uppercase tracking-widest text-[#F4F2EC] transition-transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_var(--midnight)]"
                >
                  Read more →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============= SECTION CARDS (ZINE STYLE) ============= */}
      <section className="py-24 md:py-32 px-6 bg-midnight relative border-b-[4px] border-midnight overflow-hidden">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#F4F2EC 2px, transparent 2px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex justify-center mb-16 md:mb-24">
              <div className="relative inline-block">
                <h2 className="font-display text-6xl md:text-[8rem] font-black text-[#F4F2EC] uppercase leading-none text-3d -rotate-2">
                  Explore
                </h2>
                <div className="absolute -top-12 -right-16 w-24 h-24 text-metro-yellow rotate-12">
                  <DoodleStar className="w-full h-full" delayIndex={0} />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {sectionCards.map((card, i) => {
              const rotation = (i % 2 === 0 ? 1 : -1) * (i * 1.5 + 2);
              return (
                <ScrollReveal key={card.href} delay={0.1 * i}>
                  <Link href={card.href} className="group block h-full">
                    <div 
                      className={`h-full ${card.theme} p-8 border-[4px] border-midnight transition-transform duration-300 relative`}
                      style={{ 
                        rotate: `${rotation}deg`,
                        boxShadow: `8px 8px 0 ${card.shadow}`
                      }}
                    >
                      {/* Top Tape */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/90 border-[3px] border-midnight shadow-sm rotate-[3deg] z-10" />

                      <div className="absolute top-4 right-4 w-16 h-16 opacity-30 pointer-events-none select-none">
                        {card.doodle === "squiggle" && <DoodleSquiggle className="w-full h-full" delayIndex={0} />}
                        {card.doodle === "spark" && <DoodleSpark className="w-full h-full" delayIndex={0} />}
                        {card.doodle === "eye" && <DoodleEye className="w-full h-full" delayIndex={0} />}
                        {card.doodle === "face" && <DoodleFace className="w-full h-full" delayIndex={0} />}
                      </div>

                      <h3 className="font-display text-3xl font-black uppercase mb-4 mt-6 leading-none">
                        {card.title}
                      </h3>
                      
                      <div className={`w-12 h-1 mb-4 ${card.theme.includes('bg-midnight') || card.theme.includes('bg-electric-blue') ? 'bg-[#F4F2EC]' : 'bg-midnight'}`} />
                      
                      <p className="font-body text-base font-bold leading-relaxed opacity-90">
                        {card.description}
                      </p>
                      
                      <div className="mt-8 flex items-center justify-between">
                        <span className="font-ui text-xs font-bold tracking-widest uppercase border-[2px] border-current px-2 py-1">
                          Go
                        </span>
                        <motion.span
                          className="inline-block text-2xl font-display font-bold"
                          whileHover={{ x: 8 }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============= CALL TO ACTION (ZINE STYLE) ============= */}
      <section className="py-24 md:py-36 px-6 bg-electric-blue relative overflow-hidden">
        <div className="absolute top-20 left-10 w-48 h-48 text-[#F4F2EC]/20 rotate-[35deg] pointer-events-none">
          <DoodleSwirl className="w-full h-full" delayIndex={0} />
        </div>
        <div className="absolute bottom-20 right-10 w-40 h-40 text-metro-yellow/20 -rotate-12 pointer-events-none">
          <DoodleFace className="w-full h-full" delayIndex={1} />
        </div>
        <div className="absolute top-[40%] right-[20%] w-20 h-20 text-midnight/20 rotate-[70deg] pointer-events-none">
          <DoodleCircle className="w-full h-full" delayIndex={2} />
        </div>

        <ScrollReveal>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
            
            <div className="bg-metro-yellow border-[4px] border-midnight px-4 py-2 shadow-[6px_6px_0_var(--midnight)] rotate-2 mb-12 inline-block">
              <span className="font-ui text-sm font-bold tracking-[0.3em] uppercase text-midnight">
                Our Signature Feature
              </span>
            </div>

            <div className="relative inline-block mb-12">
              <h2 className="font-display text-[4rem] sm:text-[7rem] md:text-[9rem] font-black text-[#F4F2EC] uppercase leading-[0.8] text-3d -rotate-2 select-none">
                The Book Wall
              </h2>
              <div className="absolute -top-12 -left-12 w-24 h-24 hidden md:block text-metro-yellow rotate-45">
                <DoodleSpark className="w-full h-full" delayIndex={1} />
              </div>
            </div>

            <div className="relative mb-16 bg-[#F4F2EC] border-[4px] border-midnight p-6 max-w-2xl shadow-[12px_12px_0_var(--midnight)] -rotate-1">
              <div className="absolute -top-3 left-1/4 w-12 h-6 bg-white/90 border-[2px] border-midnight shadow-sm rotate-[5deg] z-10" />
              <div className="absolute -bottom-3 right-1/4 w-12 h-6 bg-white/90 border-[2px] border-midnight shadow-sm -rotate-[4deg] z-10" />
              <p className="font-body text-xl md:text-2xl text-midnight font-bold leading-relaxed uppercase tracking-wide">
                Browse our curated bookshelf. Pull a book from the shelf. Read our review. Find your next obsession.
              </p>
            </div>

            <Link
              href="/library"
              className="group relative inline-block bg-midnight border-[4px] border-metro-yellow px-12 py-6 font-display text-3xl font-black uppercase text-[#F4F2EC] transition-transform hover:-translate-y-2 hover:translate-x-2 hover:shadow-[-8px_8px_0_var(--metro-yellow)] rotate-2"
            >
              Enter the Library
              <motion.span
                className="inline-block ml-4"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>

          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
