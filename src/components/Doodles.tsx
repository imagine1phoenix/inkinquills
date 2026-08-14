"use client";

import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.3;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring" as const, duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};

export function DoodleArrow({ className, delayIndex = 0 }: { className?: string, delayIndex?: number }) {
  return (
    <motion.svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      fill="none"
      stroke="var(--electric-blue)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M 10 10 Q 50 20 80 80"
        variants={draw}
        custom={delayIndex}
      />
      <motion.path
        d="M 55 85 L 80 80 L 70 55"
        variants={draw}
        custom={delayIndex + 0.5}
      />
    </motion.svg>
  );
}

export function DoodleCircle({ className, delayIndex = 0 }: { className?: string, delayIndex?: number }) {
  return (
    <motion.svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      fill="none"
      stroke="var(--electric-blue)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M 50 5 C 90 5 95 45 80 80 C 60 95 10 95 10 60 C 5 20 40 5 50 5"
        variants={draw}
        custom={delayIndex}
      />
    </motion.svg>
  );
}

export function DoodleUnderline({ className, delayIndex = 0 }: { className?: string, delayIndex?: number }) {
  return (
    <motion.svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 100 20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      fill="none"
      stroke="var(--electric-blue)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 5 10 Q 50 15 95 5"
        variants={draw}
        custom={delayIndex}
      />
    </motion.svg>
  );
}
