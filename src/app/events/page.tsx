"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import eventsData from "@/data/events.json";
import type { ClubEvent } from "@/data/types";

const events: ClubEvent[] = eventsData as ClubEvent[];
const upcoming = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));
const past = events
  .filter((e) => e.status === "past")
  .sort((a, b) => b.date.localeCompare(a.date));

function formatDate(dateStr: string): { day: string; month: string; year: string } {
  const d = new Date(dateStr + "T00:00:00");
  return {
    day: d.getDate().toString(),
    month: d.toLocaleDateString("en-US", { month: "short" }),
    year: d.getFullYear().toString(),
  };
}

function formatFullDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventsPage() {
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
            What&apos;s Happening
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
            Events
          </h1>
          <p className="font-body text-lg text-text-muted max-w-lg mx-auto">
            Open mics, workshops, retreats, and gatherings that bring words to
            life.
          </p>
        </motion.div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-metro-yellow opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-metro-yellow" />
              </span>
              <h2 className="font-display text-3xl font-bold text-text-primary">
                Upcoming
              </h2>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-text-dim/20 hidden md:block" />

            <div className="space-y-8">
              {upcoming.map((event, i) => {
                const date = formatDate(event.date);
                return (
                  <ScrollReveal key={event.id} delay={0.1 * i}>
                    <div className="flex gap-6 md:gap-10 group">
                      {/* Date badge */}
                      <div className="hidden md:flex flex-col items-center shrink-0">
                        <div className="relative z-10 w-14 h-14 rounded-full bg-metro-yellow flex flex-col items-center justify-center text-midnight shadow-offset animate-pulse-glow">
                          <span className="font-ui text-lg font-bold leading-none">
                            {date.day}
                          </span>
                          <span className="font-ui text-[9px] uppercase font-semibold leading-none">
                            {date.month}
                          </span>
                        </div>
                      </div>

                      {/* Card */}
                      <div className="flex-1 bg-surface-elevated hover:bg-surface rounded-2xl p-6 md:p-8 border border-ink-black hover:border-metro-yellow/50 shadow-offset hover:shadow-offset-lg transition-all duration-300 group-hover:-translate-y-0.5">
                        <div className="md:hidden flex items-center gap-2 mb-3">
                          <span className="w-2 h-2 rounded-full bg-metro-yellow" />
                          <span className="font-ui text-xs text-metro-yellow font-bold">
                            {formatFullDate(event.date)}
                          </span>
                        </div>
                        <p className="hidden md:block font-ui text-xs text-text-muted mb-2">
                          {formatFullDate(event.date)}
                        </p>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary mb-2">
                          {event.title}
                        </h3>
                        <p className="font-body text-sm text-text-muted leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="gold-line-center" />
      </div>

      {/* Past Events */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-display text-3xl font-bold text-text-primary">
                Past Events
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {past.map((event, i) => (
              <ScrollReveal key={event.id} delay={0.1 * i}>
                <PastEventCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============= PAST EVENT CARD =============
function PastEventCard({ event }: { event: ClubEvent }) {
  const date = formatDate(event.date);

  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-ink-black shadow-offset">
      {/* Photo gallery placeholder */}
      {event.photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1">
          {event.photos.map((_, idx) => (
            <div
              key={idx}
              className="aspect-[4/3] rounded-xl bg-surface-elevated flex items-center justify-center border border-ink-black/50"
            >
              <div className="text-center">
                <span className="text-3xl opacity-20">📸</span>
                <p className="font-ui text-[10px] text-text-dim/50 mt-1">
                  Photo {idx + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-ui text-xs text-text-muted">
            {formatFullDate(event.date)}
          </span>
        </div>
        <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary mb-2">
          {event.title}
        </h3>
        <p className="font-body text-sm text-text-muted leading-relaxed">
          {event.longDescription || event.description}
        </p>
      </div>
    </div>
  );
}
