"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import storiesData from "@/data/stories.json";
import type { Story } from "@/data/types";

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
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 bg-charcoal text-parchment text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-ui text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Our Members&apos; Work
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
            Stories & Poems
          </h1>
          <p className="font-body text-lg text-parchment/50 max-w-lg mx-auto">
            Original writing by our members — fiction, poetry, and everything
            between.
          </p>
        </motion.div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 bg-parchment/90 backdrop-blur-md border-b border-ink/5">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 px-6 py-4">
          {(["all", "story", "poem"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-ui text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                filter === f
                  ? "bg-ink text-parchment"
                  : "text-ink-light hover:text-ink hover:bg-ink/5"
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
                  <h3 className="font-display text-lg font-semibold text-ink-light">
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
                      <div className="bg-parchment-dark/50 hover:bg-parchment-dark rounded-2xl p-6 md:p-8 border border-ink/5 hover:border-gold/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span
                                className={`font-ui text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                                  story.type === "poem"
                                    ? "bg-burgundy/10 text-burgundy"
                                    : "bg-gold/10 text-gold-dim"
                                }`}
                              >
                                {story.type}
                              </span>
                              {story.featured && (
                                <span className="font-ui text-[10px] font-bold uppercase tracking-widest text-gold">
                                  ✦ Featured
                                </span>
                              )}
                            </div>
                            <h4 className="font-display text-xl md:text-2xl font-bold text-ink group-hover:text-burgundy transition-colors mb-1">
                              {story.title}
                            </h4>
                            <p className="font-ui text-sm text-ink-light">
                              by {story.author}
                            </p>
                            <p className="font-body text-sm text-ink-light/70 mt-3 line-clamp-2 leading-relaxed">
                              {story.body.substring(0, 180)}...
                            </p>
                          </div>
                          <span className="text-ink-light/30 group-hover:text-gold transition-colors text-xl mt-2 shrink-0">
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
        className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Content */}
      <motion.article
        className="relative z-10 w-full max-w-2xl bg-parchment rounded-2xl shadow-2xl my-8 mx-4 overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="bg-charcoal text-parchment px-8 md:px-12 py-10">
          <span
            className={`font-ui text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
              story.type === "poem"
                ? "bg-burgundy/20 text-burgundy"
                : "bg-gold/20 text-gold"
            }`}
          >
            {story.type}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-2">
            {story.title}
          </h2>
          <p className="font-ui text-sm text-parchment/50">
            by {story.author} · {formatMonth(story.date)}
          </p>
        </div>

        {/* Body */}
        <div className="px-8 md:px-12 py-10">
          <div
            className={`font-body text-base md:text-lg leading-[1.9] text-ink ${
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
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-parchment/10 hover:bg-parchment/20 text-parchment transition-colors"
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
