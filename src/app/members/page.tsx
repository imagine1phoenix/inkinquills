"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DoodleFace, DoodleCrown, DoodleSpark, DoodleCircle } from "@/components/Doodles";

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-blueprint flex flex-col items-center justify-center px-4 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-[500px] h-[500px] bg-metro-yellow blur-[120px] rounded-full" />
      </div>

      {/* Doodles */}
      <div className="absolute top-[10%] left-[15%] w-32 h-32 text-electric-blue/20 rotate-[15deg] pointer-events-none">
        <DoodleFace className="w-full h-full" delayIndex={0} />
      </div>
      <div className="absolute bottom-[15%] right-[15%] w-40 h-40 text-white/10 -rotate-[25deg] pointer-events-none">
        <DoodleCrown className="w-full h-full" delayIndex={1} />
      </div>
      <div className="absolute top-[25%] right-[10%] w-20 h-20 text-metro-yellow/30 rotate-[45deg] pointer-events-none">
        <DoodleSpark className="w-full h-full" delayIndex={0.5} />
      </div>
      <div className="absolute bottom-[20%] left-[20%] w-16 h-16 text-electric-blue/15 -rotate-[10deg] pointer-events-none">
        <DoodleCircle className="w-full h-full" delayIndex={1.5} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative z-10 flex flex-col items-center max-w-4xl w-full"
      >
        {/* Warning Tape */}
        <div className="bg-electric-blue text-[#F4F2EC] border-[4px] border-midnight px-8 py-2 mb-8 shadow-[8px_8px_0_var(--midnight)] rotate-2 self-center md:self-end">
          <span className="font-ui text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
            CLASSIFIED PERSONNEL
          </span>
        </div>

        {/* Huge Title Blocks */}
        <div className="text-center w-full flex flex-col items-center mb-12 select-none">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-midnight border-[4px] border-midnight px-6 md:px-12 py-2 md:py-4 shadow-[12px_12px_0_var(--metro-yellow)] -rotate-3 mb-4"
          >
            <h1 className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] font-black text-[#F4F2EC] leading-none uppercase">
              The
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#F4F2EC] border-[4px] border-midnight px-6 md:px-12 py-2 md:py-4 shadow-[12px_12px_0_var(--electric-blue)] rotate-1"
          >
            <h1 className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] font-black text-midnight leading-none uppercase">
              Crew
            </h1>
          </motion.div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-metro-yellow border-[4px] border-midnight p-6 md:p-8 max-w-2xl text-center shadow-[12px_12px_0_var(--midnight)] relative"
        >
          <div className="absolute -top-5 left-1/4 -translate-x-1/2 w-20 h-8 bg-white/80 border-[3px] border-midnight shadow-sm -rotate-[6deg]" />
          <div className="absolute -bottom-4 right-1/4 translate-x-1/2 w-16 h-6 bg-white/80 border-[3px] border-midnight shadow-sm rotate-[3deg]" />
          
          <p className="font-body text-xl md:text-2xl text-midnight font-black uppercase tracking-wide leading-relaxed">
            The files are still being redacted.
          </p>
          <div className="w-16 h-2 bg-midnight mx-auto my-6 border-b-[2px] border-dashed border-white" />
          <p className="font-ui text-sm text-midnight/80 uppercase tracking-widest font-bold">
            Profiles loading. Identity obfuscation in progress.
          </p>
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <Link
            href="/"
            className="group relative inline-block bg-midnight border-[3px] border-metro-yellow px-8 py-4 font-ui text-sm font-bold uppercase tracking-widest text-metro-yellow transition-transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_var(--electric-blue)]"
          >
            ← Get out while you can
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
