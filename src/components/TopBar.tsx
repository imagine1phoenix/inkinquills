"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function TopBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-text-dim/20">
      <div className="flex items-center justify-between px-6 py-3 font-ui text-xs md:text-sm font-medium text-text-muted">
        <div className="flex-1 text-left tracking-widest uppercase font-display text-text-primary">
          Inks & Quils
        </div>
        <div className="flex-1 text-center hidden md:block">
          This website exists because a PDF felt boring.
        </div>
        <div className="flex-1 text-right">
          You&apos;ve seen <span className="text-text-primary font-bold">{percentage}%</span>
        </div>
      </div>
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-electric-blue origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
