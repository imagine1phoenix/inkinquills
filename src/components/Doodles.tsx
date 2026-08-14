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

export function DoodleStar({ className, delayIndex = 0 }: { className?: string, delayIndex?: number }) {
  return (
    <motion.svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M 50 10 L 60 40 L 90 50 L 60 60 L 50 90 L 40 60 L 10 50 L 40 40 Z"
        variants={draw}
        custom={delayIndex}
      />
    </motion.svg>
  );
}

export function DoodleSquiggle({ className, delayIndex = 0 }: { className?: string, delayIndex?: number }) {
  return (
    <motion.svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 100 50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M 10 25 Q 20 5 30 25 T 50 25 T 70 25 T 90 25"
        variants={draw}
        custom={delayIndex}
      />
    </motion.svg>
  );
}

export function DoodleFace({ className, delayIndex = 0 }: { className?: string, delayIndex?: number }) {
  return (
    <motion.svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Eyes */}
      <motion.path d="M 35 40 L 35 45" variants={draw} custom={delayIndex} />
      <motion.path d="M 65 40 L 65 45" variants={draw} custom={delayIndex + 0.2} />
      {/* Squiggly Smile */}
      <motion.path d="M 30 65 Q 40 75 50 65 T 70 65" variants={draw} custom={delayIndex + 0.4} />
      {/* Circle outline */}
      <motion.path d="M 50 5 C 80 5 95 30 90 60 C 85 90 30 95 15 70 C 0 45 20 5 50 5" variants={draw} custom={delayIndex + 0.6} />
    </motion.svg>
  );
}

export function DoodleCrown({ className, delayIndex = 0 }: { className?: string, delayIndex?: number }) {
  return (
    <motion.svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M 20 80 L 10 30 L 35 50 L 50 20 L 65 50 L 90 30 L 80 80 Z"
        variants={draw}
        custom={delayIndex}
      />
    </motion.svg>
  );
}

export function DoodleEye({ className, delayIndex = 0 }: { className?: string, delayIndex?: number }) {
  return (
    <motion.svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M 10 50 Q 50 10 90 50 Q 50 90 10 50 Z"
        variants={draw}
        custom={delayIndex}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="15"
        variants={draw}
        custom={delayIndex + 0.3}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="5"
        fill="currentColor"
        variants={draw}
        custom={delayIndex + 0.6}
      />
    </motion.svg>
  );
}

export function DoodleSwirl({ className, delayIndex = 0 }: { className?: string, delayIndex?: number }) {
  return (
    <motion.svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M 50 50 C 40 40 30 60 50 70 C 80 80 90 40 70 20 C 40 -10 -10 30 10 70 C 30 110 90 100 95 60"
        variants={draw}
        custom={delayIndex}
      />
    </motion.svg>
  );
}

export function DoodleSpark({ className, delayIndex = 0 }: { className?: string, delayIndex?: number }) {
  return (
    <motion.svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path d="M 50 10 L 50 30" variants={draw} custom={delayIndex} />
      <motion.path d="M 50 70 L 50 90" variants={draw} custom={delayIndex + 0.1} />
      <motion.path d="M 10 50 L 30 50" variants={draw} custom={delayIndex + 0.2} />
      <motion.path d="M 70 50 L 90 50" variants={draw} custom={delayIndex + 0.3} />
      <motion.path d="M 25 25 L 40 40" variants={draw} custom={delayIndex + 0.4} />
      <motion.path d="M 75 75 L 60 60" variants={draw} custom={delayIndex + 0.5} />
      <motion.path d="M 25 75 L 40 60" variants={draw} custom={delayIndex + 0.6} />
      <motion.path d="M 75 25 L 60 40" variants={draw} custom={delayIndex + 0.7} />
    </motion.svg>
  );
}
