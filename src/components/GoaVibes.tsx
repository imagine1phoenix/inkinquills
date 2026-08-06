"use client";

import React from "react";

/** Animated SVG palm tree silhouettes — positioned as decorative elements */
export function PalmSilhouettes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Left palm */}
      <svg
        viewBox="0 0 200 500"
        className="absolute -left-8 bottom-0 w-36 md:w-48 opacity-[0.06] animate-palm-sway"
        style={{ transformOrigin: "bottom center" }}
      >
        <g fill="currentColor" className="text-foreground">
          {/* Trunk */}
          <path d="M95,500 Q90,400 100,300 Q105,350 102,500 Z" />
          {/* Fronds */}
          <path d="M100,300 Q60,260 10,280 Q50,250 80,240 Q60,220 20,210 Q60,210 90,230 Q80,200 50,170 Q80,190 100,220 Q95,180 80,140 Q100,180 110,230 Q120,190 150,170 Q130,200 110,230 Q140,210 170,210 Q140,220 120,240 Q150,250 190,280 Q140,260 100,300 Z" />
        </g>
      </svg>

      {/* Right palm */}
      <svg
        viewBox="0 0 200 500"
        className="absolute -right-8 bottom-0 w-32 md:w-44 opacity-[0.05] animate-palm-sway-reverse"
        style={{ transformOrigin: "bottom center", animationDelay: "1.5s" }}
      >
        <g fill="currentColor" className="text-foreground" transform="scale(-1,1) translate(-200,0)">
          <path d="M95,500 Q88,380 100,280 Q108,370 104,500 Z" />
          <path d="M100,280 Q60,240 10,260 Q50,230 80,220 Q60,200 20,190 Q60,190 90,210 Q80,180 50,150 Q80,170 100,200 Q95,160 80,120 Q100,160 110,210 Q120,170 150,150 Q130,180 110,210 Q140,190 170,190 Q140,200 120,220 Q150,230 190,260 Q140,240 100,280 Z" />
        </g>
      </svg>

      {/* Small accent palm top-right */}
      <svg
        viewBox="0 0 120 200"
        className="absolute right-4 top-16 w-16 md:w-24 opacity-[0.04] animate-palm-sway"
        style={{ transformOrigin: "bottom center", animationDelay: "0.8s" }}
      >
        <g fill="currentColor" className="text-foreground">
          <path d="M58,200 Q56,160 60,120 Q62,155 61,200 Z" />
          <path d="M60,120 Q40,100 10,110 Q35,95 52,92 Q40,80 15,75 Q40,78 55,88 Q50,70 35,50 Q50,65 58,85 Q58,60 48,35 Q60,60 65,90 Q72,65 90,50 Q78,70 65,90 Q82,80 100,78 Q82,85 68,95 Q88,98 110,110 Q85,100 60,120 Z" />
        </g>
      </svg>
    </div>
  );
}

/** Animated ocean waves at the bottom of the page */
export function OceanWaves() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-[1] h-28 overflow-hidden">
      {/* Wave layer 1 — back */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-[200%] h-20 animate-ocean-wave-1"
      >
        <defs>
          <linearGradient id="wave1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0e7490" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 C120,30 240,90 360,60 C480,30 600,90 720,60 C840,30 960,90 1080,60 C1200,30 1320,90 1440,60 L1440,120 L0,120 Z"
          fill="url(#wave1Grad)"
        />
      </svg>

      {/* Wave layer 2 — mid */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-[200%] h-16 animate-ocean-wave-2"
      >
        <defs>
          <linearGradient id="wave2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.10" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.10" />
          </linearGradient>
        </defs>
        <path
          d="M0,80 C180,50 360,100 540,70 C720,40 900,100 1080,70 C1260,40 1350,80 1440,70 L1440,120 L0,120 Z"
          fill="url(#wave2Grad)"
        />
      </svg>

      {/* Wave layer 3 — front */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-[200%] h-10 animate-ocean-wave-3"
      >
        <defs>
          <linearGradient id="wave3Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#164e63" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#0e7490" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#164e63" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M0,90 C200,70 400,110 600,85 C800,60 1000,105 1200,85 C1350,70 1400,90 1440,85 L1440,120 L0,120 Z"
          fill="url(#wave3Grad)"
        />
      </svg>
    </div>
  );
}

/** Animated sunset sun — glowing orb in the background */
export function SunsetOrb() {
  return (
    <div className="fixed pointer-events-none z-0">
      {/* Main sun orb */}
      <div
        className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(255,183,3,0.12) 0%, rgba(255,107,74,0.06) 40%, rgba(242,46,138,0.02) 70%, transparent 100%)",
        }}
      />
      {/* Sun reflection on "water" */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[400px]"
        style={{
          background: "linear-gradient(to bottom, rgba(255,183,3,0.04) 0%, rgba(255,107,74,0.02) 50%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
