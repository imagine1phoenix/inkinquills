"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import storiesData from "@/data/stories.json";
import type { Story } from "@/data/types";
import { DoodleArrow, DoodleCrown, DoodleStar, DoodleSquiggle, DoodleEye, DoodleSpark, DoodleSwirl, DoodleFace, DoodleCircle } from "@/components/Doodles";

const stories: Story[] = storiesData as Story[];

type FilterType = "all" | "story" | "poem";

// Group stories by month
function groupByMonth(items: Story[]): Record<string, Story[]> {
  const groups: Record<string, Story[]> = {};
  items.forEach((item) => {
    const key = item.date;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
}

function formatMonth(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// ─── PARALLAX WORD ───────────────────────────────────
function ParallaxWord({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <motion.div ref={ref} style={{ x }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────
export default function StoriesPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const filtered = filter === "all" ? stories : stories.filter((s) => s.type === filter);
  const grouped = groupByMonth(filtered);
  const sortedMonths = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedStory ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedStory]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-blueprint">
      
      {/* ═══════════════════════════════════════════════
          PAGE 1: THE COVER
          Full viewport. Blueprint bg. Massive typography.
          ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[100vh] bg-blueprint flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Smoky ambient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          <motion.div
            className="absolute top-[20%] left-[15%] w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] bg-metro-yellow/10 blur-[100px] rounded-full"
            animate={{ x: [0, 60, -30, 0], y: [0, -60, 30, 0], scale: [1, 1.15, 0.9, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-electric-blue/10 blur-[100px] rounded-full"
            animate={{ x: [0, -50, 40, 0], y: [0, 50, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-20 right-4 md:right-12 z-20"
        >
          <div className="bg-metro-yellow border-[3px] border-midnight px-4 py-2 shadow-[4px_4px_0_var(--midnight)] rotate-[3deg]">
            <span className="font-ui text-[10px] font-bold tracking-[0.3em] uppercase text-midnight">Section 04</span>
          </div>
        </motion.div>

        {/* THE MASSIVE TITLE */}
        <div className="relative z-10 text-center select-none flex flex-col items-center">
          {/* DOODLES */}
          <motion.div
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: -12 }}
            transition={{ delay: 0.6 }}
            className="absolute -top-8 -left-12 md:-top-14 md:-left-20 w-16 h-16 md:w-24 md:h-24 text-metro-yellow"
          >
            <DoodleCrown className="w-full h-full" delayIndex={0.5} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-10 -right-4 md:-bottom-20 md:-right-16 w-16 h-16 md:w-24 md:h-24 text-electric-blue"
          >
            <DoodleEye className="w-full h-full" delayIndex={1} />
          </motion.div>

          {/* "OUR" — off-white block */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-2 md:mb-4 self-start md:ml-12"
          >
            <span className="font-display text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-black text-[#F4F2EC] leading-[0.85] text-3d block">
              Our
            </span>
          </motion.div>

          {/* "STORIES" — yellow block */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            <div className="bg-[#F4F2EC] border-[4px] border-midnight px-4 md:px-8 py-1 md:py-3 shadow-[8px_8px_0_var(--electric-blue)] inline-block">
              <span className="font-display text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-black text-midnight leading-[0.85] block">
                Stories &
              </span>
            </div>
          </motion.div>

          {/* "POEMS" — raw text, tilted opposite */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: -1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mt-2 md:mt-4 self-end md:mr-12"
          >
            <span className="font-display text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-black text-metro-yellow leading-[0.85] text-3d block">
              Poems
            </span>
          </motion.div>
        </div>

        {/* Subtitle strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative z-10 mt-12 md:mt-16"
        >
          <div className="bg-midnight border-[3px] border-midnight px-6 py-3 shadow-[6px_6px_0_var(--metro-yellow)] rotate-[1deg]">
            <p className="font-body text-sm md:text-base text-[#F4F2EC] font-medium text-center tracking-wide uppercase">
              Original writing by our members — fiction, poetry, and everything between.
            </p>
          </div>
        </motion.div>

        
        {/* DOODLE EXPLOSION — Header */}
        <div className="absolute top-[20%] left-[5%] w-14 h-14 text-[#F4F2EC]/20 rotate-[30deg] pointer-events-none">
           <DoodleSwirl className="w-full h-full" delayIndex={0.8} />
        </div>
        <div className="absolute bottom-[15%] right-[8%] w-12 h-12 text-metro-yellow/20 -rotate-[25deg] pointer-events-none">
           <DoodleFace className="w-full h-full" delayIndex={2} />
        </div>
        <div className="absolute top-[35%] left-[15%] w-10 h-10 text-[#F4F2EC]/15 rotate-[55deg] pointer-events-none">
           <DoodleEye className="w-full h-full" delayIndex={2.5} />
        </div>
        <div className="absolute top-[70%] right-[20%] w-16 h-16 text-[#F4F2EC]/12 -rotate-[40deg] pointer-events-none">
           <DoodleCrown className="w-full h-full" delayIndex={1.2} />
        </div>
        <div className="absolute top-[50%] left-[25%] w-8 h-8 text-metro-yellow/15 rotate-[70deg] pointer-events-none">
           <DoodleCircle className="w-full h-full" delayIndex={0.5} />
        </div>
        <div className="absolute top-[10%] right-[25%] w-12 h-12 text-[#F4F2EC]/20 rotate-[-15deg] pointer-events-none">
           <DoodleArrow className="w-full h-full" delayIndex={1.8} />
        </div>
        <div className="absolute bottom-[25%] left-[10%] w-16 h-8 text-electric-blue/20 rotate-[10deg] pointer-events-none">
           <DoodleSquiggle className="w-full h-full" delayIndex={0.3} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PAGE 2: SCROLLING MARQUEE BREAK
          ═══════════════════════════════════════════════ */}
      <section className="relative bg-electric-blue border-y-[4px] border-midnight py-5 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-display text-2xl md:text-4xl font-black text-[#F4F2EC] uppercase mx-4 md:mx-8 flex items-center gap-4 md:gap-8">
              Read <span className="text-midnight">✦</span> Discover <span className="text-midnight">✦</span> Imagine <span className="text-midnight">✦</span> Write <span className="text-midnight">✦</span> Think <span className="text-midnight">✦</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          PAGE 3: FILTER BAR
          ═══════════════════════════════════════════════ */}
      <div className="sticky top-[72px] z-30 bg-midnight/95 backdrop-blur-md border-b-[4px] border-metro-yellow">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 px-6 py-4">
          {(["all", "story", "poem"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-ui text-xs md:text-sm font-bold uppercase tracking-widest px-6 py-2 border-[3px] border-midnight transition-all duration-300 ${
                filter === f
                  ? "bg-metro-yellow text-midnight shadow-[4px_4px_0_var(--electric-blue)] translate-y-[-2px]"
                  : "bg-[#F4F2EC] text-midnight/60 hover:text-midnight hover:shadow-[4px_4px_0_var(--midnight)]"
              }`}
            >
              {f === "all" ? "All" : f === "story" ? "Stories" : "Poems"}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          PAGE 4: THE ZINE LIST
          Huge month headers and bold colored story cards
          ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-4 md:px-8 relative overflow-hidden bg-midnight">
        {/* Subtle scan lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }} />

        <div className="max-w-5xl mx-auto relative z-10">
          {sortedMonths.map((month, monthIdx) => (
            <div key={month} className="mb-32">
              <ScrollReveal>
                <div className="mb-16 relative flex items-center">
                  <h3 className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] font-black text-metro-yellow uppercase leading-none opacity-20 pointer-events-none absolute -left-4 -top-8 whitespace-nowrap">
                    {formatMonth(month)}
                  </h3>
                  <h3 className="font-display text-3xl md:text-5xl font-black text-[#F4F2EC] uppercase relative z-10">
                    {formatMonth(month)}
                  </h3>
                  <div className="flex-1 h-[2px] bg-electric-blue ml-8 relative z-10 hidden sm:block"></div>
                </div>
              </ScrollReveal>

              <div className="space-y-16 md:space-y-24">
                {grouped[month].map((story, i) => (
                  <ScrollReveal key={story.id} delay={0.1 * (i % 3)}>
                    <StoryCard 
                      story={story} 
                      index={i} 
                      onClick={() => setSelectedStory(story)} 
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DOODLE EXPLOSION — Stories List */}
        <div className="absolute left-10 top-1/4 w-32 h-32 text-electric-blue/10 rotate-45 pointer-events-none">
           <DoodleArrow className="w-full h-full" delayIndex={0} />
        </div>
        <div className="absolute right-10 bottom-1/4 w-40 h-40 text-metro-yellow/10 -rotate-12 pointer-events-none">
           <DoodleCrown className="w-full h-full" delayIndex={0.5} />
        </div>
        <div className="absolute -left-16 bottom-1/3 w-48 h-48 text-electric-blue/5 -rotate-45 pointer-events-none">
           <DoodleSwirl className="w-full h-full" delayIndex={1} />
        </div>
        <div className="absolute top-20 right-20 w-24 h-24 text-metro-yellow/20 rotate-12 pointer-events-none">
           <DoodleSpark className="w-full h-full" delayIndex={1.5} />
        </div>
        <div className="absolute top-[8%] left-[5%] w-16 h-16 text-[#F4F2EC]/10 rotate-[20deg] pointer-events-none">
           <DoodleStar className="w-full h-full" delayIndex={2} />
        </div>
        <div className="absolute top-[15%] right-[4%] w-14 h-14 text-[#F4F2EC]/5 -rotate-[35deg] pointer-events-none">
           <DoodleFace className="w-full h-full" delayIndex={0.8} />
        </div>
        <div className="absolute top-[25%] left-[2%] w-10 h-10 text-metro-yellow/15 rotate-[60deg] pointer-events-none">
           <DoodleEye className="w-full h-full" delayIndex={2.5} />
        </div>
        <div className="absolute top-[35%] right-[6%] w-20 h-10 text-[#F4F2EC]/10 -rotate-[10deg] pointer-events-none">
           <DoodleSquiggle className="w-full h-full" delayIndex={3} />
        </div>
        <div className="absolute top-[45%] left-[8%] w-12 h-12 text-[#F4F2EC]/8 rotate-[50deg] pointer-events-none">
           <DoodleCircle className="w-full h-full" delayIndex={1.2} />
        </div>
        <div className="absolute top-[55%] right-[3%] w-16 h-16 text-metro-yellow/12 -rotate-[55deg] pointer-events-none">
           <DoodleStar className="w-full h-full" delayIndex={0.3} />
        </div>
        <div className="absolute top-[65%] left-[4%] w-14 h-14 text-[#F4F2EC]/5 rotate-[75deg] pointer-events-none">
           <DoodleSwirl className="w-full h-full" delayIndex={1.8} />
        </div>
        <div className="absolute top-[75%] right-[8%] w-10 h-10 text-metro-yellow/10 -rotate-[30deg] pointer-events-none">
           <DoodleFace className="w-full h-full" delayIndex={2.2} />
        </div>
        <div className="absolute top-[85%] left-[6%] w-18 h-18 text-[#F4F2EC]/10 rotate-[40deg] pointer-events-none">
           <DoodleCrown className="w-full h-full" delayIndex={0.5} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PAGE 5: THE CLOSING
          Full electric blue. One word. Maximum impact.
          ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] bg-electric-blue border-t-[4px] border-midnight flex items-center justify-center px-6 overflow-hidden">
        <ScrollReveal>
          <div className="text-center relative">
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[5rem] sm:text-[8rem] md:text-[11rem] lg:text-[14rem] font-black text-[#F4F2EC] leading-[0.8] uppercase select-none"
              style={{
                textShadow: '6px 6px 0 var(--midnight)',
              }}
            >
              Read.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-body text-sm md:text-base text-midnight mt-4 md:mt-6 font-bold"
            >
              — And read closely.
            </motion.p>

            <div className="absolute -top-8 -left-8 w-16 h-16 text-metro-yellow/30 rotate-12 pointer-events-none">
              <DoodleStar className="w-full h-full" delayIndex={0.5} />
            </div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 text-midnight/20 -rotate-12 pointer-events-none">
              <DoodleSwirl className="w-full h-full" delayIndex={1} />
            </div>
            <div className="absolute top-[-30px] right-[20%] w-10 h-10 text-[#F4F2EC]/15 rotate-[40deg] pointer-events-none">
              <DoodleFace className="w-full h-full" delayIndex={1.5} />
            </div>
            <div className="absolute bottom-[-20px] left-[15%] w-12 h-12 text-midnight/20 -rotate-[30deg] pointer-events-none">
              <DoodleEye className="w-full h-full" delayIndex={2} />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ============= READING MODAL ============= */}
      <AnimatePresence>
        {selectedStory && (
          <StoryModal
            story={selectedStory}
            onClose={() => setSelectedStory(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============= STORY CARD COMPONENT =============
function StoryCard({ story, index, onClick }: { story: Story; index: number; onClick: () => void }) {
  const isPoem = story.type === "poem";
  
  // Zine-style alternating themes
  const themes = [
    { bg: "bg-[#F4F2EC]", text: "text-midnight", desc: "text-midnight/80", shadow: "var(--metro-yellow)", typeBg: "bg-electric-blue text-[#F4F2EC]" },
    { bg: "bg-electric-blue", text: "text-[#F4F2EC]", desc: "text-[#F4F2EC]/80", shadow: "var(--midnight)", typeBg: "bg-metro-yellow text-midnight" },
    { bg: "bg-metro-yellow", text: "text-midnight", desc: "text-midnight/80", shadow: "var(--electric-blue)", typeBg: "bg-midnight text-[#F4F2EC]" },
  ];
  
  const theme = themes[index % 3];
  const rotation = (index % 5) - 2; 

  return (
    <ParallaxWord>
      <button
        onClick={onClick}
        className="w-full text-left group block focus:outline-none"
      >
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative ${theme.bg} border-[4px] border-midnight p-8 md:p-12 transition-all duration-300 mx-auto max-w-4xl`}
          style={{ rotate: `${rotation}deg`, boxShadow: `12px 12px 0 ${theme.shadow}` }}
        >
          {/* Top Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/90 border-[3px] border-midnight shadow-sm rotate-[3deg] z-10" />

          {/* Ghost Number inside card */}
          <span className="absolute bottom-4 right-6 font-display text-[80px] md:text-[140px] font-black opacity-[0.06] leading-none select-none pointer-events-none">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-10 relative z-10">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-6">
                <span className={`font-ui text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 border-[3px] border-midnight shadow-[3px_3px_0_var(--midnight)] ${theme.typeBg}`}>
                  {story.type}
                </span>
                {story.featured && (
                  <span className="font-ui text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-midnight border-[3px] border-midnight px-3 py-1 bg-white shadow-[3px_3px_0_var(--midnight)]">
                    ✦ Featured
                  </span>
                )}
              </div>
              
              <h4 className={`font-display text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] mb-4 ${theme.text}`}>
                {story.title}
              </h4>
              
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className={`w-12 h-[4px] ${theme.text === 'text-midnight' ? 'bg-midnight' : 'bg-[#F4F2EC]'}`}></div>
                <p className={`font-ui text-sm md:text-base font-bold uppercase tracking-widest ${theme.text}`}>
                  BY {story.author}
                </p>
              </div>
              
              <div className="relative">
                 <div className={`absolute left-0 top-0 bottom-0 w-[4px] ${theme.text === 'text-midnight' ? 'bg-midnight/20' : 'bg-[#F4F2EC]/20'}`}></div>
                 <p className={`font-body text-lg md:text-xl ${theme.desc} pl-6 line-clamp-3 leading-relaxed`}>
                   {story.body.substring(0, 250)}...
                 </p>
              </div>
            </div>
            
            <div className={`hidden md:flex shrink-0 w-20 h-20 rounded-full border-[4px] border-midnight bg-[#F4F2EC] items-center justify-center shadow-[6px_6px_0_var(--midnight)] group-hover:scale-110 transition-transform duration-300 self-center ${theme.text === 'text-midnight' ? 'group-hover:bg-electric-blue' : 'group-hover:bg-metro-yellow'}`}>
              <svg className="w-10 h-10 text-midnight ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.div>
      </button>
    </ParallaxWord>
  );
}

// ============= STORY MODAL (MANUSCRIPT SHEET) =============
function StoryModal({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-midnight/90 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Content (The Manuscript Sheet) */}
      <motion.article
        className="relative z-10 w-full max-w-3xl bg-[#F4F2EC] border-[4px] border-midnight shadow-[16px_16px_0_var(--metro-yellow)] my-auto overflow-hidden"
        initial={{ opacity: 0, y: 50, rotate: -2, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, rotate: 2, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* Top Tape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-white/80 border-b-[3px] border-x-[3px] border-midnight shadow-sm z-20" />

        {/* Close button pinned to the right */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-electric-blue text-[#F4F2EC] hover:bg-metro-yellow hover:text-midnight transition-colors z-30 border-[3px] border-midnight shadow-[4px_4px_0_var(--midnight)]"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-white border-b-[4px] border-midnight px-6 sm:px-12 md:px-16 py-12 md:py-16 relative">
          
          <div className="absolute top-8 left-8 w-16 h-16 text-metro-yellow/20 rotate-12">
            <DoodleSwirl className="w-full h-full" delayIndex={0} />
          </div>

          <div className="relative z-10">
             <span
               className={`inline-block font-ui text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border-[3px] border-midnight shadow-[3px_3px_0_var(--midnight)] mb-6 ${
                 story.type === "poem"
                   ? "bg-electric-blue text-[#F4F2EC]"
                   : "bg-metro-yellow text-midnight"
               }`}
             >
               {story.type}
             </span>
             <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] text-midnight mb-6">
               {story.title}
             </h2>
             
             <div className="flex flex-wrap items-center gap-4">
                <div className="bg-midnight text-[#F4F2EC] px-4 py-2 border-[3px] border-midnight">
                  <p className="font-ui text-xs font-bold uppercase tracking-widest">
                    BY {story.author}
                  </p>
                </div>
                <div className="bg-[#F4F2EC] px-4 py-2 border-[3px] border-midnight shadow-[3px_3px_0_var(--midnight)]">
                  <p className="font-ui text-xs font-bold uppercase tracking-widest text-midnight">
                    {formatMonth(story.date)}
                  </p>
                </div>
             </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-12 md:px-16 py-12 md:py-16 relative">
          <div className="absolute right-12 bottom-12 w-32 h-32 text-metro-yellow/20 -rotate-12 pointer-events-none">
             <DoodleEye className="w-full h-full" delayIndex={1} />
          </div>
          <div className="absolute left-8 top-12 w-20 h-20 text-electric-blue/10 rotate-[35deg] pointer-events-none">
             <DoodleSpark className="w-full h-full" delayIndex={2} />
          </div>

          <div
            className={`font-body text-lg md:text-xl leading-[2] text-midnight font-medium relative z-10 ${
              story.type === "story" ? "drop-cap-editorial" : ""
            }`}
          >
            {story.body.split("\n").map((paragraph, i) => (
              <p key={i} className={paragraph.trim() === "" ? "h-6" : "mb-6"}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
