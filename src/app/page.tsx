"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  Upload,
  Download,
  Share2,
  RefreshCw,
  Sparkles,
  Camera,
  ZoomIn,
  Move,
  ChevronDown,
  Wand2,
  Check,
} from "lucide-react";
import { processUploadedImage, blobToDataURL } from "@/utils/imageProcessor";
import {
  CanvasCard,
  CanvasCardRef,
  CanvasCardData,
} from "@/components/CanvasCard";
import { ParticleField } from "@/components/ParticleField";
import { OceanWaves, PalmSilhouettes, SunsetOrb } from "@/components/GoaVibes";
import { TiltCard } from "@/components/TiltCard";
import { ConfettiBurst, GlowBorder } from "@/components/Animations";

/* ─── Title Generation ─── */
const TITLE_POOLS: Record<string, string[]> = {
  ai: ["Prompt Alchemist", "Neural Architect", "Model Whisperer", "Token Shaman", "Gradient Guru", "Tensor Tamer"],
  fe: ["UI Sorcerer", "Pixel Perfectionist", "DOM Wizard", "CSS Shapeshifter", "Flex Lord", "Component Composer"],
  be: ["API Artisan", "Data Wrangler", "Server Sage", "Query Quester", "Cache Commander", "Schema Sculptor"],
  mobile: ["App Alchemist", "Swift Ninja", "Flutter Phoenix", "Touch Maestro", "Screen Whisperer"],
  devops: ["Deploy Deity", "Pipeline Prophet", "Container Captain", "Cloud Shaman", "Uptime Oracle"],
  design: ["Design Oracle", "UX Unicorn", "Color Theorist", "Layout Luminary", "Pixel Poet"],
  generic: ["Certified Builder", "Shipping Machine", "Code Conjurer", "Chaos Engineer", "Bug Slayer", "Stack Surgeon", "Debug Detective", "Merge Master"],
};

function generateTitle(role: string): string {
  const r = role.toLowerCase();
  const checks: [string[], string][] = [
    [["ai", "ml", "llm", "prompt", "model", "deep learning", "neural", "gpt"], "ai"],
    [["react", "frontend", "vue", "angular", "ui", "ux", "css", "tailwind", "svelte", "next"], "fe"],
    [["backend", "node", "api", "database", "rust", "go", "python", "django", "express", "fastapi", "java", "spring"], "be"],
    [["ios", "android", "mobile", "flutter", "react native", "swift", "kotlin"], "mobile"],
    [["devops", "docker", "kubernetes", "ci/cd", "aws", "cloud", "terraform", "infra"], "devops"],
    [["design", "figma", "sketch", "photoshop", "illustration", "brand"], "design"],
  ];
  for (const [keywords, cat] of checks) {
    if (keywords.some((k) => r.includes(k))) {
      const pool = TITLE_POOLS[cat];
      return pool[Math.floor(Math.random() * pool.length)];
    }
  }
  const pool = TITLE_POOLS.generic;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ─── Step Indicator ─── */
function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="relative"
          initial={false}
          animate={{
            scale: i === step ? 1 : 0.8,
          }}
        >
          <motion.div
            className="w-2.5 h-2.5 rounded-full"
            animate={{
              background:
                i < step
                  ? "linear-gradient(135deg, #ff6b4a, #f22e8a)"
                  : i === step
                    ? "linear-gradient(135deg, #ffb703, #ff6b4a)"
                    : "rgba(255,255,255,0.15)",
            }}
            transition={{ duration: 0.3 }}
          />
          {i === step && (
            <motion.div
              layoutId="step-glow"
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "0 0 12px rgba(255,183,3,0.5)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Animated Wave Divider ─── */
function WaveDivider() {
  return (
    <div className="w-full h-8 overflow-hidden relative my-2">
      <svg
        viewBox="0 0 1200 50"
        className="w-[200%] animate-wave-flow"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b4a" stopOpacity="0.6" />
            <stop offset="33%" stopColor="#f22e8a" stopOpacity="0.4" />
            <stop offset="66%" stopColor="#ffb703" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff6b4a" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M0,25 Q150,5 300,25 T600,25 T900,25 T1200,25"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

/* ─── Drag-and-Drop Zone ─── */
function DropZone({
  onFile,
  loading,
  hasPhoto,
}: {
  onFile: (file: File) => void;
  loading: boolean;
  hasPhoto: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  return (
    <motion.label
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        relative flex flex-col items-center justify-center w-full h-36 px-4 cursor-pointer
        rounded-2xl transition-all duration-300 overflow-hidden group
        ${isDragging
          ? "border-2 border-primary bg-primary/10 scale-[1.02]"
          : "border-2 border-dashed border-card-border/60 hover:border-primary/40 bg-background/30"
        }
      `}
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div
        animate={isDragging ? { scale: 1.2, y: -5 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative z-10 flex flex-col items-center gap-3"
      >
        {loading ? (
          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        ) : (
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Camera className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors" />
          </motion.div>
        )}
        <span className="font-medium text-sm text-foreground/50 group-hover:text-foreground/70 transition-colors text-center">
          {loading
            ? "Processing your photo..."
            : isDragging
              ? "Drop it here!"
              : hasPhoto
                ? "Tap to change photo"
                : "Drop your photo here or tap to upload"}
        </span>
        <span className="text-xs text-foreground/30">JPG, PNG, HEIC • up to 20MB</span>
      </motion.div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*,.heic,.heif"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
    </motion.label>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [data, setData] = useState<CanvasCardData>({
    photoSrc: null,
    photoScale: 1,
    photoOffsetX: 0,
    photoOffsetY: 0,
    name: "",
    role: "",
    title: "Certified Builder",
  });

  const canvasRef = useRef<CanvasCardRef>(null);

  // Track which step the user is on
  useEffect(() => {
    if (!data.photoSrc) setCurrentStep(0);
    else if (!data.name) setCurrentStep(1);
    else setCurrentStep(2);
  }, [data.photoSrc, data.name]);

  const handleFile = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const processedBlob = await processUploadedImage(file);
      const dataUrl = await blobToDataURL(processedBlob);
      setData((prev) => ({
        ...prev,
        photoSrc: dataUrl,
        photoScale: 1,
        photoOffsetX: 0,
        photoOffsetY: 0,
      }));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to process image";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRoleChange = (role: string) => {
    setData((prev) => ({
      ...prev,
      role,
      title:
        prev.role === "" && role.length > 2
          ? generateTitle(role)
          : prev.title,
    }));
  };

  const rerollTitle = () => {
    setData((prev) => ({ ...prev, title: generateTitle(prev.role) }));
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    const blob = await canvasRef.current.exportBlob();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hh-goa-2026-${data.name.replace(/\s+/g, "-").toLowerCase() || "card"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowConfetti(true);
    setDownloaded(true);
    setTimeout(() => {
      setShowConfetti(false);
      setDownloaded(false);
    }, 3000);
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    setShareLoading(true);
    setError(null);

    try {
      const blob = await canvasRef.current.exportBlob();
      if (!blob) throw new Error("Failed to generate image for sharing.");

      const formData = new FormData();
      formData.append("image", blob, "share.png");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image. Please try again.");
      const result = await res.json();

      const shareUrl = `${window.location.origin}/share/${result.id}`;
      const text = encodeURIComponent(
        `Just built my HH Goa 2026 builder card 🛠️🌊`
      );
      const hashtags = "FrameInGoa";
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`,
        "_blank"
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to share.";
      setError(message);
    } finally {
      setShareLoading(false);
    }
  };

  /* ─── Animation variants ─── */
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <>
      <SunsetOrb />
      <ParticleField />
      <OceanWaves />
      <PalmSilhouettes />
      <ConfettiBurst trigger={showConfetti} />

      <main className="relative z-10 min-h-screen pb-16">
        {/* ─── Hero Section ─── */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="pt-12 pb-6 px-4 text-center relative"
        >
          {/* Decorative orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />
          <div className="absolute top-10 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-[80px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "1s" }} />

          <motion.div variants={fadeUp} custom={0}>
            <motion.h1
              className="text-6xl md:text-8xl font-black tracking-tighter gradient-text uppercase font-mono leading-none"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              HH Goa
            </motion.h1>
          </motion.div>

          <motion.div variants={fadeUp} custom={1}>
            <span className="text-5xl md:text-7xl font-black tracking-tighter text-foreground/90 font-mono">
              2026
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-handwriting text-3xl md:text-4xl text-sun/70 mt-3"
          >
            Build your identity card
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex items-center justify-center gap-3 mt-5"
          >
            <StepIndicator step={currentStep} total={3} />
            <span className="text-xs text-foreground/30 font-mono uppercase tracking-widest">
              {currentStep === 0
                ? "Upload Photo"
                : currentStep === 1
                  ? "Add Details"
                  : "Ready!"}
            </span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-6"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-5 h-5 text-foreground/20 mx-auto" />
            </motion.div>
          </motion.div>
        </motion.header>

        {/* ─── Error Banner ─── */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="max-w-xl mx-auto px-4 mb-4"
            >
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-medium flex items-center gap-2 backdrop-blur-sm">
                <span>⚠️</span>
                {error}
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-400/60 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Main Content ─── */}
        <div className="max-w-6xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 items-start">
          {/* ── LEFT: Controls ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-5 order-2 lg:order-1"
          >
            {/* Step 1: Photo Upload */}
            <motion.div variants={fadeUp} custom={0}>
              <GlowBorder>
                <div className="glass rounded-2xl p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-foreground/60">
                      Your Photo
                    </span>
                    {data.photoSrc && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                      </motion.div>
                    )}
                  </div>

                  <DropZone onFile={handleFile} loading={loading} hasPhoto={!!data.photoSrc} />

                  {/* Photo Adjustments */}
                  <AnimatePresence>
                    {data.photoSrc && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-3 bg-background/20 p-4 rounded-xl border border-card-border/30">
                          <div className="flex items-center gap-2 justify-center">
                            <ZoomIn className="w-3.5 h-3.5 text-foreground/40" />
                            <span className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                              Adjust
                            </span>
                            <Move className="w-3.5 h-3.5 text-foreground/40" />
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                              <label className="text-xs text-foreground/40">Zoom</label>
                              <span className="text-xs text-primary/60 font-mono">
                                {data.photoScale.toFixed(1)}×
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0.5"
                              max="3"
                              step="0.05"
                              value={data.photoScale}
                              onChange={(e) =>
                                setData((p) => ({
                                  ...p,
                                  photoScale: parseFloat(e.target.value),
                                }))
                              }
                              className="w-full"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                              <label className="text-xs text-foreground/40">
                                Horizontal
                              </label>
                              <input
                                type="range"
                                min="-500"
                                max="500"
                                step="10"
                                value={data.photoOffsetX}
                                onChange={(e) =>
                                  setData((p) => ({
                                    ...p,
                                    photoOffsetX: parseInt(e.target.value),
                                  }))
                                }
                                className="w-full"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs text-foreground/40">
                                Vertical
                              </label>
                              <input
                                type="range"
                                min="-500"
                                max="500"
                                step="10"
                                value={data.photoOffsetY}
                                onChange={(e) =>
                                  setData((p) => ({
                                    ...p,
                                    photoOffsetY: parseInt(e.target.value),
                                  }))
                                }
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlowBorder>
            </motion.div>

            <WaveDivider />

            {/* Step 2: Details */}
            <motion.div variants={fadeUp} custom={1}>
              <GlowBorder>
                <div className="glass rounded-2xl p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sun to-primary flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-foreground/60">
                      Your Details
                    </span>
                    {data.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                      </motion.div>
                    )}
                  </div>

                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    placeholder="Your Name"
                    value={data.name}
                    onChange={(e) =>
                      setData((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full bg-background/30 border border-card-border/40 rounded-xl px-4 py-3.5 text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 transition-all text-base"
                  />

                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    placeholder="Stack / Role (e.g. React & Node)"
                    value={data.role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="w-full bg-background/30 border border-card-border/40 rounded-xl px-4 py-3.5 text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 transition-all font-mono text-sm"
                  />

                  {/* Builder Title with magic wand */}
                  <div className="relative group">
                    <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-accent/30 via-primary/30 to-sun/30 opacity-0 group-hover:opacity-100 blur-[1px] transition-opacity duration-300" />
                    <div className="relative flex items-center">
                      <Wand2 className="absolute left-3 w-4 h-4 text-accent/50" />
                      <input
                        type="text"
                        placeholder="Builder Title"
                        value={data.title}
                        onChange={(e) =>
                          setData((p) => ({ ...p, title: e.target.value }))
                        }
                        className="w-full bg-accent/5 border border-accent/20 rounded-xl pl-10 pr-12 py-3.5 text-accent font-handwriting text-xl placeholder:text-accent/25 focus:outline-none focus:border-accent/50 transition-all"
                      />
                      <motion.button
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={rerollTitle}
                        className="absolute right-3 p-1.5 bg-accent/10 hover:bg-accent/20 rounded-lg text-accent transition-colors"
                        title="Reroll Title"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </GlowBorder>
            </motion.div>

            <WaveDivider />

            {/* Step 3: Actions */}
            <motion.div variants={fadeUp} custom={2}>
              <div className="glass rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-cyan flex items-center justify-center text-white text-xs font-bold">
                    3
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-foreground/60">
                    Get Your Card
                  </span>
                  <Sparkles className="w-4 h-4 text-sun/50 ml-auto animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDownload}
                    className="relative flex items-center justify-center gap-2 bg-card-solid border border-card-border/60 hover:border-foreground/20 text-foreground font-bold py-4 px-5 rounded-xl transition-all uppercase tracking-wider text-xs overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    {downloaded ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Done!</span>
                      </motion.div>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download PNG
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleShare}
                    disabled={shareLoading}
                    className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-5 rounded-xl transition-all uppercase tracking-wider text-xs disabled:opacity-50 overflow-hidden group shadow-lg shadow-primary/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    {shareLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                    {shareLoading ? "Uploading…" : "Share to X"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Live Preview ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
            className="flex flex-col gap-5 order-1 lg:order-2 lg:sticky lg:top-6"
          >
            <TiltCard className="rounded-2xl">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-card-border/40 via-card-border/20 to-card-border/40 glow-primary">
                <CanvasCard data={data} ref={canvasRef} />
              </div>
            </TiltCard>

            {/* Mobile-only action buttons */}
            <div className="grid grid-cols-2 gap-3 lg:hidden">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 glass text-foreground font-bold py-3.5 px-5 rounded-xl uppercase tracking-wider text-xs"
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                disabled={shareLoading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-bold py-3.5 px-5 rounded-xl uppercase tracking-wider text-xs disabled:opacity-50 shadow-lg shadow-primary/20"
              >
                {shareLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                {shareLoading ? "Uploading…" : "Share to X"}
              </motion.button>
            </div>

            {/* Fun stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <p className="text-xs text-foreground/20 font-mono">
                ✨ Your card updates in real-time as you type
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
