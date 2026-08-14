"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { DoodleFace, DoodleStar, DoodleArrow, DoodleCrown, DoodleSpark, DoodleEye, DoodleSwirl, DoodleCircle, DoodleSquiggle } from "@/components/Doodles";

const activities = [
  {
    icon: "🎤",
    title: "Open Mic Nights",
    description:
      "Monthly readings where members share original work, favorite passages, or spoken-word pieces in a welcoming, judgment-free space.",
  },
  {
    icon: "✍️",
    title: "Writing Workshops",
    description:
      "Hands-on sessions exploring craft — from flash fiction and poetry forms to editing techniques and finding your voice.",
  },
  {
    icon: "📖",
    title: "Book Discussions",
    description:
      "Deep-dive conversations about books that challenge, inspire, and reshape how we think about storytelling.",
  },
  {
    icon: "🏕",
    title: "Writers' Retreats",
    description:
      "Weekend getaways dedicated to writing, workshopping, and the kind of late-night conversations that only happen away from campus.",
  },
  {
    icon: "🎓",
    title: "Guest Lectures",
    description:
      "Published authors, editors, and literary professionals share their craft, career paths, and hard-won lessons.",
  },
  {
    icon: "📝",
    title: "Peer Review Circles",
    description:
      "Small-group feedback sessions where members workshop their writing with constructive, craft-focused critique.",
  },
];

const journalEntries = [
  {
    date: "Fall 2019",
    text: "Ink in Quills started the way most good things do — with a conversation that went on too long. A handful of students who kept recommending books to each other in the dining hall decided that conversations about literature deserved their own time and space.",
  },
  {
    date: "Spring 2020",
    text: "What began as an informal reading circle quickly grew into something more ambitious. Members started sharing their own writing — nervously at first, then with increasing confidence. Open mic nights drew crowds. Workshops filled up. The retreat waiting list got longer than the retreat itself.",
  },
  {
    date: "Today",
    text: "Today, the club is home to poets and novelists, essayists and screenwriters, people who read three books a week and people who are still working through their first novel. What unites us isn\u0027t a shared taste — it\u0027s a shared belief that the best stories emerge when different perspectives sit in the same room and take each other seriously.",
  },
];

const values = [
  {
    value: "Every voice matters",
    detail:
      "Published or unpublished, experienced or just starting — your perspective has value here.",
  },
  {
    value: "Craft is a practice",
    detail:
      "Writing improves with reading, feedback, and the courage to keep revising. We're all works in progress.",
  },
  {
    value: "Stories connect us",
    detail:
      "Literature builds empathy. The best books teach us to see the world through eyes that aren't our own.",
  },
];

const founders = [
  { initials: "AK", name: "Anya Kapoor", role: "Founder & President" },
  { initials: "RJ", name: "Rohan Joshi", role: "Co-Founder & Editor" },
  { initials: "SP", name: "Sara Patel", role: "Creative Director" },
  { initials: "DM", name: "Dev Malhotra", role: "Events Lead" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-blueprint">
      {/* ============= HEADER — Sticky Note Poster ============= */}
      <section className="relative pt-28 md:pt-36 pb-16 px-6 overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-metro-yellow/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Main Title Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Tape */}
            <div className="absolute -top-4 left-16 w-20 h-8 bg-white/80 border-b-[3px] border-x-[3px] border-midnight shadow-sm z-10" />

            <div className="bg-[#F4F2EC] border-[4px] border-midnight p-8 md:p-12 shadow-[12px_12px_0_var(--midnight)] relative max-w-lg">
              <span className="inline-block bg-electric-blue text-[#F4F2EC] font-ui text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 border-2 border-midnight mb-4">
                SECTION 05
              </span>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-midnight leading-[0.9] uppercase">
                About Us
              </h1>
              {/* Doodle circle */}
              <div className="absolute -bottom-6 right-8 w-12 h-12 text-metro-yellow">
                <DoodleCircle className="w-full h-full" delayIndex={0.5} />
              </div>
            </div>
          </motion.div>

          {/* Side Note */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mt-8 md:mt-16"
          >
            {/* Tape */}
            <div className="absolute -top-4 right-12 w-16 h-8 bg-white/80 border-b-[3px] border-x-[3px] border-midnight shadow-sm z-10" />

            <div className="bg-[#F4F2EC] border-[3px] border-midnight p-6 md:p-8 shadow-[8px_8px_0_var(--midnight)] max-w-sm relative">
              <p className="font-ui text-[10px] font-bold uppercase tracking-[0.3em] text-electric-blue mb-3">
                A Quick Note
              </p>
              <p className="font-display text-lg md:text-xl text-midnight leading-snug">
                A space for the curious, the creative, and the quietly obsessed with words.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Floating Doodles */}
        <div className="absolute top-24 right-8 w-16 h-16 text-metro-yellow/30 rotate-12 hidden lg:block pointer-events-none">
          <DoodleStar className="w-full h-full" delayIndex={1} />
        </div>
        <div className="absolute bottom-8 left-8 w-20 h-20 text-[#F4F2EC]/20 -rotate-12 hidden lg:block pointer-events-none">
          <DoodleFace className="w-full h-full" delayIndex={1.5} />
        </div>
      </section>

      {/* ============= MISSION — Torn Page Pull-Quote ============= */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">
                Our Mission
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <motion.div
              whileHover={{ rotate: 0 }}
              className="relative"
            >
              {/* Tape top-left */}
              <div className="absolute -top-3 left-10 w-24 h-7 bg-white/80 border-b-[3px] border-x-[3px] border-midnight shadow-sm z-10 rotate-[-3deg]" />
              {/* Tape bottom-right */}
              <div className="absolute -bottom-3 right-10 w-20 h-7 bg-white/80 border-t-[3px] border-x-[3px] border-midnight shadow-sm z-10 rotate-[2deg]" />

              <div className="bg-[#F4F2EC] border-[4px] border-midnight p-8 md:p-14 shadow-[10px_10px_0_var(--metro-yellow)] rotate-[-1deg] relative">
                <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-midnight leading-tight uppercase">
                  &ldquo;To create a space where every story finds its voice and every
                  reader finds their story.&rdquo;
                </blockquote>
                <div className="w-24 h-1 bg-electric-blue mt-6" />

                {/* Doodle */}
                <div className="absolute -bottom-8 -right-8 w-16 h-16 text-electric-blue/40 rotate-45 hidden md:block pointer-events-none">
                  <DoodleArrow className="w-full h-full" delayIndex={2} />
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============= OUR STORY — Journal Entries ============= */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">
                Our Story
              </span>
            </div>
          </ScrollReveal>

          <div className="space-y-6 md:space-y-[-20px]">
            {journalEntries.map((entry, i) => {
              const rotations = [1.5, -1, 0.5];
              const rotation = rotations[i % rotations.length];
              
              return (
                <ScrollReveal key={entry.date} delay={0.1 * i}>
                  <motion.div
                    whileHover={{ rotate: 0, scale: 1.01, zIndex: 10 }}
                    className="relative"
                    style={{ 
                      rotate: `${rotation}deg`,
                      zIndex: journalEntries.length - i,
                    }}
                  >
                    {/* Tape */}
                    <div className="absolute -top-3 left-8 w-16 h-7 bg-white/80 border-b-[3px] border-x-[3px] border-midnight shadow-sm z-10" />

                    <div className="bg-[#F4F2EC] border-[3px] border-midnight p-6 md:p-10 shadow-[8px_8px_0_var(--midnight)] relative">
                      {/* Lined paper effect */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #0B0B0B 28px)',
                        backgroundPosition: '0 20px',
                      }} />
                      
                      {/* Date margin label */}
                      <div className="absolute top-4 right-4 md:top-6 md:right-6">
                        <span className="inline-block bg-metro-yellow text-midnight font-ui text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 border-2 border-midnight shadow-[3px_3px_0_var(--midnight)]">
                          {entry.date}
                        </span>
                      </div>

                      <p className="font-body text-sm md:text-base text-midnight/80 leading-[2] relative z-[1] pr-20 md:pr-28">
                        {entry.text}
                      </p>

                      {/* Red margin line */}
                      <div className="absolute left-12 md:left-16 top-0 bottom-0 w-[2px] bg-red-400/30 pointer-events-none" />
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Side doodle */}
        <div className="absolute right-4 top-1/3 w-16 h-32 text-[#F4F2EC]/15 rotate-90 hidden lg:block pointer-events-none">
          <DoodleSquiggle className="w-full h-full" delayIndex={0} />
        </div>
      </section>

      {/* ============= WHAT WE DO — Scattered Pinboard ============= */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">
                What We Do
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {activities.map((activity, i) => {
              const rotations = [-2, 1.5, -1, 2, -0.5, 1];
              const rotation = rotations[i % rotations.length];

              return (
                <ScrollReveal key={activity.title} delay={0.08 * i}>
                  <motion.div
                    whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
                    className="relative h-full"
                    style={{ rotate: `${rotation}deg` }}
                  >
                    {/* Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 bg-white/80 border-b-[2px] border-x-[2px] border-midnight shadow-sm z-10" />

                    <div className="bg-[#F4F2EC] border-[3px] border-midnight p-6 shadow-[6px_6px_0_var(--midnight)] h-full relative">
                      {/* Emoji "sticker" */}
                      <div className="absolute -top-4 -right-3 w-12 h-12 bg-metro-yellow border-[3px] border-midnight rounded-full flex items-center justify-center text-xl shadow-[3px_3px_0_var(--midnight)] z-10">
                        {activity.icon}
                      </div>

                      <h3 className="font-display text-xl font-black text-midnight uppercase mb-3 pr-8 leading-tight">
                        {activity.title}
                      </h3>
                      <div className="w-full h-[3px] bg-midnight/10 mb-3" />
                      <p className="font-body text-sm text-midnight/70 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Floating doodles */}
        <div className="absolute top-20 left-4 w-14 h-14 text-[#F4F2EC]/20 rotate-12 hidden lg:block pointer-events-none">
          <DoodleSpark className="w-full h-full" delayIndex={1.5} />
        </div>
        <div className="absolute bottom-16 right-8 w-20 h-20 text-metro-yellow/15 -rotate-12 hidden lg:block pointer-events-none">
          <DoodleSwirl className="w-full h-full" delayIndex={2} />
        </div>
      </section>

      {/* ============= WHAT WE BELIEVE — Manifesto Wall ============= */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">
                Our Manifesto
              </span>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {values.map((item, i) => {
              const rotations = [-1.5, 1, -0.5];
              const shadowColors = ["var(--metro-yellow)", "var(--electric-blue)", "var(--midnight)"];
              const rotation = rotations[i % rotations.length];

              return (
                <ScrollReveal key={item.value} delay={0.15 * i}>
                  <motion.div
                    whileHover={{ rotate: 0, x: 8 }}
                    className="relative"
                    style={{ rotate: `${rotation}deg` }}
                  >
                    <div
                      className="bg-[#F4F2EC] border-[4px] border-midnight p-8 md:p-10 relative"
                      style={{ boxShadow: `10px 10px 0 ${shadowColors[i]}` }}
                    >
                      {/* Big number */}
                      <span className="absolute top-4 right-6 font-display text-[80px] md:text-[120px] font-black text-midnight/[0.04] leading-none select-none pointer-events-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <h3 className="font-display text-3xl md:text-4xl font-black text-midnight uppercase mb-3 leading-tight relative z-[1]">
                        {item.value}
                      </h3>
                      <p className="font-body text-sm md:text-base text-midnight/70 leading-relaxed max-w-xl relative z-[1]">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Doodle */}
        <div className="absolute bottom-12 left-4 w-16 h-16 text-[#F4F2EC]/20 rotate-45 hidden lg:block pointer-events-none">
          <DoodleCrown className="w-full h-full" delayIndex={1} />
        </div>
      </section>

      {/* ============= THE FOUNDERS — Polaroid Cards ============= */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">
                The Founders
              </span>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {founders.map((person, i) => {
              const rotations = [-3, 2, -1.5, 3.5];
              const rotation = rotations[i % rotations.length];

              return (
                <ScrollReveal key={person.name} delay={0.1 * i}>
                  <motion.div
                    whileHover={{ rotate: 0, y: -8, scale: 1.05 }}
                    className="relative"
                    style={{ rotate: `${rotation}deg` }}
                  >
                    {/* Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/80 border-b-[2px] border-x-[2px] border-midnight shadow-sm z-10" />

                    <div className="bg-[#F4F2EC] border-[3px] border-midnight p-4 pb-6 shadow-[6px_6px_0_var(--midnight)] w-40 md:w-48">
                      {/* "Photo" area */}
                      <div className="aspect-square w-full bg-midnight border-[2px] border-midnight mb-4 flex items-center justify-center relative overflow-hidden">
                        <span className="font-display text-4xl md:text-5xl font-black text-metro-yellow select-none">
                          {person.initials}
                        </span>
                        {/* Subtle grid overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                          backgroundSize: '8px 8px',
                        }} />
                      </div>

                      {/* Name (handwritten style) */}
                      <p className="font-display text-base md:text-lg font-bold text-midnight leading-tight text-center">
                        {person.name}
                      </p>
                      <p className="font-ui text-[9px] font-bold uppercase tracking-[0.2em] text-midnight/50 text-center mt-1">
                        {person.role}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Floating doodles */}
        <div className="absolute top-16 right-8 w-14 h-14 text-metro-yellow/20 -rotate-12 hidden lg:block pointer-events-none">
          <DoodleEye className="w-full h-full" delayIndex={1.5} />
        </div>
      </section>
    </div>
  );
}
