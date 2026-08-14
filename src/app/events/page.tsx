"use client";

import { motion } from "framer-motion";
import eventsData from "@/data/events.json";
import type { ClubEvent } from "@/data/types";
import { DoodleCircle } from "@/components/Doodles";

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

function DeckCard({ event, index, colorIndex }: { event: ClubEvent; index: number; colorIndex: number }) {
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
        <h3 className="font-display text-3xl md:text-4xl font-bold uppercase">{event.title}</h3>
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
  return (
    <div className="min-h-screen bg-blueprint pb-32">
      {/* Top Section */}
      <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
        
        {/* Top Left: Header Sticky Note */}
        <div className="relative">
          {/* Section Tag */}
          <div className="absolute -top-6 -left-4 z-10 bg-electric-blue text-[#F4F2EC] border-2 border-[#F4F2EC] font-ui text-xs font-bold uppercase tracking-widest px-3 py-1">
            SECTION 02
          </div>
          
          {/* Main Sticky Note */}
          <div className="bg-[#F4F2EC] border-2 border-midnight p-8 pr-16 shadow-[12px_12px_0_var(--midnight)] -rotate-3 relative">
            <h1 className="font-display text-7xl md:text-9xl text-midnight font-black tracking-tighter">
              Events
            </h1>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/50 backdrop-blur-sm border border-midnight shadow-sm rotate-2" />
            <div className="absolute bottom-4 right-4 w-12 h-12">
               <DoodleCircle className="w-full h-full stroke-metro-yellow" delayIndex={1} />
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
        <section>
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="font-display text-4xl text-[#F4F2EC] bg-midnight inline-block px-4 py-2 border-2 border-[#F4F2EC] -rotate-1">
              UPCOMING
            </h2>
          </div>
          <div className="flex flex-col">
            {upcoming.length > 0 ? (
              upcoming.map((event, i) => (
                <DeckCard key={event.id} event={event} index={i} colorIndex={i} />
              ))
            ) : (
              <div className="max-w-4xl mx-auto w-full bg-[#F4F2EC] border-2 border-midnight p-10 text-center shadow-[8px_8px_0_var(--midnight)]">
                <p className="font-display text-2xl text-midnight">No upcoming events right now. Stay tuned!</p>
              </div>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto w-full border-t-2 border-dashed border-[#F4F2EC]/40 my-8" />

        {/* Past Deck */}
        <section>
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="font-display text-4xl text-midnight bg-[#F4F2EC] inline-block px-4 py-2 border-2 border-midnight rotate-1">
              ARCHIVE
            </h2>
          </div>
          <div className="flex flex-col">
            {past.map((event, i) => (
              <DeckCard key={event.id} event={event} index={i} colorIndex={i + upcoming.length} />
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}
