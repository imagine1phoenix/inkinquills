"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import eventsData from "@/data/events.json";
import type { ClubEvent } from "@/data/types";
import { DoodleCircle, DoodleCrown, DoodleStar, DoodleFace, DoodleSquiggle, DoodleEye, DoodleSpark, DoodleSwirl } from "@/components/Doodles";

const events: ClubEvent[] = eventsData as ClubEvent[];
const upcoming = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));
const past = events
  .filter((e) => e.status === "past")
  .sort((a, b) => b.date.localeCompare(a.date));

function formatFullDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function DeckCard({ event, index, colorIndex, onClick }: { event: ClubEvent; index: number; colorIndex: number; onClick: () => void }) {
  const isFirst = index === 0;
  
  // Colors for the deck
  const colors = [
    "bg-electric-blue text-[#F4F2EC]",
    "bg-[#F4F2EC] text-midnight",
    "bg-midnight text-[#F4F2EC]"
  ];
  const colorClass = colors[colorIndex % colors.length];
  
  // Messy rotation pattern (-2 to 2 degrees)
  const rotations = [-1, 2, -2, 1, 0];
  const rotation = rotations[index % rotations.length];

  return (
    <div 
      onClick={onClick}
      className={`group relative w-full max-w-4xl mx-auto border-2 border-midnight p-6 md:p-10 shadow-[8px_8px_0_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-8 hover:shadow-[16px_16px_0_rgba(0,0,0,0.8)] cursor-pointer ${colorClass} ${!isFirst ? '-mt-20 md:-mt-28' : ''}`}
      style={{ 
        transform: `rotate(${rotation}deg)`, 
        zIndex: index, // Stacks properly
      }}
    >
      {/* Hover z-index fix */}
      <style jsx>{`
        div:hover {
          z-index: 50 !important;
        }
      `}</style>

      {/* Tape Tab */}
      <div className="absolute -top-3 right-8 md:right-16 w-12 h-6 bg-[#F4F2EC] border-2 border-midnight -rotate-6 shadow-[2px_2px_0_var(--midnight)]" />

      {/* Visible Header (when stacked) */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4 mb-4">
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase">{event.title}</h3>
        <span className="font-ui text-xs md:text-sm font-bold opacity-80 shrink-0 mt-2">{formatFullDate(event.date)}</span>
      </div>

      {/* Body (revealed on hover/expanded view) */}
      <div className="mt-8">
        <p className="font-body text-base md:text-lg leading-relaxed max-w-3xl">
          {event.longDescription || event.description}
        </p>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);

  return (
    <div className="min-h-screen bg-blueprint pb-32 relative">
      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-midnight/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div 
              initial={{ y: 50, rotate: 2, scale: 0.9 }}
              animate={{ y: 0, rotate: 0, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F4F2EC] border-2 border-midnight w-full max-w-3xl shadow-[16px_16px_0_var(--electric-blue)] relative my-auto"
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-10 h-10 border-2 border-midnight flex items-center justify-center hover:bg-metro-yellow transition-colors font-display text-xl z-10"
              >
                X
              </button>

              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-midnight pb-6 mb-8">
                  <h2 className="font-display text-4xl md:text-5xl font-black text-midnight uppercase leading-none">
                    {selectedEvent.title}
                  </h2>
                  <div className="bg-electric-blue text-[#F4F2EC] font-ui text-sm font-bold px-3 py-1 border-2 border-midnight shrink-0 shadow-[4px_4px_0_var(--midnight)]">
                    {formatFullDate(selectedEvent.date)}
                  </div>
                </div>

                <p className="font-body text-lg text-midnight leading-relaxed mb-10">
                  {selectedEvent.longDescription || selectedEvent.description}
                </p>

                {/* Photo Grid Placeholder */}
                {selectedEvent.photos && selectedEvent.photos.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-display text-2xl text-midnight font-bold">Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedEvent.photos.map((_, idx) => (
                        <div key={idx} className="aspect-square bg-midnight/5 border-2 border-midnight flex items-center justify-center shadow-[4px_4px_0_var(--midnight)] relative overflow-hidden group">
                          <span className="text-4xl opacity-50 group-hover:scale-110 transition-transform">📸</span>
                          <div className="absolute inset-0 bg-electric-blue/10 pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Section */}
      <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
        
        {/* Top Left: Header Sticky Note */}
        <div className="relative">
          {/* Section Tag */}
          <div className="absolute -top-6 -left-4 z-10 bg-electric-blue text-[#F4F2EC] border-2 border-[#F4F2EC] font-ui text-xs font-bold uppercase tracking-widest px-3 py-1">
            SECTION 02
          </div>
          
          {/* Main Sticky Note */}
          <div className="bg-[#F4F2EC] border-2 border-midnight p-6 sm:p-8 pr-12 md:pr-16 shadow-[8px_8px_0_var(--midnight)] md:shadow-[12px_12px_0_var(--midnight)] -rotate-3 relative">
            <h1 className="font-display text-6xl sm:text-7xl md:text-9xl text-midnight font-black tracking-tighter">
              Events
            </h1>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-4 sm:h-6 bg-white/50 backdrop-blur-sm border border-midnight shadow-sm rotate-2" />
            <div className="absolute bottom-4 right-4 w-8 h-8 sm:w-12 sm:h-12">
               <DoodleCircle className="w-full h-full stroke-metro-yellow" delayIndex={1} />
            </div>
            <div className="absolute -top-8 sm:-top-12 -right-4 sm:-right-8 w-12 h-12 sm:w-16 sm:h-16 text-electric-blue rotate-12">
               <DoodleCrown className="w-full h-full" delayIndex={1.5} />
            </div>
          </div>
        </div>

        {/* Top Right: Quick Note */}
        <div className="relative mt-8 md:mt-0">
          <div className="bg-[#F4F2EC] border-2 border-midnight p-6 shadow-[8px_8px_0_var(--midnight)] rotate-2 max-w-xs relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/50 backdrop-blur-sm border border-midnight shadow-sm -rotate-2" />
            <p className="font-ui text-xs uppercase tracking-widest text-electric-blue mb-4 font-bold">
              A Quick Note
            </p>
            <p className="font-display text-2xl leading-tight text-midnight">
              Upcoming events are on top.<br/>
              Scroll down to dig into the <span className="underline decoration-wavy decoration-electric-blue">archives</span>.
            </p>
          </div>
        </div>

      </div>

      {/* Decks Section */}
      <div className="px-6 md:px-12 flex flex-col gap-40">
        
        {/* Upcoming Deck */}
        <section className="mb-24 md:mb-32 relative">
          <div className="absolute top-1/4 -left-12 w-32 h-32 text-metro-yellow/20 -rotate-45 hidden lg:block pointer-events-none">
            <DoodleSpark className="w-full h-full" delayIndex={1} />
          </div>
          <div className="flex items-center gap-4 mb-16 md:mb-20 max-w-4xl mx-auto">
            <div className="gold-line" />
            <h2 className="font-display text-2xl font-bold text-metro-yellow uppercase tracking-widest relative">
              Upcoming
              <div className="absolute -top-6 -right-12 w-12 h-12 text-electric-blue/50 rotate-12">
                <DoodleEye className="w-full h-full" delayIndex={2} />
              </div>
            </h2>
          </div>
          <div className="flex flex-col">
            {upcoming.length > 0 ? (
              upcoming.map((event, i) => (
                <DeckCard key={event.id} event={event} index={i} colorIndex={i} onClick={() => setSelectedEvent(event)} />
              ))
            ) : (
              <div className="max-w-4xl mx-auto w-full bg-[#F4F2EC] border-2 border-midnight p-10 text-center shadow-[8px_8px_0_var(--midnight)]">
                <p className="font-display text-2xl text-midnight">No upcoming events right now. Stay tuned!</p>
              </div>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto w-full border-t-2 border-dashed border-[#F4F2EC]/40 my-8 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-16 text-[#F4F2EC]/20">
              <DoodleSquiggle className="w-full h-full" delayIndex={0} />
           </div>
        </div>

        {/* Past Deck */}
        <section className="relative">
          <div className="absolute top-1/3 -right-20 w-48 h-48 text-electric-blue/10 rotate-12 hidden lg:block pointer-events-none">
            <DoodleSwirl className="w-full h-full" delayIndex={1.5} />
          </div>
          <div className="flex items-center gap-4 mb-16 md:mb-20 max-w-4xl mx-auto">
            <div className="gold-line" />
            <h2 className="font-display text-2xl font-bold text-metro-yellow uppercase tracking-widest">
              Archive
            </h2>
          </div>
          <div className="flex flex-col">
            {past.map((event, i) => (
              <DeckCard key={event.id} event={event} index={i} colorIndex={i + upcoming.length} onClick={() => setSelectedEvent(event)} />
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}
