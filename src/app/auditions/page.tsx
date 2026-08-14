"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AuditionsPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-ink-black text-text-primary px-6 text-center">
      {/* Decorative quill */}
      <motion.div
        className="text-6xl mb-8"
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        ✒️
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="font-ui text-xs uppercase tracking-[0.3em] text-metro-yellow mb-4">
          Coming Soon
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
          Auditions
        </h1>
        <p className="font-body text-lg text-text-muted max-w-md mx-auto leading-relaxed mb-2">
          We&apos;re crafting something special. Our audition portal is being
          written — every good story needs a proper beginning.
        </p>
      </motion.div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="gold-line-center mb-8" />
        <Link
          href="/"
          className="font-ui text-sm font-medium text-metro-yellow hover:text-text-primary transition-colors border-b border-metro-yellow/30 hover:border-text-primary/30 pb-0.5"
        >
          ← Return home
        </Link>
      </motion.div>

      {/* Floating animation */}
      <motion.div
        className="absolute bottom-16 text-metro-yellow/10 text-8xl font-display select-none pointer-events-none"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 3, -3, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        ✦
      </motion.div>
    </div>
  );
}
