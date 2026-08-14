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

const values = [
  {
    value: "Every voice matters",
    detail: "Published or unpublished, experienced or just starting — your perspective has value here.",
  },
  {
    value: "Craft is a practice",
    detail: "Writing improves with reading, feedback, and the courage to keep revising. We're all works in progress.",
  },
  {
    value: "Stories connect us",
    detail: "Literature builds empathy. The best books teach us to see the world through eyes that aren't our own.",
  },
];

const founders = [
  { initials: "AK", name: "Anya Kapoor", role: "Founder" },
  { initials: "RJ", name: "Rohan Joshi", role: "Editor" },
  { initials: "SP", name: "Sara Patel", role: "Creative Dir." },
  { initials: "DM", name: "Dev Malhotra", role: "Events Lead" },
];

// Starburst SVG component (like the red burst in the reference image)
function Starburst({ className = "", color = "var(--metro-yellow)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill={color}>
      <polygon points="100,0 120,70 200,60 140,110 160,200 100,140 40,200 60,110 0,60 80,70" />
    </svg>
  );
}

// Ink splatter dot cluster
function DotCluster({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative">
        <div className="w-3 h-3 bg-midnight rounded-full absolute top-0 left-0" />
        <div className="w-2 h-2 bg-midnight rounded-full absolute top-4 left-3" />
        <div className="w-1.5 h-1.5 bg-midnight rounded-full absolute top-1 left-5" />
        <div className="w-4 h-4 bg-midnight rounded-full absolute top-5 left-6" />
        <div className="w-1 h-1 bg-midnight rounded-full absolute top-3 left-1" />
        <div className="w-2.5 h-2.5 bg-midnight rounded-full absolute top-7 left-2" />
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-blueprint overflow-x-hidden">

      {/* ============================================================
          HERO COLLAGE — Punk poster composition
          Layered cut-outs, starbursts, scattered text, doodles
          ============================================================ */}
      <section className="relative pt-24 md:pt-32 pb-20 md:pb-32 px-4 md:px-8 overflow-hidden">
        <div className="relative max-w-5xl mx-auto min-h-[550px] md:min-h-[650px]">

          {/* === LAYER 1: Background scattered typography === */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.04]">
            <div className="absolute top-[5%] left-[5%] font-display text-[140px] md:text-[220px] font-black text-[#F4F2EC] leading-none rotate-[-8deg]">INK</div>
            <div className="absolute top-[30%] right-[0%] font-display text-[100px] md:text-[180px] font-black text-[#F4F2EC] leading-none rotate-[5deg]">QUILLS</div>
            <div className="absolute bottom-[10%] left-[10%] font-display text-[80px] md:text-[140px] font-black text-[#F4F2EC] leading-none rotate-[-3deg]">WRITE</div>
          </div>

          {/* === LAYER 2: Starburst accent (like the red burst in reference) === */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
            className="absolute top-[10%] left-[35%] md:left-[40%] w-36 h-36 md:w-52 md:h-52 pointer-events-none z-[2]"
          >
            <Starburst className="w-full h-full" />
          </motion.div>

          {/* Small starburst */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-[25%] right-[5%] md:right-[15%] w-16 h-16 md:w-24 md:h-24 pointer-events-none z-[2]"
          >
            <Starburst className="w-full h-full" color="var(--electric-blue)" />
          </motion.div>

          {/* === LAYER 3: Cut-out text blocks — the main content === */}

          {/* TITLE — massive, tilted */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[5] mb-4 md:mb-0 md:absolute md:top-[5%] md:left-0"
          >
            <div className="bg-[#F4F2EC] border-[4px] border-midnight p-6 md:p-10 inline-block shadow-[10px_10px_0_var(--midnight)]">
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-midnight leading-[0.8] uppercase">
                About
              </h1>
            </div>
          </motion.div>

          {/* "US" — overlapping the title on a yellow block */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative z-[6] mb-6 md:mb-0 md:absolute md:top-[12%] md:left-[55%] lg:left-[45%]"
          >
            <div className="bg-metro-yellow border-[4px] border-midnight p-4 md:p-8 inline-block shadow-[8px_8px_0_var(--midnight)]">
              <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-midnight leading-[0.8] uppercase">
                Us
              </span>
            </div>
          </motion.div>

          {/* "SECTION 05" label — small stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-[7] mb-4 md:mb-0 md:absolute md:top-[2%] md:right-[10%]"
            style={{ rotate: "12deg" }}
          >
            <div className="bg-midnight border-[3px] border-midnight px-4 py-2 inline-block shadow-[4px_4px_0_var(--metro-yellow)]">
              <span className="font-ui text-[10px] font-bold tracking-[0.3em] uppercase text-metro-yellow">Section 05</span>
            </div>
          </motion.div>

          {/* Origin story — cut-out text block, overlapping */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 1.5 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative z-[4] mb-6 md:mb-0 md:absolute md:top-[42%] md:left-[3%] max-w-md"
          >
            <div className="bg-[#F4F2EC] border-[3px] border-midnight p-5 md:p-7 shadow-[8px_8px_0_var(--electric-blue)] relative">
              <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-red-400/25 pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, #0B0B0B 25px)',
                backgroundPosition: '0 12px',
              }} />
              <p className="font-body text-xs md:text-sm text-midnight/75 leading-[2] relative z-[1]">
                Started the way most good things do — with a conversation that went on too long. A handful of students recommending books in the dining hall decided literature deserved its own time and space.
              </p>
            </div>
          </motion.div>

          {/* Mission quote — dark block, punchy */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="relative z-[8] mb-6 md:mb-0 md:absolute md:top-[38%] md:right-0 max-w-xs md:max-w-sm"
          >
            <div className="bg-midnight border-[4px] border-midnight p-6 md:p-8 shadow-[10px_10px_0_var(--metro-yellow)]">
              <blockquote className="font-display text-xl md:text-2xl font-black text-metro-yellow leading-tight uppercase">
                &ldquo;Every story finds its voice. Every reader finds their story.&rdquo;
              </blockquote>
              <div className="w-14 h-1 bg-electric-blue mt-4" />
            </div>
          </motion.div>

          {/* Tagline strip — horizontal banner cutting across */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-[9] md:absolute md:bottom-[12%] md:left-[-2%] md:right-[-2%]"
          >
            <div className="bg-metro-yellow border-y-[4px] border-midnight py-3 md:py-4 px-6 shadow-[0_6px_0_var(--midnight)]">
              <p className="font-display text-base md:text-xl font-black text-midnight uppercase tracking-wider text-center md:text-left">
                Readers · Writers · Poets · Dreamers · Essayists · Storytellers
              </p>
            </div>
          </motion.div>

          {/* === LAYER 4: Doodles as collage elements === */}
          <motion.div
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 1, rotate: -8 }}
            transition={{ delay: 0.5 }}
            className="absolute top-[28%] left-[30%] w-14 h-14 md:w-20 md:h-20 text-[#F4F2EC] z-[3] pointer-events-none hidden md:block"
          >
            <DoodleEye className="w-full h-full" delayIndex={1} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-[30%] left-[50%] w-10 h-10 md:w-16 md:h-16 text-[#F4F2EC] z-[3] pointer-events-none hidden md:block"
            style={{ rotate: "25deg" }}
          >
            <DoodleStar className="w-full h-full" delayIndex={1.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8 }}
            className="absolute top-[60%] right-[35%] w-12 h-12 text-[#F4F2EC] z-[3] pointer-events-none hidden lg:block"
            style={{ rotate: "45deg" }}
          >
            <DoodleFace className="w-full h-full" delayIndex={2} />
          </motion.div>

          {/* Dot clusters (like ink splatters in the reference) */}
          <DotCluster className="absolute top-[65%] left-[25%] opacity-20 hidden md:block pointer-events-none z-[2]" />
          <DotCluster className="absolute top-[20%] right-[25%] opacity-15 scale-75 hidden md:block pointer-events-none z-[2]" />
          <DotCluster className="absolute bottom-[5%] right-[40%] opacity-10 scale-50 hidden lg:block pointer-events-none z-[2]" />
        </div>
      </section>

      {/* ============================================================
          OUR STORY — Journal entry cards
          ============================================================ */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">Our Story</span>
            </div>
          </ScrollReveal>

          <div className="space-y-6 md:space-y-[-16px]">
            {[
              { date: "Fall 2019", text: "Ink in Quills started the way most good things do — with a conversation that went on too long. A handful of students who kept recommending books to each other in the dining hall decided that conversations about literature deserved their own time and space.", rot: 1.5 },
              { date: "Spring 2020", text: "What began as an informal reading circle quickly grew into something more ambitious. Members started sharing their own writing — nervously at first, then with increasing confidence. Open mic nights drew crowds. Workshops filled up.", rot: -1 },
              { date: "Today", text: "Today, the club is home to poets and novelists, essayists and screenwriters. What unites us isn\u0027t a shared taste — it\u0027s a shared belief that the best stories emerge when different perspectives sit in the same room and take each other seriously.", rot: 0.5 },
            ].map((entry, i) => (
              <ScrollReveal key={entry.date} delay={0.1 * i}>
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.01, zIndex: 10 }}
                  className="relative"
                  style={{ rotate: `${entry.rot}deg`, zIndex: 3 - i }}
                >
                  <div className="absolute -top-3 left-8 w-16 h-7 bg-white/80 border-b-[3px] border-x-[3px] border-midnight shadow-sm z-10" />
                  <div className="bg-[#F4F2EC] border-[3px] border-midnight p-6 md:p-10 shadow-[8px_8px_0_var(--midnight)] relative">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
                      backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #0B0B0B 28px)',
                      backgroundPosition: '0 20px',
                    }} />
                    <div className="absolute left-12 md:left-16 top-0 bottom-0 w-[2px] bg-red-400/30 pointer-events-none" />
                    <div className="absolute top-4 right-4 md:top-6 md:right-6">
                      <span className="inline-block bg-metro-yellow text-midnight font-ui text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 border-2 border-midnight shadow-[3px_3px_0_var(--midnight)]">
                        {entry.date}
                      </span>
                    </div>
                    <p className="font-body text-sm md:text-base text-midnight/80 leading-[2] relative z-[1] pr-20 md:pr-28">
                      {entry.text}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WHAT WE DO — Pinboard cards
          ============================================================ */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">What We Do</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {activities.map((activity, i) => {
              const rotations = [-2, 1.5, -1, 2, -0.5, 1];
              return (
                <ScrollReveal key={activity.title} delay={0.08 * i}>
                  <motion.div
                    whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
                    className="relative h-full"
                    style={{ rotate: `${rotations[i]}deg` }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 bg-white/80 border-b-[2px] border-x-[2px] border-midnight shadow-sm z-10" />
                    <div className="bg-[#F4F2EC] border-[3px] border-midnight p-6 shadow-[6px_6px_0_var(--midnight)] h-full relative">
                      <div className="absolute -top-4 -right-3 w-12 h-12 bg-metro-yellow border-[3px] border-midnight rounded-full flex items-center justify-center text-xl shadow-[3px_3px_0_var(--midnight)] z-10">
                        {activity.icon}
                      </div>
                      <h3 className="font-display text-xl font-black text-midnight uppercase mb-3 pr-8 leading-tight">{activity.title}</h3>
                      <div className="w-full h-[3px] bg-midnight/10 mb-3" />
                      <p className="font-body text-sm text-midnight/70 leading-relaxed">{activity.description}</p>
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
      </section>

      {/* ============================================================
          MANIFESTO — Bold value posters
          ============================================================ */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">Our Manifesto</span>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {values.map((item, i) => {
              const rotations = [-1.5, 1, -0.5];
              const shadows = ["var(--metro-yellow)", "var(--electric-blue)", "var(--midnight)"];
              return (
                <ScrollReveal key={item.value} delay={0.15 * i}>
                  <motion.div whileHover={{ rotate: 0, x: 8 }} style={{ rotate: `${rotations[i]}deg` }}>
                    <div className="bg-[#F4F2EC] border-[4px] border-midnight p-8 md:p-10 relative" style={{ boxShadow: `10px 10px 0 ${shadows[i]}` }}>
                      <span className="absolute top-4 right-6 font-display text-[80px] md:text-[120px] font-black text-midnight/[0.04] leading-none select-none pointer-events-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-3xl md:text-4xl font-black text-midnight uppercase mb-3 leading-tight relative z-[1]">{item.value}</h3>
                      <p className="font-body text-sm md:text-base text-midnight/70 leading-relaxed max-w-xl relative z-[1]">{item.detail}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-12 left-4 w-16 h-16 text-[#F4F2EC]/20 rotate-45 hidden lg:block pointer-events-none">
          <DoodleCrown className="w-full h-full" delayIndex={1} />
        </div>
      </section>

      {/* ============================================================
          THE FOUNDERS — Polaroids
          ============================================================ */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-[3px] bg-metro-yellow" />
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-metro-yellow">The Founders</span>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {founders.map((person, i) => {
              const rotations = [-3, 2, -1.5, 3.5];
              return (
                <ScrollReveal key={person.name} delay={0.1 * i}>
                  <motion.div
                    whileHover={{ rotate: 0, y: -8, scale: 1.05 }}
                    style={{ rotate: `${rotations[i]}deg` }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/80 border-b-[2px] border-x-[2px] border-midnight shadow-sm z-10" />
                    <div className="bg-[#F4F2EC] border-[3px] border-midnight p-4 pb-6 shadow-[6px_6px_0_var(--midnight)] w-40 md:w-48">
                      <div className="aspect-square w-full bg-midnight border-[2px] border-midnight mb-4 flex items-center justify-center relative overflow-hidden">
                        <span className="font-display text-4xl md:text-5xl font-black text-metro-yellow select-none">{person.initials}</span>
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                          backgroundSize: '8px 8px',
                        }} />
                      </div>
                      <p className="font-display text-base md:text-lg font-bold text-midnight leading-tight text-center">{person.name}</p>
                      <p className="font-ui text-[9px] font-bold uppercase tracking-[0.2em] text-midnight/50 text-center mt-1">{person.role}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <div className="absolute top-16 right-8 w-14 h-14 text-metro-yellow/20 -rotate-12 hidden lg:block pointer-events-none">
          <DoodleEye className="w-full h-full" delayIndex={1.5} />
        </div>
      </section>
    </div>
  );
}
