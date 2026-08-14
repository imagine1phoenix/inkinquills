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
    <div className="fixed top-0 left-0 right-0 z-50 flex h-12 border-b-2 border-midnight bg-[#F4F2EC]">
      {/* Left Block */}
      <div className="flex-none px-6 flex items-center justify-center bg-midnight text-text-primary border-r-2 border-midnight">
        <span className="font-display text-lg tracking-wide">
          Ink in Quills
        </span>
      </div>

      {/* Center Block */}
      <div className="flex-1 px-6 flex items-center justify-center text-midnight">
        <span className="font-display text-base hidden md:block">
          Started as readers. Ended up telling stories.
        </span>
      </div>

      {/* Right Block */}
      <div className="hidden sm:flex flex-none px-6 items-center justify-center border-l-2 border-midnight text-midnight font-display text-sm gap-2">
        <span>You&apos;ve seen</span>
        <span className="font-bold w-8 text-right">{percentage}%</span>
      </div>

      {/* Progress Bar Line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric-blue origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
