"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import storiesData from "@/data/stories.json";
import type { Story } from "@/data/types";
import { DoodleArrow, DoodleCrown, DoodleStar, DoodleSquiggle, DoodleEye, DoodleSpark, DoodleSwirl } from "@/components/Doodles";

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

export default function StoriesPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const filtered =
    filter === "all" ? stories : stories.filter((s) => s.type === filter);
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
    <div className="min-h-screen bg-blueprint">
      {/* ============= HEADER ============= */}
      <section className="relative pt-28 md:pt-36 pb-16 px-6 overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
           <div className="w-[600px] h-[600px] bg-metro-yellow blur-[100px] rounded-full" />
        </div>

        {/* Header Sticky Note */}
        <div className="relative max-w-3xl mx-auto z-10 flex flex-col items-center">
          <div className="absolute -top-8 -right-2 md:-right-8 z-20 bg-electric-blue text-[#F4F2EC] px-4 py-2 font-ui text-[10px] font-bold uppercase tracking-widest border-2 border-midnight rotate-[5deg] shadow-[4px_4px_0_var(--midnight)]">
            SECTION 04
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#F4F2EC] text-midnight border-[4px] border-midnight p-8 md:p-14 shadow-[8px_8px_0_var(--metro-yellow)] md:shadow-[16px_16px_0_var(--metro-yellow)] w-full max-w-2xl"
          >
            {/* Top tape */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/70 border-2 border-midnight shadow-sm rotate-[-2deg]" />
            
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold mb-4 text-center leading-[0.9] uppercase">
              Stories &<br/>Poems
            </h1>
            <div className="w-full h-2 bg-midnight mb-6 border-b-2 border-dashed border-white"></div>
            <p className="font-body text-base md:text-xl font-bold text-center uppercase tracking-wider text-midnight/80">
              Original writing by our members — fiction, poetry, and everything between.
            </p>
          </motion.div>
          
          {/* Header Doodles */}
          <div className="absolute -bottom-10 -left-4 w-24 h-24 text-electric-blue -rotate-12 z-0 hidden sm:block">
             <DoodleStar className="w-full h-full" delayIndex={1} />
          </div>
          <div className="absolute top-1/2 -right-16 w-20 h-20 text-metro-yellow rotate-12 z-0 hidden md:block">
             <DoodleSquiggle className="w-full h-full" delayIndex={1.5} />
          </div>
        </div>
      </section>

      {/* ============= FILTER BAR ============= */}
      <div className="sticky top-[72px] z-30 bg-midnight/95 backdrop-blur-md border-b-[3px] border-text-dim/20">
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

      {/* ============= STORIES LIST ============= */}
      <section className="py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          {sortedMonths.map((month) => (
            <div key={month} className="mb-24">
              <ScrollReveal>
                <div className="flex flex-col items-center justify-center mb-12 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-[3px] border-dashed border-text-dim/20" />
                  </div>
                  <h3 className="relative bg-midnight px-6 font-display text-2xl md:text-3xl font-bold text-metro-yellow uppercase">
                    {formatMonth(month)}
                  </h3>
                </div>
              </ScrollReveal>

              <div className="space-y-12">
                {grouped[month].map((story, i) => (
                  <ScrollReveal key={story.id} delay={0.05 * i}>
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

        {/* Background Ambient Doodles */}
        <div className="absolute left-10 top-1/3 w-32 h-32 text-electric-blue/10 rotate-45 hidden lg:block pointer-events-none">
           <DoodleArrow className="w-full h-full" delayIndex={0} />
        </div>
        <div className="absolute right-10 bottom-1/4 w-40 h-40 text-metro-yellow/10 -rotate-12 hidden lg:block pointer-events-none">
           <DoodleCrown className="w-full h-full" delayIndex={0.5} />
        </div>
        <div className="absolute -left-16 bottom-1/3 w-48 h-48 text-electric-blue/5 -rotate-45 hidden lg:block pointer-events-none">
           <DoodleSwirl className="w-full h-full" delayIndex={1} />
        </div>
        <div className="absolute top-20 right-20 w-24 h-24 text-metro-yellow/20 rotate-12 hidden lg:block pointer-events-none">
           <DoodleSpark className="w-full h-full" delayIndex={1.5} />
        </div>
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
  // Randomize rotation slightly for the scattered manuscript look (-2, -1, 0, 1, 2)
  const rotation = (index % 5) - 2; 

  return (
    <button
      onClick={onClick}
      className="w-full text-left group block focus:outline-none"
    >
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="relative bg-[#F4F2EC] border-[4px] border-midnight p-6 md:p-10 shadow-[8px_8px_0_var(--midnight)] group-hover:shadow-[12px_12px_0_var(--electric-blue)] transition-all duration-300"
        style={{ rotate: `${rotation}deg` }}
      >
        {/* Top Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/90 border-2 border-midnight shadow-sm rotate-[3deg] z-10" />

        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`font-ui text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border-[2px] border-midnight shadow-[2px_2px_0_var(--midnight)] ${
                  story.type === "poem"
                    ? "bg-electric-blue text-[#F4F2EC]"
                    : "bg-metro-yellow text-midnight"
                }`}
              >
                {story.type}
              </span>
              {story.featured && (
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-midnight border-[2px] border-midnight px-3 py-1 bg-white">
                  ✦ Featured
                </span>
              )}
            </div>
            
            <h4 className="font-display text-3xl md:text-5xl font-bold text-midnight uppercase leading-tight mb-2 group-hover:text-electric-blue transition-colors">
              {story.title}
            </h4>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[3px] bg-midnight"></div>
              <p className="font-ui text-xs md:text-sm font-bold uppercase tracking-widest text-midnight">
                BY {story.author}
              </p>
            </div>
            
            <div className="relative">
               <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-metro-yellow/50 group-hover:bg-metro-yellow transition-colors"></div>
               <p className="font-body text-base md:text-lg text-midnight/80 pl-6 line-clamp-3 leading-relaxed">
                 {story.body.substring(0, 250)}...
               </p>
            </div>
          </div>
          
          <div className="hidden md:flex shrink-0 w-16 h-16 rounded-full border-[3px] border-midnight bg-white items-center justify-center shadow-[4px_4px_0_var(--midnight)] group-hover:bg-metro-yellow group-hover:scale-110 transition-all duration-300">
            <svg className="w-8 h-8 text-midnight ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </button>
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
        className="relative z-10 w-full max-w-3xl bg-[#F4F2EC] border-[4px] border-midnight shadow-[16px_16px_0_var(--electric-blue)] my-auto overflow-hidden"
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
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-metro-yellow text-midnight hover:bg-electric-blue hover:text-[#F4F2EC] transition-colors z-30 border-[3px] border-midnight shadow-[4px_4px_0_var(--midnight)]"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-white border-b-[4px] border-midnight px-6 sm:px-12 md:px-16 py-12 md:py-16 relative">
          
          <div className="absolute top-8 left-8 w-16 h-16 text-electric-blue/20 rotate-12">
            <DoodleSwirl className="w-full h-full" delayIndex={0} />
          </div>

          <div className="relative z-10">
             <span
               className={`inline-block font-ui text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border-[2px] border-midnight shadow-[2px_2px_0_var(--midnight)] mb-6 ${
                 story.type === "poem"
                   ? "bg-electric-blue text-[#F4F2EC]"
                   : "bg-metro-yellow text-midnight"
               }`}
             >
               {story.type}
             </span>
             <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold uppercase leading-[0.9] text-midnight mb-6">
               {story.title}
             </h2>
             
             <div className="flex flex-wrap items-center gap-4">
                <div className="bg-midnight text-[#F4F2EC] px-3 py-1 border-[2px] border-midnight">
                  <p className="font-ui text-xs font-bold uppercase tracking-widest">
                    BY {story.author}
                  </p>
                </div>
                <div className="bg-white px-3 py-1 border-[2px] border-midnight shadow-[2px_2px_0_var(--midnight)]">
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
