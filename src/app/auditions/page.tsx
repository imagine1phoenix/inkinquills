"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DoodleEye, DoodleStar, DoodleArrow, DoodleSquiggle } from "@/components/Doodles";

export default function AuditionsPage() {
  return (
    <div className="min-h-screen bg-blueprint flex flex-col items-center justify-center px-4 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-[500px] h-[500px] bg-electric-blue blur-[120px] rounded-full" />
      </div>

      {/* Doodles */}
      <div className="absolute top-[15%] left-[10%] w-32 h-32 text-metro-yellow/20 rotate-[-15deg] pointer-events-none">
        <DoodleEye className="w-full h-full" delayIndex={0} />
      </div>
      <div className="absolute bottom-[20%] right-[10%] w-24 h-24 text-white/20 rotate-[35deg] pointer-events-none">
        <DoodleStar className="w-full h-full" delayIndex={1} />
      </div>
      <div className="absolute top-[20%] right-[20%] w-16 h-16 text-electric-blue/30 rotate-[105deg] pointer-events-none">
        <DoodleArrow className="w-full h-full" delayIndex={0.5} />
      </div>
      <div className="absolute bottom-[30%] left-[15%] w-32 h-16 text-metro-yellow/15 rotate-[-10deg] pointer-events-none">
        <DoodleSquiggle className="w-full h-full" delayIndex={1.5} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative z-10 flex flex-col items-center max-w-4xl w-full"
      >
        {/* Warning Tape */}
        <div className="bg-metro-yellow text-midnight border-[4px] border-midnight px-8 py-2 mb-8 shadow-[8px_8px_0_var(--midnight)] -rotate-3 self-center md:self-start">
          <span className="font-ui text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
            ⚠️ Restricted Area ⚠️
          </span>
        </div>

        {/* Huge Title Blocks */}
        <div className="text-center w-full flex flex-col items-center mb-12 select-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#F4F2EC] border-[4px] border-midnight px-6 md:px-12 py-2 md:py-4 shadow-[12px_12px_0_var(--electric-blue)] rotate-2 mb-2"
          >
            <h1 className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] font-black text-midnight leading-none uppercase">
              Audi
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-electric-blue border-[4px] border-midnight px-6 md:px-12 py-2 md:py-4 shadow-[12px_12px_0_var(--metro-yellow)] -rotate-1"
          >
            <h1 className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] font-black text-[#F4F2EC] leading-none uppercase">
              Tions
            </h1>
          </motion.div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-midnight border-[4px] border-metro-yellow p-6 md:p-8 max-w-2xl text-center shadow-[12px_12px_0_var(--electric-blue)] relative"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#F4F2EC] border-[3px] border-midnight shadow-sm rotate-[4deg]" />
          <p className="font-body text-xl md:text-2xl text-[#F4F2EC] font-bold uppercase tracking-wide leading-relaxed">
            The stage is being built. <br/> The scripts are being torn apart.
          </p>
          <div className="w-16 h-1 bg-electric-blue mx-auto my-6" />
          <p className="font-ui text-sm text-metro-yellow uppercase tracking-widest font-bold">
            Check back later to prove you belong here.
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
            className="group relative inline-block bg-[#F4F2EC] border-[3px] border-midnight px-8 py-4 font-ui text-sm font-bold uppercase tracking-widest text-midnight transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_var(--electric-blue)]"
          >
            ← Retreat to Safety
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
