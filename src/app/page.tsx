"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { DoodleArrow, DoodleCircle, DoodleUnderline } from "@/components/Doodles";

const heroQuotes = [
  "We are all stories in the end. Just make it a good one.",
  "A word after a word after a word is power.",
  "There is no greater agony than bearing an untold story inside you.",
  "The first draft is just you telling yourself the story.",
  "Literature is the most agreeable way of ignoring life.",
];

const sectionCards = [
  {
    href: "/stories",
    title: "Stories & Poems",
    description: "Original work by our members — fiction, poetry, and everything between.",
    icon: "✍",
  },
  {
    href: "/events",
    title: "Events",
    description: "Open mics, workshops, retreats, and gatherings that bring words to life.",
    icon: "✦",
  },
  {
    href: "/library",
    title: "The Library",
    description: "Our curated bookshelf — reviews and recommendations from avid readers.",
    icon: "📖",
  },
  {
    href: "/about",
    title: "About Us",
    description: "Who we are, what we do, and why stories matter to us.",
    icon: "◈",
  },
];

const featuredPoem = {
  lines: [
    "We live in the margins",
    "of books we haven't finished,",
    "scribbling our real thoughts",
    "in the white space",
    "between someone else's certainties.",
  ],
  author: "Priya Nair",
  title: "Margins",
};

// Letter stagger animation for the hero title
const titleContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
};

const titleLetter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function LandingPage() {
  const clubName = "Inks & Quils";

  return (
    <div>
      {/* ============= HERO ============= */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-midnight text-text-primary px-6">
        {/* Background ink splashes (decorative) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-metro-yellow/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -10, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-brass-gold/10 blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -15, 0],
              y: [0, 15, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-electric-blue/10 blur-3xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl">
          {/* Decorative flourish */}
          <motion.div
            className="text-metro-yellow/60 text-2xl mb-6 tracking-[0.5em] font-display"
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.2, delay: 0.1 }}
          >
            ✦ ✦ ✦
          </motion.div>

          {/* Club name — letter stagger */}
          <motion.h1
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-6"
            variants={titleContainer}
            initial="hidden"
            animate="visible"
          >
            {clubName.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={titleLetter}
                className={char === " " ? "inline-block w-[0.3em]" : "inline-block"}
                style={{
                  background:
                    i < 4 || i > 6
                      ? "linear-gradient(135deg, var(--color-text-primary), var(--color-metro-yellow))"
                      : undefined,
                  WebkitBackgroundClip: i < 4 || i > 6 ? "text" : undefined,
                  WebkitTextFillColor:
                    i < 4 || i > 6 ? "transparent" : undefined,
                  color: i >= 4 && i <= 6 ? "var(--color-metro-yellow)" : undefined,
                }}
              >
                {char}
              </motion.span>
            ))}
            {/* Doodle Underline */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-[40px]">
              <DoodleUnderline className="w-full h-full" delayIndex={2} />
            </div>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-body text-xl md:text-2xl text-text-muted max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            A community of readers, writers, and dreamers.
          </motion.p>

          {/* Rotating quote */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <RotatingQuote quotes={heroQuotes} />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-text-dim"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-ui text-xs uppercase tracking-widest">Scroll</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============= FEATURED PIECE ============= */}
      <section className="py-24 md:py-32 px-6 bg-surface-elevated">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-ui text-xs uppercase tracking-[0.3em] text-metro-yellow mb-8">
              Featured Poem
            </p>
          </ScrollReveal>

          <div className="space-y-1">
            {featuredPoem.lines.map((line, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <p className="font-body text-xl md:text-2xl text-text-primary leading-relaxed italic">
                  {line}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.6}>
            <div className="mt-8 space-y-1">
              <div className="gold-line-center" />
              <p className="mt-4 font-display text-sm text-text-muted">
                &ldquo;{featuredPoem.title}&rdquo; — {featuredPoem.author}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.8}>
            <Link
              href="/stories"
              className="inline-block mt-8 font-ui text-sm font-bold text-metro-yellow hover:text-text-primary transition-colors border-b border-metro-yellow/30 hover:border-text-primary/30 pb-0.5"
            >
              Read more from our writers →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ============= SECTION CARDS ============= */}
      <section className="py-24 md:py-32 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-text-primary mb-16">
              Explore
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectionCards.map((card, i) => (
              <ScrollReveal key={card.href} delay={0.1 * i}>
                <Link href={card.href} className="group block h-full">
                  <div className="h-full bg-surface-elevated rounded-2xl p-8 border border-ink-black shadow-offset hover:shadow-offset-lg hover:-translate-y-2 transition-all duration-300 group-hover:border-metro-yellow/50">
                    <span className="text-4xl mb-4 block">{card.icon}</span>
                    <h3 className="font-display text-xl font-bold text-text-primary mb-2 group-hover:text-metro-yellow transition-colors">
                      {card.title}
                    </h3>
                    <p className="font-body text-sm text-text-muted leading-relaxed">
                      {card.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-metro-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-ui text-xs font-medium">Explore</span>
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CALL TO ACTION ============= */}
      <section className="py-24 md:py-32 px-6 bg-midnight text-text-primary text-center">
        <ScrollReveal>
          <p className="font-ui text-xs uppercase tracking-[0.3em] text-metro-yellow mb-6">
            Our Signature Feature
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 relative inline-block">
            The Book Wall
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%]">
              <DoodleCircle className="w-full h-full" delayIndex={1} />
            </div>
          </h2>
          <div className="relative">
            <p className="font-body text-lg text-text-muted max-w-lg mx-auto mb-10 leading-relaxed">
              Browse our curated bookshelf. Pull a book from the shelf. Read our
              review. Find your next obsession.
            </p>
            <div className="absolute -top-4 -right-16 w-24 h-24 hidden md:block">
              <DoodleArrow className="w-full h-full rotate-90" delayIndex={2} />
            </div>
          </div>
          <Link
            href="/library"
            className="inline-flex items-center gap-3 btn-primary font-ui font-semibold text-sm px-8 py-4 animate-pulse-glow"
          >
            Enter the Library
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}

// ============= ROTATING QUOTE COMPONENT =============
function RotatingQuote({ quotes }: { quotes: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev: number) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="h-16 flex items-center justify-center overflow-hidden">
      <motion.p
        key={index}
        className="font-body text-sm md:text-base text-text-dim italic max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        &ldquo;{quotes[index]}&rdquo;
      </motion.p>
    </div>
  );
}
