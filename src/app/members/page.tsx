"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MembersPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-charcoal text-parchment px-6 text-center">
      {/* Decorative icon */}
      <motion.div
        className="text-6xl mb-8"
        initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        👥
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="font-ui text-xs uppercase tracking-[0.3em] text-gold mb-4">
          Coming Soon
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
          Members
        </h1>
        <p className="font-body text-lg text-parchment/50 max-w-md mx-auto leading-relaxed mb-2">
          Our ensemble is being assembled. The member directory is coming —
          every great cast deserves a proper introduction.
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
          className="font-ui text-sm font-medium text-gold hover:text-parchment transition-colors border-b border-gold/30 hover:border-parchment/30 pb-0.5"
        >
          ← Return home
        </Link>
      </motion.div>

      {/* Floating animation */}
      <motion.div
        className="absolute bottom-16 text-gold/10 text-8xl font-display select-none pointer-events-none"
        animate={{
          y: [0, -12, 0],
          rotate: [0, -3, 3, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        ◈
      </motion.div>
    </div>
  );
}
