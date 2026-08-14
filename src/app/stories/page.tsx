"use client";

import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 bg-ink-black text-text-primary text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-ui text-xs uppercase tracking-[0.3em] text-metro-yellow mb-4">
            Our Members&apos; Work
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 relative inline-block">
            Stories & Poems
            <div className="absolute -top-6 -left-12 w-16 h-16 text-electric-blue -rotate-12 hidden md:block">
              <DoodleStar className="w-full h-full" delayIndex={1} />
            </div>
          </h1>
          <p className="font-body text-lg text-text-muted max-w-lg mx-auto relative">
            Original writing by our members — fiction, poetry, and everything
            between.
            <div className="absolute -bottom-10 right-0 w-24 h-12 text-metro-yellow/50 rotate-12 hidden md:block">
              <DoodleSquiggle className="w-full h-full" delayIndex={2} />
            </div>
          </p>
        </motion.div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 bg-midnight/90 backdrop-blur-md border-b border-text-dim/20">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 px-6 py-4">
          {(["all", "story", "poem"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-ui text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                filter === f
                  ? "bg-metro-yellow text-midnight shadow-offset"
                  : "text-text-muted hover:text-text-primary hover:bg-surface-elevated"
              }`}
            >
              {f === "all" ? "All" : f === "story" ? "Stories" : "Poems"}
            </button>
          ))}
        </div>
      </div>

      {/* Stories list */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {sortedMonths.map((month) => (
            <div key={month} className="mb-16">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-8">
                  <div className="gold-line" />
                  <h3 className="font-display text-lg font-semibold text-metro-yellow">
                    {formatMonth(month)}
                  </h3>
                </div>
              </ScrollReveal>

              <div className="space-y-4">
                {grouped[month].map((story, i) => (
                  <ScrollReveal key={story.id} delay={0.08 * i}>
                    <button
                      onClick={() => setSelectedStory(story)}
                      className="w-full text-left group"
                    >
                      <div className="bg-surface-elevated hover:bg-surface rounded-2xl p-6 md:p-8 border border-ink-black hover:border-metro-yellow/50 transition-all duration-300 shadow-offset hover:shadow-offset-lg hover:-translate-y-0.5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span
                                className={`font-ui text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                                  story.type === "poem"
                                    ? "bg-electric-blue/20 text-electric-blue"
                                    : "bg-metro-yellow/20 text-metro-yellow"
                                }`}
                              >
                                {story.type}
                              </span>
                              {story.featured && (
                                <span className="font-ui text-[10px] font-bold uppercase tracking-widest text-metro-yellow">
                                  ✦ Featured
                                </span>
                              )}
                            </div>
                            <h4 className="font-display text-xl md:text-2xl font-bold text-text-primary group-hover:text-metro-yellow transition-colors mb-1">
                              {story.title}
                            </h4>
                            <p className="font-ui text-sm text-text-muted">
                              by {story.author}
                            </p>
                            <p className="font-body text-sm text-text-muted/70 mt-3 line-clamp-2 leading-relaxed">
                              {story.body.substring(0, 180)}...
                            </p>
                          </div>
                          <span className="text-text-dim/30 group-hover:text-metro-yellow transition-colors text-xl mt-2 shrink-0">
                            →
                          </span>
                        </div>
                      </div>
                    </button>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
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

      {/* Reading modal */}
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

// ============= STORY MODAL =============
function StoryModal({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-midnight/90 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Content */}
      <motion.article
        className="relative z-10 w-full max-w-2xl bg-surface rounded-2xl shadow-offset-lg border border-ink-black my-8 mx-4 overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="bg-surface-elevated text-text-primary border-b border-ink-black px-8 md:px-12 py-10">
          <span
            className={`font-ui text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
              story.type === "poem"
                ? "bg-electric-blue/20 text-electric-blue"
                : "bg-metro-yellow/20 text-metro-yellow"
            }`}
          >
            {story.type}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-2">
            {story.title}
          </h2>
          <p className="font-ui text-sm text-text-muted">
            by {story.author} · {formatMonth(story.date)}
          </p>
        </div>

        {/* Body */}
        <div className="px-8 md:px-12 py-10">
          <div
            className={`font-body text-base md:text-lg leading-[1.9] text-text-primary ${
              story.type === "story" ? "drop-cap" : ""
            }`}
          >
            {story.body.split("\n").map((paragraph, i) => (
              <p key={i} className={paragraph.trim() === "" ? "h-4" : "mb-4"}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-midnight/50 hover:bg-midnight hover:text-metro-yellow text-text-muted transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.article>
    </motion.div>
  );
}
