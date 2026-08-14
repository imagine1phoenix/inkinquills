"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { DoodleFace, DoodleStar, DoodleArrow, DoodleCrown, DoodleSpark, DoodleEye, DoodleSwirl, DoodleCircle, DoodleSquiggle } from "@/components/Doodles";

// ─── DATA ────────────────────────────────────────────
const activities = [
  { icon: "🎤", title: "Open Mic Nights", desc: "Share original work in a judgment-free space." },
  { icon: "✍️", title: "Writing Workshops", desc: "Flash fiction, poetry forms, finding your voice." },
  { icon: "📖", title: "Book Discussions", desc: "Deep-dives into books that reshape storytelling." },
  { icon: "🏕", title: "Writers' Retreats", desc: "Weekend getaways for writing & workshopping." },
  { icon: "🎓", title: "Guest Lectures", desc: "Published authors share craft & career paths." },
  { icon: "📝", title: "Peer Review", desc: "Small-group constructive, craft-focused critique." },
];

const founders = [
  { initials: "AK", name: "Anya Kapoor", role: "Founder" },
  { initials: "RJ", name: "Rohan Joshi", role: "Editor" },
  { initials: "SP", name: "Sara Patel", role: "Creative Dir." },
  { initials: "DM", name: "Dev Malhotra", role: "Events Lead" },
];

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
export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ═══════════════════════════════════════════════
          PAGE 1: THE COVER
          Full viewport. Blueprint bg. Massive typography.
          ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[100vh] bg-blueprint flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Smoky ambient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          <motion.div
            className="absolute top-[20%] left-[15%] w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] bg-white/10 blur-[100px] rounded-full"
            animate={{ x: [0, 60, -30, 0], y: [0, -60, 30, 0], scale: [1, 1.15, 0.9, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-midnight/20 blur-[100px] rounded-full"
            animate={{ x: [0, -50, 40, 0], y: [0, 50, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-20 left-4 md:left-12 z-20"
        >
          <div className="bg-midnight border-[3px] border-midnight px-4 py-2 shadow-[4px_4px_0_var(--metro-yellow)] rotate-[-3deg]">
            <span className="font-ui text-[10px] font-bold tracking-[0.3em] uppercase text-metro-yellow">Section 05</span>
          </div>
        </motion.div>

        {/* THE MASSIVE TITLE */}
        <div className="relative z-10 text-center select-none">
          {/* Doodles around title */}
          <motion.div
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 12 }}
            transition={{ delay: 0.6 }}
            className="absolute -top-8 -left-4 md:-top-14 md:-left-16 w-12 h-12 md:w-20 md:h-20 text-[#F4F2EC]"
          >
            <DoodleStar className="w-full h-full" delayIndex={0.5} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-10 -right-4 md:-bottom-20 md:-right-16 w-16 h-8 md:w-32 md:h-16 text-[#F4F2EC]"
          >
            <DoodleSquiggle className="w-full h-full" delayIndex={1} />
          </motion.div>

          {/* "WHO" — off-white block */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-2 md:mb-4"
          >
            <span className="font-display text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-black text-[#F4F2EC] leading-[0.85] text-3d block">
              Who
            </span>
          </motion.div>

          <br />

          {/* "WE" — yellow block */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            <div className="bg-metro-yellow border-[4px] border-midnight px-4 md:px-8 py-1 md:py-3 shadow-[8px_8px_0_var(--midnight)] inline-block">
              <span className="font-display text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-black text-midnight leading-[0.85] block">
                We
              </span>
            </div>
          </motion.div>

          <br />

          {/* "ARE" — raw text, tilted opposite */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: -1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mt-1 md:mt-2"
          >
            <span className="font-display text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-black text-[#F4F2EC] leading-[0.85] text-3d block">
              Are
            </span>
          </motion.div>
        </div>

        {/* Subtitle strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative z-10 mt-8 md:mt-12"
        >
          <div className="bg-[#F4F2EC] border-[3px] border-midnight px-6 py-3 shadow-[6px_6px_0_var(--midnight)] rotate-[1deg]">
            <p className="font-body text-sm md:text-base text-midnight font-medium text-center tracking-wide">
              A space for the curious, the creative, and the quietly obsessed with words.
            </p>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#F4F2EC]/40 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 bg-[#F4F2EC]/60 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Corner doodles */}
        <div className="absolute bottom-16 left-6 w-12 h-12 text-[#F4F2EC]/30 -rotate-12 hidden md:block pointer-events-none">
          <DoodleFace className="w-full h-full" delayIndex={2} />
        </div>
        <div className="absolute top-1/3 right-6 w-10 h-10 text-metro-yellow/30 rotate-45 hidden md:block pointer-events-none">
          <DoodleEye className="w-full h-full" delayIndex={1.5} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PAGE 2: THE MANIFESTO
          Full dark. One massive quote. Breathing room.
          ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] bg-midnight flex items-center justify-center px-6 md:px-16 overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }} />

        <div className="max-w-4xl mx-auto relative">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-[10px] font-bold uppercase tracking-[0.3em] text-metro-yellow">Our Belief</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <blockquote className="relative">
              {/* Giant drop cap */}
              <span className="font-display text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-electric-blue leading-[0.7] float-left mr-2 md:mr-4 mt-2 md:mt-4 select-none" style={{
                textShadow: '6px 6px 0 var(--midnight)',
                WebkitTextStroke: '2px var(--electric-blue)',
              }}>
                T
              </span>
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#F4F2EC] leading-[1.2] uppercase">
                o create a space where every story finds its voice and every reader finds their story.
              </p>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="w-24 h-1.5 bg-metro-yellow mt-8 md:mt-12" />
          </ScrollReveal>

          {/* Corner doodle */}
          <div className="absolute -bottom-8 -right-8 w-20 h-20 text-electric-blue/20 rotate-12 hidden md:block pointer-events-none">
            <DoodleCrown className="w-full h-full" delayIndex={1} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PAGE 3: THE ORIGIN
          Blueprint bg. Zigzag timeline with journal cards.
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 bg-blueprint px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-16 md:mb-24">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">Our Story</span>
            </div>
          </ScrollReveal>

          {/* Zigzag timeline */}
          <div className="relative">
            {/* Vertical line (desktop only) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] border-l-[3px] border-dashed border-[#F4F2EC]/30 pointer-events-none" />

            {[
              { date: "Fall 2019", label: "The Beginning", text: "Ink in Quills started the way most good things do — with a conversation that went on too long. A handful of students who kept recommending books to each other in the dining hall decided that conversations about literature deserved their own time and space.", side: "left" as const, rot: -2 },
              { date: "Spring 2020", label: "The Growth", text: "What began as an informal reading circle quickly grew into something more ambitious. Members started sharing their own writing — nervously at first, then with increasing confidence. Open mic nights drew crowds. Workshops filled up. The retreat waiting list got longer than the retreat itself.", side: "right" as const, rot: 1.5 },
              { date: "Today", label: "The Present", text: "Home to poets and novelists, essayists and screenwriters, people who read three books a week and people still working through their first novel. What unites us isn\u0027t a shared taste — it\u0027s a shared belief that the best stories emerge when different perspectives take each other seriously.", side: "left" as const, rot: -1 },
            ].map((entry, i) => (
              <ScrollReveal key={entry.date} delay={0.15 * i}>
                <div className={`relative flex flex-col md:flex-row items-start mb-16 md:mb-24 ${entry.side === "right" ? "md:flex-row-reverse" : ""}`}>
                  {/* Timeline node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-10 h-10 bg-metro-yellow border-[3px] border-midnight rounded-full flex items-center justify-center shadow-[3px_3px_0_var(--midnight)]">
                      <span className="font-display text-sm font-black text-midnight">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ rotate: 0, scale: 1.02 }}
                    className={`w-full md:w-[45%] ${entry.side === "left" ? "md:pr-8" : "md:pl-8"} ${entry.side === "right" ? "md:ml-auto" : ""}`}
                    style={{ rotate: `${entry.rot}deg` }}
                  >
                    <div className="relative">
                      {/* Tape */}
                      <div className="absolute -top-3 left-8 w-16 h-7 bg-white/80 border-b-[3px] border-x-[3px] border-midnight shadow-sm z-10" />

                      <div className="bg-[#F4F2EC] border-[3px] border-midnight p-6 md:p-8 shadow-[8px_8px_0_var(--midnight)] relative">
                        {/* Lined paper */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
                          backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #0B0B0B 28px)',
                          backgroundPosition: '0 16px',
                        }} />
                        {/* Red margin */}
                        <div className="absolute left-10 md:left-12 top-0 bottom-0 w-[2px] bg-red-400/25 pointer-events-none" />

                        {/* Date & label */}
                        <div className="flex items-center gap-3 mb-4 relative z-[1]">
                          <span className="inline-block bg-metro-yellow text-midnight font-ui text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 border-2 border-midnight shadow-[3px_3px_0_var(--midnight)]">
                            {entry.date}
                          </span>
                          <span className="font-display text-sm text-midnight/40 uppercase">{entry.label}</span>
                        </div>

                        <p className="font-body text-sm md:text-base text-midnight/80 leading-[2] relative z-[1]">
                          {entry.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Side doodle */}
        <div className="absolute right-4 top-1/4 w-16 h-32 text-[#F4F2EC]/15 rotate-90 hidden lg:block pointer-events-none">
          <DoodleSquiggle className="w-full h-full" delayIndex={0} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PAGE 4: SCROLLING MARQUEE BREAK
          A single horizontal strip of text scrolling.
          ═══════════════════════════════════════════════ */}
      <section className="relative bg-metro-yellow border-y-[4px] border-midnight py-5 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-display text-2xl md:text-4xl font-black text-midnight uppercase mx-4 md:mx-8 flex items-center gap-4 md:gap-8">
              Readers <span className="text-electric-blue">✦</span> Writers <span className="text-electric-blue">✦</span> Poets <span className="text-electric-blue">✦</span> Dreamers <span className="text-electric-blue">✦</span> Essayists <span className="text-electric-blue">✦</span> Storytellers <span className="text-electric-blue">✦</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          PAGE 5: WHAT WE DO
          Blueprint bg. Mixed-media activity cards.
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 bg-blueprint px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">What We Do</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {activities.map((act, i) => {
              const rotations = [-2, 1.5, -1, 2, -0.5, 1];
              const bgColors = ["bg-[#F4F2EC]", "bg-midnight", "bg-[#F4F2EC]", "bg-metro-yellow", "bg-[#F4F2EC]", "bg-midnight"];
              const textColors = ["text-midnight", "text-[#F4F2EC]", "text-midnight", "text-midnight", "text-midnight", "text-[#F4F2EC]"];
              const descColors = ["text-midnight/70", "text-[#F4F2EC]/60", "text-midnight/70", "text-midnight/70", "text-midnight/70", "text-[#F4F2EC]/60"];
              const shadowColors = ["var(--midnight)", "var(--metro-yellow)", "var(--electric-blue)", "var(--midnight)", "var(--midnight)", "var(--electric-blue)"];

              return (
                <ScrollReveal key={act.title} delay={0.08 * i}>
                  <motion.div
                    whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
                    className="relative h-full"
                    style={{ rotate: `${rotations[i]}deg` }}
                  >
                    {/* Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 bg-white/80 border-b-[2px] border-x-[2px] border-midnight shadow-sm z-10" />

                    <div
                      className={`${bgColors[i]} border-[3px] border-midnight p-6 h-full relative`}
                      style={{ boxShadow: `6px 6px 0 ${shadowColors[i]}` }}
                    >
                      {/* Emoji sticker */}
                      <div className="absolute -top-4 -right-3 w-12 h-12 bg-metro-yellow border-[3px] border-midnight rounded-full flex items-center justify-center text-xl shadow-[3px_3px_0_var(--midnight)] z-10">
                        {act.icon}
                      </div>

                      <h3 className={`font-display text-xl font-black uppercase mb-3 pr-8 leading-tight ${textColors[i]}`}>
                        {act.title}
                      </h3>
                      <div className={`w-full h-[2px] ${i === 1 || i === 5 ? "bg-[#F4F2EC]/20" : "bg-midnight/10"} mb-3`} />
                      <p className={`font-body text-sm leading-relaxed ${descColors[i]}`}>
                        {act.desc}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <div className="absolute top-20 left-4 w-14 h-14 text-[#F4F2EC]/20 rotate-12 hidden lg:block pointer-events-none">
          <DoodleSpark className="w-full h-full" delayIndex={1.5} />
        </div>
        <div className="absolute bottom-16 right-8 w-20 h-20 text-metro-yellow/15 -rotate-12 hidden lg:block pointer-events-none">
          <DoodleSwirl className="w-full h-full" delayIndex={2} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PAGE 6: THE MANIFESTO WALL
          Full-width posters, alternating colors.
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 bg-midnight px-6 overflow-hidden">
        {/* Subtle scan lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }} />

        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-16 md:mb-24">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">Our Manifesto</span>
            </div>
          </ScrollReveal>

          <div className="space-y-12 md:space-y-16">
            {[
              { value: "Every voice matters", detail: "Published or unpublished, experienced or just starting — your perspective has value here.", bg: "bg-[#F4F2EC]", text: "text-midnight", detail_text: "text-midnight/60", shadow: "var(--metro-yellow)", rot: -1.5 },
              { value: "Craft is a practice", detail: "Writing improves with reading, feedback, and the courage to keep revising. We're all works in progress.", bg: "bg-electric-blue", text: "text-[#F4F2EC]", detail_text: "text-[#F4F2EC]/70", shadow: "var(--midnight)", rot: 1 },
              { value: "Stories connect us", detail: "Literature builds empathy. The best books teach us to see the world through eyes that aren't our own.", bg: "bg-metro-yellow", text: "text-midnight", detail_text: "text-midnight/70", shadow: "var(--midnight)", rot: -0.5 },
            ].map((item, i) => (
              <ScrollReveal key={item.value} delay={0.15 * i}>
                <ParallaxWord>
                  <motion.div whileHover={{ rotate: 0, x: 10 }} style={{ rotate: `${item.rot}deg` }}>
                    <div className={`${item.bg} border-[4px] border-midnight p-8 md:p-12 relative`} style={{ boxShadow: `12px 12px 0 ${item.shadow}` }}>
                      <span className="absolute top-4 right-6 font-display text-[80px] md:text-[140px] font-black opacity-[0.04] leading-none select-none pointer-events-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4 leading-[0.9] relative z-[1] ${item.text}`}>
                        {item.value}
                      </h3>
                      <p className={`font-body text-sm md:text-base leading-relaxed max-w-xl relative z-[1] ${item.detail_text}`}>
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                </ParallaxWord>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-4 w-16 h-16 text-electric-blue/15 rotate-45 hidden lg:block pointer-events-none">
          <DoodleArrow className="w-full h-full" delayIndex={1} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PAGE 7: THE CREW
          Blueprint bg. Polaroid strip.
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 bg-blueprint px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">The Founders</span>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {founders.map((person, i) => {
              const rotations = [-5, 3, -2, 4.5];
              return (
                <ScrollReveal key={person.name} delay={0.1 * i}>
                  <motion.div
                    whileHover={{ rotate: 0, y: -10, scale: 1.08 }}
                    className="relative"
                    style={{ rotate: `${rotations[i]}deg` }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/80 border-b-[2px] border-x-[2px] border-midnight shadow-sm z-10" />
                    <div className="bg-[#F4F2EC] border-[3px] border-midnight p-3 pb-5 shadow-[8px_8px_0_var(--midnight)] w-36 md:w-44">
                      <div className="aspect-square w-full bg-midnight border-[2px] border-midnight mb-3 flex items-center justify-center relative overflow-hidden">
                        <span className="font-display text-4xl md:text-5xl font-black text-metro-yellow select-none">{person.initials}</span>
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                          backgroundSize: '6px 6px',
                        }} />
                      </div>
                      <p className="font-display text-sm md:text-base font-bold text-midnight text-center leading-tight">{person.name}</p>
                      <p className="font-ui text-[8px] font-bold uppercase tracking-[0.2em] text-midnight/40 text-center mt-0.5">{person.role}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <div className="absolute top-16 right-8 w-14 h-14 text-metro-yellow/20 -rotate-12 hidden lg:block pointer-events-none">
          <DoodleCircle className="w-full h-full" delayIndex={1} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PAGE 8: THE CLOSING
          Full yellow. One word. Maximum impact.
          ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] bg-metro-yellow border-t-[4px] border-midnight flex items-center justify-center px-6 overflow-hidden">
        <ScrollReveal>
          <div className="text-center relative">
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-midnight leading-[0.8] uppercase select-none"
              style={{
                textShadow: '4px 4px 0 var(--electric-blue)',
              }}
            >
              Write.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-body text-sm md:text-base text-midnight/60 mt-4 md:mt-6"
            >
              — That&apos;s the only rule.
            </motion.p>

            <div className="absolute -top-8 -left-8 w-16 h-16 text-electric-blue/30 rotate-12 hidden md:block pointer-events-none">
              <DoodleStar className="w-full h-full" delayIndex={0.5} />
            </div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 text-midnight/20 -rotate-12 hidden md:block pointer-events-none">
              <DoodleSwirl className="w-full h-full" delayIndex={1} />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
