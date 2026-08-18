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
  const isDemonSlayer = event.title === "Breathe of Literature" || event.description.toLowerCase().includes("demon slayer");
  const isInfinityWar = event.title === "INK-FINITY WAR";
  const isMultiverse = event.title === "Multiverse Conclave";
  
  // Colors for the deck
  const colors = [
    "bg-electric-blue text-[#F4F2EC]",
    "bg-[#F4F2EC] text-midnight",
    "bg-midnight text-[#F4F2EC]"
  ];
  
  const baseColorClass = colors[colorIndex % colors.length];
  // Special styling for thematic events
  let colorClass = baseColorClass;
  if (isDemonSlayer) {
    colorClass = "bg-[#1a1a1a] text-red-500 border-red-600 !shadow-[8px_8px_0_#dc2626]";
  } else if (isInfinityWar) {
    colorClass = "bg-purple-950 text-yellow-400 border-yellow-500 !shadow-[8px_8px_0_#eab308]";
  } else if (isMultiverse) {
    colorClass = "bg-black text-cyan-400 border-fuchsia-500 !shadow-[8px_8px_0_#d946ef]";
  }
  
  // Messy rotation pattern (-2 to 2 degrees)
  const rotations = [-1, 2, -2, 1, 0];
  const rotation = rotations[index % rotations.length];

  return (
    <div 
      onClick={onClick}
      className={`group relative w-full max-w-4xl mx-auto border-[3px] border-midnight p-6 md:p-10 shadow-[8px_8px_0_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-8 hover:shadow-[16px_16px_0_rgba(0,0,0,0.8)] cursor-pointer ${colorClass} ${!isFirst ? '-mt-20 md:-mt-28' : ''}`}
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
      <div className={`absolute -top-3 right-8 md:right-16 w-12 h-6 border-2 border-midnight -rotate-6 shadow-[2px_2px_0_var(--midnight)] ${isDemonSlayer ? 'bg-red-600' : isInfinityWar ? 'bg-yellow-500' : isMultiverse ? 'bg-cyan-400' : 'bg-[#F4F2EC]'}`} />

      {/* Visible Header (when stacked) */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4 mb-4">
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase flex items-center gap-3">
          {event.title}
          {isDemonSlayer && <span className="text-3xl transform group-hover:scale-125 transition-transform duration-300">⚔️</span>}
          {isInfinityWar && <span className="text-3xl transform group-hover:rotate-180 transition-transform duration-700">♾️</span>}
          {isMultiverse && <span className="text-3xl transform group-hover:animate-[spin_3s_linear_infinite] transition-transform duration-300">🌀</span>}
        </h3>
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
        {selectedEvent && (() => {
          const isDemonSlayer = selectedEvent.title === "Breathe of Literature" || selectedEvent.description.toLowerCase().includes("demon slayer");
          const isInfinityWar = selectedEvent.title === "INK-FINITY WAR";
          const isMultiverse = selectedEvent.title === "Multiverse Conclave";
          
          let theme: {
            overlay: string;
            modal: string;
            closeBtn: string;
            title: string;
            dateBadge: string;
            body: string;
            photoGrid: string;
            photoOverlay: string;
            icon: string | null;
          } = {
            overlay: "bg-midnight/80",
            modal: "bg-[#F4F2EC] border-midnight shadow-[16px_16px_0_var(--electric-blue)] text-midnight",
            closeBtn: "border-midnight bg-[#F4F2EC] hover:bg-metro-yellow text-midnight",
            title: "text-midnight",
            dateBadge: "bg-electric-blue text-[#F4F2EC] border-midnight shadow-[4px_4px_0_var(--midnight)]",
            body: "text-midnight",
            photoGrid: "bg-midnight/5 border-2 border-midnight shadow-[4px_4px_0_var(--midnight)]",
            photoOverlay: "bg-electric-blue/10",
            icon: null
          };

          if (isDemonSlayer) {
            theme = {
              overlay: "bg-red-950/90",
              modal: "bg-[#111] border-red-600 shadow-[16px_16px_0_#dc2626] text-red-50",
              closeBtn: "border-red-600 bg-black text-red-500 hover:bg-red-600 hover:text-white",
              title: "text-red-500 tracking-widest drop-shadow-[2px_2px_0_#000] border-red-600",
              dateBadge: "bg-red-600 text-white border-red-900 shadow-[4px_4px_0_#7f1d1d]",
              body: "text-red-100 font-medium",
              photoGrid: "bg-black border-[3px] border-red-600 shadow-[4px_4px_0_#dc2626]",
              photoOverlay: "bg-red-600/20",
              icon: "⚔️"
            };
          } else if (isInfinityWar) {
            theme = {
              overlay: "bg-purple-950/90",
              modal: "bg-indigo-950 border-yellow-500 shadow-[16px_16px_0_#eab308] text-indigo-50",
              closeBtn: "border-yellow-500 bg-indigo-900 text-yellow-500 hover:bg-yellow-500 hover:text-indigo-900",
              title: "text-yellow-400 tracking-wider drop-shadow-[2px_2px_0_#000] border-yellow-500",
              dateBadge: "bg-yellow-500 text-indigo-950 border-yellow-700 shadow-[4px_4px_0_#a16207]",
              body: "text-yellow-100 font-medium",
              photoGrid: "bg-indigo-900 border-[3px] border-yellow-500 shadow-[4px_4px_0_#eab308]",
              photoOverlay: "bg-yellow-500/20",
              icon: "♾️"
            };
          } else if (isMultiverse) {
            theme = {
              overlay: "bg-black/90",
              modal: "bg-black border-cyan-400 shadow-[16px_16px_0_#d946ef] text-cyan-50",
              closeBtn: "border-fuchsia-500 bg-black text-fuchsia-500 hover:bg-fuchsia-500 hover:text-black",
              title: "text-cyan-400 tracking-[0.2em] drop-shadow-[3px_3px_0_#d946ef] border-fuchsia-500",
              dateBadge: "bg-fuchsia-500 text-black border-cyan-400 shadow-[4px_4px_0_#22d3ee]",
              body: "text-cyan-100 font-mono",
              photoGrid: "bg-fuchsia-950/30 border-[3px] border-cyan-400 shadow-[4px_4px_0_#d946ef]",
              photoOverlay: "bg-cyan-400/20 mix-blend-overlay",
              icon: "🌀"
            };
          }

          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 ${theme.overlay} backdrop-blur-sm overflow-y-auto`}
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div 
                initial={isDemonSlayer || isInfinityWar || isMultiverse ? { scale: 1.2, rotate: -5, opacity: 0 } : { y: 50, rotate: 2, scale: 0.9 }}
                animate={{ y: 0, rotate: 0, scale: 1, opacity: 1 }}
                exit={isDemonSlayer || isInfinityWar || isMultiverse ? { scale: 0.8, opacity: 0 } : { y: 50, opacity: 0, scale: 0.95 }}
                transition={isDemonSlayer || isInfinityWar || isMultiverse ? { type: "spring", stiffness: 300, damping: 20 } : {}}
                onClick={(e) => e.stopPropagation()}
                className={`${theme.modal} border-[4px] w-full max-w-3xl relative my-auto overflow-hidden`}
              >
                {/* Background Details */}
                {isDemonSlayer && (
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, #dc2626 0%, transparent 40%), radial-gradient(circle at 0% 100%, #dc2626 0%, transparent 40%)' }} />
                )}
                {isInfinityWar && (
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #eab308 0%, transparent 60%)' }} />
                )}
                {isMultiverse && (
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #22d3ee 1px, transparent 1px), linear-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                )}

                {/* Close button */}
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className={`absolute top-4 right-4 w-10 h-10 border-[3px] flex items-center justify-center transition-colors font-display text-xl z-20 ${theme.closeBtn}`}
                >
                  X
                </button>

                <div className="p-8 md:p-12 relative z-10">
                  <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-[3px] pb-6 mb-8 ${theme.title.split(' ').pop()}`}>
                    <h2 className={`font-display text-4xl md:text-5xl font-black uppercase leading-none ${theme.title.replace(/border-\S+/, '')}`}>
                      {selectedEvent.title} {theme.icon && <span className="inline-block ml-2">{theme.icon}</span>}
                    </h2>
                    <div className={`font-ui text-sm font-bold px-3 py-1 border-[3px] shrink-0 ${theme.dateBadge}`}>
                      {formatFullDate(selectedEvent.date)}
                    </div>
                  </div>

                  <p className={`font-body text-lg leading-relaxed mb-10 ${theme.body} whitespace-pre-wrap`}>
                    {selectedEvent.longDescription || selectedEvent.description}
                  </p>
                  
                  {isDemonSlayer && (
                    <div className="w-full h-1 bg-red-900 mb-8 overflow-hidden">
                       <div className="h-full bg-red-500 w-1/2 animate-[pulse_1s_ease-in-out_infinite]" style={{ width: '100%' }} />
                    </div>
                  )}
                  {isInfinityWar && (
                    <div className="w-full h-2 flex gap-1 mb-8">
                       {['bg-blue-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500'].map((c, i) => (
                         <div key={i} className={`flex-1 ${c} animate-pulse shadow-[0_0_8px_currentColor]`} style={{ animationDelay: `${i * 0.2}s`}} />
                       ))}
                    </div>
                  )}
                  {isMultiverse && (
                    <div className="w-full h-2 bg-fuchsia-900 mb-8 overflow-hidden relative">
                       <div className="absolute top-0 left-0 h-full bg-cyan-400 w-full animate-pulse opacity-80 mix-blend-screen" />
                       <div className="absolute top-0 left-0 h-full bg-fuchsia-500 w-1/3 animate-[pulse_0.5s_ease-in-out_infinite]" style={{ transform: 'translateX(100%)' }} />
                    </div>
                  )}

                  {/* Photo Grid Placeholder */}
                  {selectedEvent.photos && selectedEvent.photos.length > 0 && (
                    <div className="space-y-4">
                      <h3 className={`font-display text-2xl font-bold ${theme.title.replace(/border-\S+/, '')}`}>Photos</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedEvent.photos.map((_, idx) => (
                          <div key={idx} className={`aspect-square flex items-center justify-center relative overflow-hidden group ${theme.photoGrid}`}>
                            <span className="text-4xl opacity-50 group-hover:scale-110 transition-transform">📸</span>
                            <div className={`absolute inset-0 pointer-events-none ${theme.photoOverlay}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
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
              <div className="max-w-4xl mx-auto w-full relative group perspective-[1000px]">
                <style jsx>{`
                  @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                  }
                  .animate-marquee {
                    display: inline-block;
                    white-space: nowrap;
                    animation: marquee 15s linear infinite;
                  }
                  .animate-marquee-reverse {
                    display: inline-block;
                    white-space: nowrap;
                    animation: marquee 15s linear infinite reverse;
                  }
                `}</style>

                <div className="absolute inset-0 bg-metro-yellow/20 -rotate-3 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative bg-[#111] border-[6px] border-metro-yellow p-12 md:p-20 shadow-[16px_16px_0_#eab308] overflow-hidden transform transition-all duration-500 group-hover:rotate-1">
                  
                  {/* CAUTION TAPES */}
                  <div className="absolute top-8 -left-[10%] w-[120%] h-12 bg-metro-yellow rotate-3 flex items-center font-display font-black text-2xl text-black tracking-widest border-y-4 border-black z-10 shadow-lg group-hover:-rotate-2 transition-transform duration-500 overflow-hidden">
                    <div className="animate-marquee">
                      /// CLASSIFIED /// TOP SECRET /// DO NOT ENTER /// CLASSIFIED /// TOP SECRET /// DO NOT ENTER /// CLASSIFIED /// TOP SECRET /// DO NOT ENTER /// CLASSIFIED /// TOP SECRET /// DO NOT ENTER ///
                    </div>
                  </div>

                  <div className="absolute bottom-12 -right-[10%] w-[120%] h-12 bg-metro-yellow -rotate-3 flex items-center font-display font-black text-2xl text-black tracking-widest border-y-4 border-black z-10 shadow-lg group-hover:rotate-2 transition-transform duration-500 overflow-hidden">
                     <div className="animate-marquee-reverse">
                      /// BREWING SOMETHING EPIC /// STAY TUNED /// BREWING SOMETHING EPIC /// STAY TUNED /// BREWING SOMETHING EPIC /// STAY TUNED /// BREWING SOMETHING EPIC /// STAY TUNED ///
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="relative z-0 flex flex-col items-center text-center space-y-6 pt-16 pb-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-black border-4 border-dashed border-red-500 rounded-full flex items-center justify-center relative group-hover:scale-110 transition-transform duration-700 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                      <span className="text-6xl group-hover:animate-bounce z-10 relative">👀</span>
                      <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-ping opacity-20" />
                    </div>

                    <h3 className="font-display text-5xl md:text-7xl font-black text-[#F4F2EC] uppercase tracking-tighter mix-blend-difference">
                      The Void <br/>
                      <span className="text-red-500 font-outline-2 drop-shadow-[4px_4px_0_#000]">is empty.</span>
                    </h3>

                    <p className="font-body text-xl text-gray-400 max-w-lg mx-auto font-medium">
                      Our timeline is currently shifting. We are either plotting our next masterpiece, traveling through the multiverse, or just taking a really long nap. 
                    </p>
                    
                    <button className="inline-block mt-8 px-6 py-3 border-[3px] border-metro-yellow text-metro-yellow font-display font-bold text-xl uppercase hover:bg-metro-yellow hover:text-black transition-colors cursor-crosshair relative overflow-hidden group/btn">
                      <span className="relative z-10">[ REDACT THIS MESSAGE ]</span>
                    </button>
                  </div>

                  {/* Random scribbles */}
                  <div className="absolute top-10 right-10 text-6xl font-display font-black text-white/5 -rotate-12 pointer-events-none">ERROR 404</div>
                  <div className="absolute bottom-10 left-10 text-6xl font-display font-black text-white/5 rotate-12 pointer-events-none">NOT FOUND</div>
                </div>
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
