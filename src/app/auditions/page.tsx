"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { submitAudition } from "@/actions/audition";
import { DoodleEye, DoodleStar, DoodleArrow, DoodleSquiggle } from "@/components/Doodles";

export default function AuditionsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitAudition(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        alert(result.error || "Failed to submit. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-blueprint flex flex-col items-center justify-center px-4 py-32 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-[800px] h-[800px] bg-electric-blue blur-[150px] rounded-full" />
      </div>

      {/* Doodles */}
      <div className="absolute top-[10%] left-[5%] w-32 h-32 text-metro-yellow/20 rotate-[-15deg] pointer-events-none hidden md:block">
        <DoodleEye className="w-full h-full" delayIndex={0} />
      </div>
      <div className="absolute top-[15%] right-[10%] w-24 h-24 text-white/20 rotate-[35deg] pointer-events-none hidden md:block">
        <DoodleStar className="w-full h-full" delayIndex={1} />
      </div>
      <div className="absolute bottom-[20%] left-[10%] w-16 h-16 text-electric-blue/30 rotate-[105deg] pointer-events-none hidden md:block">
        <DoodleArrow className="w-full h-full" delayIndex={0.5} />
      </div>
      <div className="absolute top-[40%] right-[5%] w-32 h-16 text-metro-yellow/15 rotate-[-10deg] pointer-events-none hidden md:block">
        <DoodleSquiggle className="w-full h-full" delayIndex={1.5} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative z-10 flex flex-col items-center max-w-3xl w-full"
      >
        {/* Title */}
        <div className="text-center w-full mb-12 select-none relative">
          <div className="absolute -top-6 -left-4 w-12 h-6 bg-metro-yellow -rotate-6 z-20 border-2 border-black" />
          <div className="absolute -bottom-4 -right-4 w-16 h-6 bg-electric-blue rotate-3 z-20 border-2 border-black" />
          
          <div className="bg-[#F4F2EC] border-[6px] border-midnight px-6 py-8 shadow-[16px_16px_0_var(--midnight)] rotate-1 relative z-10">
            <h1 className="font-display text-[3rem] sm:text-[4rem] md:text-[5rem] font-black text-midnight leading-none uppercase tracking-tighter">
              Join the <span className="text-electric-blue underline decoration-wavy decoration-metro-yellow underline-offset-8">Club</span>
            </h1>
            <p className="font-ui text-midnight/70 font-bold mt-4 uppercase tracking-widest text-sm md:text-base">
              Application for Ink & Quills
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, rotate: -2 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                className="bg-midnight border-[4px] border-metro-yellow p-6 md:p-10 shadow-[12px_12px_0_var(--electric-blue)] relative flex flex-col gap-6"
              >
                {/* Tape element */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#F4F2EC] border-[3px] border-midnight shadow-sm -rotate-[2deg] flex items-center justify-center">
                  <span className="font-ui font-bold text-xs uppercase tracking-widest">Confidential</span>
                </div>

                {/* Input Fields */}
                <div className="flex flex-col gap-2">
                  <label className="font-display text-[#F4F2EC] text-xl uppercase tracking-wider">Codename (Name)</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Who are you?"
                    className="bg-[#F4F2EC] border-4 border-black p-4 font-body text-xl font-bold text-midnight placeholder:text-midnight/40 focus:outline-none focus:border-electric-blue focus:ring-0 transition-colors shadow-[4px_4px_0_#000]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-display text-[#F4F2EC] text-xl uppercase tracking-wider">Frequency (Email)</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Where do we send the coordinates?"
                    className="bg-[#F4F2EC] border-4 border-black p-4 font-body text-xl font-bold text-midnight placeholder:text-midnight/40 focus:outline-none focus:border-electric-blue focus:ring-0 transition-colors shadow-[4px_4px_0_#000]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-display text-[#F4F2EC] text-xl uppercase tracking-wider">Weapon of Choice (Role)</label>
                  <input 
                    type="text" 
                    name="role"
                    required
                    placeholder="Writer, Designer, Orator, Developer..."
                    className="bg-[#F4F2EC] border-4 border-black p-4 font-body text-xl font-bold text-midnight placeholder:text-midnight/40 focus:outline-none focus:border-electric-blue focus:ring-0 transition-colors shadow-[4px_4px_0_#000]"
                  />
                </div>


                <div className="flex flex-col gap-2">
                  <label className="font-display text-[#F4F2EC] text-xl uppercase tracking-wider">Current Fixation</label>
                  <input 
                    type="text" 
                    name="fixation"
                    required
                    placeholder="Favorite book, theory, or chaotic thought right now"
                    className="bg-[#F4F2EC] border-4 border-black p-4 font-body text-xl font-bold text-midnight placeholder:text-midnight/40 focus:outline-none focus:border-electric-blue focus:ring-0 transition-colors shadow-[4px_4px_0_#000]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-display text-[#F4F2EC] text-xl uppercase tracking-wider">The Manifesto</label>
                  <textarea 
                    name="manifesto"
                    required
                    rows={4}
                    placeholder="Why do you want to join? Tell us a story."
                    className="bg-[#F4F2EC] border-4 border-black p-4 font-body text-xl font-bold text-midnight placeholder:text-midnight/40 focus:outline-none focus:border-electric-blue focus:ring-0 transition-colors shadow-[4px_4px_0_#000] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isPending}
                  className="mt-4 group relative inline-block bg-metro-yellow border-[4px] border-black px-8 py-4 font-display text-xl md:text-2xl font-black uppercase tracking-widest text-black transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_#000] self-start md:self-end disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isPending ? "Transmitting..." : "Submit Application"} <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-electric-blue border-[4px] border-midnight p-10 text-center shadow-[12px_12px_0_var(--metro-yellow)] relative"
              >
                <div className="absolute -top-4 right-8 w-16 h-8 bg-[#F4F2EC] border-[3px] border-midnight shadow-sm rotate-[6deg]" />
                <h2 className="font-display text-4xl md:text-5xl font-black text-[#F4F2EC] uppercase mb-4 leading-tight">Transmission Received</h2>
                <p className="font-body text-xl text-white font-bold max-w-md mx-auto">
                  Your manifesto is in our hands. If you survive the screening, we will make contact.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Link
            href="/"
            className="group relative inline-block bg-[#F4F2EC] border-[3px] border-midnight px-8 py-4 font-ui text-sm font-bold uppercase tracking-widest text-midnight transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_var(--metro-yellow)]"
          >
            ← Retreat to Safety
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
