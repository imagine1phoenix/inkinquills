"use client";

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

export interface CanvasCardData {
  photoSrc: string | null;
  photoScale: number;
  photoOffsetX: number;
  photoOffsetY: number;
  name: string;
  role: string;
  title: string;
  teamName: string;
  theme: string;
  texture: string;
  glowColor: string;
}

// Helper: pseudo-random hash
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export interface CanvasCardRef {
  exportBlob: () => Promise<Blob | null>;
}

interface CanvasCardProps {
  data: CanvasCardData;
}

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1350;

// Helper: draw rounded rect path
function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Helper: draw wavy line
function drawWave(
  ctx: CanvasRenderingContext2D,
  startX: number, endX: number, baseY: number,
  amplitude: number, frequency: number
) {
  ctx.beginPath();
  for (let x = startX; x <= endX; x += 2) {
    const y = baseY + Math.sin((x - startX) * frequency) * amplitude;
    if (x === startX) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
}

// Helper: truncate text to fit width
function truncateText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let t = text;
  while (t.length > 0 && ctx.measureText(t + "…").width > maxWidth) {
    t = t.slice(0, -1);
  }
  return t + "…";
}

export const CanvasCard = forwardRef<CanvasCardRef, CanvasCardProps>(
  ({ data }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({
      exportBlob: () => {
        return new Promise<Blob | null>((resolve) => {
          if (!canvasRef.current) {
            resolve(null);
            return;
          }
          canvasRef.current.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/png",
            1.0
          );
        });
      },
    }));

    useEffect(() => {
      const renderCanvas = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Ensure fonts are loaded before drawing text
        await document.fonts.ready;

        // Resolve actual font family names from CSS variables
        const rootStyle = getComputedStyle(document.documentElement);
        const sansFont = rootStyle.getPropertyValue("--font-sans").trim().replace(/"/g, "") || "Geist, sans-serif";
        const monoFont = rootStyle.getPropertyValue("--font-mono").trim().replace(/"/g, "") || "Space Mono, monospace";
        const handFont = rootStyle.getPropertyValue("--font-handwriting").trim().replace(/"/g, "") || "Caveat, cursive";

        const PAD = 48; // card inner padding
        const CARD_RADIUS = 48;

        // ── 1. FULL CARD BACKGROUND ──
        // Themes
        let bgOuter = "#0a0610";
        let bgGradStops = ["#12091c", "#0f0a14", "#1a0e28"];
        let glowTRColors = ["rgba(242, 46, 138, 0.30)", "rgba(242, 46, 138, 0.08)", "rgba(242, 46, 138, 0)"];
        let glowBLColors = ["rgba(255, 183, 3, 0.20)", "rgba(255, 107, 74, 0.10)", "rgba(255, 107, 74, 0)"];
        let borderGlowColors = ["rgba(242, 46, 138, 0.25)", "rgba(255, 183, 3, 0.15)", "rgba(255, 107, 74, 0.25)"];

        if (data.theme === "cyberpunk") {
          bgOuter = "#050510";
          bgGradStops = ["#00001a", "#050014", "#0a0020"];
          glowTRColors = ["rgba(0, 255, 255, 0.30)", "rgba(0, 255, 255, 0.08)", "rgba(0, 255, 255, 0)"];
          glowBLColors = ["rgba(255, 0, 255, 0.20)", "rgba(255, 0, 128, 0.10)", "rgba(255, 0, 128, 0)"];
          borderGlowColors = ["rgba(0, 255, 255, 0.25)", "rgba(128, 0, 255, 0.15)", "rgba(255, 0, 255, 0.25)"];
        } else if (data.theme === "ocean") {
          bgOuter = "#001a22";
          bgGradStops = ["#002233", "#001a2a", "#003344"];
          glowTRColors = ["rgba(0, 255, 128, 0.30)", "rgba(0, 255, 128, 0.08)", "rgba(0, 255, 128, 0)"];
          glowBLColors = ["rgba(0, 128, 255, 0.20)", "rgba(0, 100, 255, 0.10)", "rgba(0, 100, 255, 0)"];
          borderGlowColors = ["rgba(0, 255, 128, 0.25)", "rgba(0, 200, 255, 0.15)", "rgba(0, 128, 255, 0.25)"];
        }

        // Outer fill: deep dark
        ctx.fillStyle = bgOuter;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Card body with rounded corners
        ctx.save();
        roundedRect(ctx, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, CARD_RADIUS);
        ctx.clip();

        // Base dark gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
        bgGrad.addColorStop(0, bgGradStops[0]);
        bgGrad.addColorStop(0.55, bgGradStops[1]);
        bgGrad.addColorStop(1, bgGradStops[2]);
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Sunset glow – top right
        const glowTR = ctx.createRadialGradient(
          CANVAS_WIDTH * 0.85, CANVAS_HEIGHT * 0.05, 0,
          CANVAS_WIDTH * 0.85, CANVAS_HEIGHT * 0.05, CANVAS_WIDTH * 0.6
        );
        glowTR.addColorStop(0, glowTRColors[0]);
        glowTR.addColorStop(0.5, glowTRColors[1]);
        glowTR.addColorStop(1, glowTRColors[2]);
        ctx.fillStyle = glowTR;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Sunset glow – bottom left
        const glowBL = ctx.createRadialGradient(
          CANVAS_WIDTH * 0.15, CANVAS_HEIGHT * 0.95, 0,
          CANVAS_WIDTH * 0.15, CANVAS_HEIGHT * 0.95, CANVAS_WIDTH * 0.6
        );
        glowBL.addColorStop(0, glowBLColors[0]);
        glowBL.addColorStop(0.4, glowBLColors[1]);
        glowBL.addColorStop(1, glowBLColors[2]);
        ctx.fillStyle = glowBL;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Texture overlay
        if (data.texture === "scanlines") {
          ctx.globalAlpha = 0.03;
          for (let y = 0; y < CANVAS_HEIGHT; y += 4) {
            ctx.fillStyle = y % 8 === 0 ? "#ffffff" : "#000000";
            ctx.fillRect(0, y, CANVAS_WIDTH, 1);
          }
        } else if (data.texture === "grid") {
          ctx.globalAlpha = 0.05;
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          for (let x = 0; x < CANVAS_WIDTH; x += 40) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_HEIGHT); ctx.stroke();
          }
          for (let y = 0; y < CANVAS_HEIGHT; y += 40) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_WIDTH, y); ctx.stroke();
          }
        } else if (data.texture === "dots") {
          ctx.globalAlpha = 0.05;
          ctx.fillStyle = "#ffffff";
          for (let x = 0; x < CANVAS_WIDTH; x += 20) {
            for (let y = 0; y < CANVAS_HEIGHT; y += 20) {
              ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
            }
          }
        }
        ctx.globalAlpha = 1;

        // ── 2. PHOTO ZONE (top ~58%) ──
        const photoZoneHeight = CANVAS_HEIGHT * 0.58;
        const waveMidY = photoZoneHeight;

        // Create wave-cut clip for photo
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(CANVAS_WIDTH, 0);
        // Right side down to wave start
        ctx.lineTo(CANVAS_WIDTH, waveMidY - 40);
        // Wavy bottom edge (right to left)
        for (let x = CANVAS_WIDTH; x >= 0; x -= 2) {
          const progress = x / CANVAS_WIDTH;
          const y =
            waveMidY +
            Math.sin(x * 0.012) * 25 +
            Math.sin(x * 0.025 + 1) * 12 -
            progress * 30;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.clip();

        if (data.photoSrc) {
          // Draw uploaded photo
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = data.photoSrc;

          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject();
          });

          // Cover-fit the photo into the zone
          const imgRatio = img.width / img.height;
          const zoneRatio = CANVAS_WIDTH / photoZoneHeight;

          let dw: number, dh: number;
          if (imgRatio > zoneRatio) {
            // Image is wider — fit height, crop sides
            dh = photoZoneHeight;
            dw = photoZoneHeight * imgRatio;
          } else {
            // Image is taller — fit width, crop top/bottom
            dw = CANVAS_WIDTH;
            dh = CANVAS_WIDTH / imgRatio;
          }

          dw *= data.photoScale;
          dh *= data.photoScale;

          const dx = (CANVAS_WIDTH - dw) / 2 + data.photoOffsetX;
          const dy = (photoZoneHeight - dh) / 2 + data.photoOffsetY;

          ctx.drawImage(img, dx, dy, dw, dh);

          // Subtle vignette on photo
          const vig = ctx.createRadialGradient(
            CANVAS_WIDTH / 2, photoZoneHeight / 2, photoZoneHeight * 0.3,
            CANVAS_WIDTH / 2, photoZoneHeight / 2, photoZoneHeight * 0.9
          );
          vig.addColorStop(0, "rgba(0,0,0,0)");
          vig.addColorStop(1, "rgba(10,6,16,0.5)");
          ctx.fillStyle = vig;
          ctx.fillRect(0, 0, CANVAS_WIDTH, photoZoneHeight + 60);
        } else {
          // Placeholder
          const phGrad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, photoZoneHeight);
          phGrad.addColorStop(0, "#1a1122");
          phGrad.addColorStop(1, "#150d1e");
          ctx.fillStyle = phGrad;
          ctx.fillRect(0, 0, CANVAS_WIDTH, photoZoneHeight + 60);

          // Upload icon placeholder
          ctx.fillStyle = "rgba(255,255,255,0.06)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `48px ${sansFont}`;
          ctx.fillText("📷", CANVAS_WIDTH / 2, photoZoneHeight * 0.4);
          ctx.font = `32px ${sansFont}`;
          ctx.fillStyle = "rgba(255,255,255,0.08)";
          ctx.fillText("Upload your photo", CANVAS_WIDTH / 2, photoZoneHeight * 0.4 + 60);
        }

        ctx.restore(); // Remove photo clip

        // ── 3. WAVY LINE ──
        ctx.save();
        const waveGrad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, 0);
        if (data.glowColor) {
           waveGrad.addColorStop(0, data.glowColor);
           waveGrad.addColorStop(0.5, "#ffffff");
           waveGrad.addColorStop(1, data.glowColor);
        } else if (data.theme === "cyberpunk") {
           waveGrad.addColorStop(0, "#00ffff");
           waveGrad.addColorStop(0.5, "#ff00ff");
           waveGrad.addColorStop(1, "#00ffff");
        } else if (data.theme === "ocean") {
           waveGrad.addColorStop(0, "#00ff80");
           waveGrad.addColorStop(0.5, "#0080ff");
           waveGrad.addColorStop(1, "#00ff80");
        } else {
           waveGrad.addColorStop(0, "#ff6b4a");
           waveGrad.addColorStop(0.4, "#ffb703");
           waveGrad.addColorStop(0.7, "#f22e8a");
           waveGrad.addColorStop(1, "#ff6b4a");
        }
        ctx.strokeStyle = waveGrad;
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.beginPath();
        for (let x = 0; x <= CANVAS_WIDTH; x += 2) {
          const progress = x / CANVAS_WIDTH;
          const y =
            waveMidY +
            Math.sin(x * 0.012) * 25 +
            Math.sin(x * 0.025 + 1) * 12 -
            progress * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Glow behind the wave line
        ctx.lineWidth = 20;
        ctx.globalAlpha = 0.15;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();

        // ── 4. BADGE ZONE (bottom ~42%) ──
        const badgeStartY = waveMidY + 60;
        const centerX = CANVAS_WIDTH / 2;
        const maxTextW = CANVAS_WIDTH - PAD * 2;

        // Name – large, bold
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        // Auto-size name to fit
        let nameFontSize = 96;
        ctx.font = `800 ${nameFontSize}px ${sansFont}`;
        const displayName = data.name || "YOUR NAME";
        while (ctx.measureText(displayName).width > maxTextW && nameFontSize > 48) {
          nameFontSize -= 4;
          ctx.font = `800 ${nameFontSize}px ${sansFont}`;
        }
        ctx.fillText(truncateText(ctx, displayName, maxTextW), centerX, badgeStartY);

        // Builder Title – handwritten, playful, slightly tilted
        const titleY = badgeStartY + nameFontSize + 20;
        ctx.save();
        ctx.translate(centerX, titleY);
        ctx.rotate(-0.03); // subtle tilt
        ctx.fillStyle = "#f22e8a";
        ctx.font = `72px ${handFont}`;
        const displayTitle = data.title || "Certified Builder";
        ctx.fillText(truncateText(ctx, displayTitle, maxTextW), 0, 0);
        ctx.restore();

        // Stack/Role – mono, muted
        const roleY = titleY + 90;
        ctx.fillStyle = "#9a8fb0";
        ctx.font = `36px ${monoFont}`;
        ctx.textAlign = "center";
        const displayRole = (data.role || "Full-stack Developer").toUpperCase();
        ctx.fillText(truncateText(ctx, displayRole, maxTextW), centerX, roleY);

        // Team Name – bold, bright
        let currentY = roleY;
        if (data.teamName) {
           currentY += 60;
           ctx.fillStyle = data.glowColor || (data.theme === "cyberpunk" ? "#00ffff" : data.theme === "ocean" ? "#00ff80" : "#ffb703");
           ctx.font = `bold 32px ${sansFont}`;
           ctx.textAlign = "center";
           const displayTeam = data.teamName.toUpperCase();
           ctx.fillText(truncateText(ctx, displayTeam, maxTextW), centerX, currentY);
        }

        // ── 5. DIVIDER LINE ──
        const divY = currentY + 70;
        const divGrad = ctx.createLinearGradient(PAD * 3, divY, CANVAS_WIDTH - PAD * 3, divY);
        divGrad.addColorStop(0, "rgba(255,107,74,0)");
        divGrad.addColorStop(0.3, "rgba(255,107,74,0.3)");
        divGrad.addColorStop(0.7, "rgba(242,46,138,0.3)");
        divGrad.addColorStop(1, "rgba(242,46,138,0)");
        ctx.strokeStyle = divGrad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(PAD * 3, divY);
        ctx.lineTo(CANVAS_WIDTH - PAD * 3, divY);
        ctx.stroke();

        // ── 6. BOTTOM LOCKUP & BARCODE ──
        const bottomY = CANVAS_HEIGHT - PAD - 20;

        // HH GOA 2026 wordmark
        ctx.fillStyle = (data.theme === "cyberpunk" ? "#ff00ff" : data.theme === "ocean" ? "#0080ff" : "#ff6b4a");
        ctx.font = `bold 40px ${monoFont}`;
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillText("HH GOA 2026", PAD, bottomY);

        // #FrameInGoa
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.font = `32px ${monoFont}`;
        ctx.textAlign = "right";
        ctx.fillText("#FrameInGoa", CANVAS_WIDTH - PAD, bottomY);

        // Barcode Generation
        const seedStr = (data.name || "YOUR NAME") + (data.teamName || "");
        const hash = Math.abs(hashString(seedStr));
        const serialNum = `HH-${hash.toString(16).toUpperCase().substring(0, 6).padStart(6, '0')}`;
        
        // Draw Barcode in the center
        const barcodeW = 160;
        const barcodeH = 40;
        const barcodeX = centerX - barcodeW / 2;
        const barcodeY = bottomY - 50;
        
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        let currX = barcodeX;
        for (let i = 0; i < 20 && currX < barcodeX + barcodeW; i++) {
          const w = ((hash >> (i % 16)) & 3) * 2 + 2; 
          ctx.fillRect(currX, barcodeY, w, barcodeH);
          currX += w + (((hash >> (i % 12)) & 1) * 2 + 2);
        }
        
        // Serial Number Text under barcode
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = `20px ${monoFont}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(serialNum, centerX, barcodeY + barcodeH + 5);

        // ── 7. CARD BORDER (subtle inner glow) ──
        roundedRect(ctx, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, CARD_RADIUS);
        const borderGrad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        borderGrad.addColorStop(0, borderGlowColors[0]);
        borderGrad.addColorStop(0.5, borderGlowColors[1]);
        borderGrad.addColorStop(1, borderGlowColors[2]);
        ctx.strokeStyle = borderGrad;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore(); // End card clip
      };

      renderCanvas();
    }, [data]);

    return (
      <div className="w-full max-w-[420px] aspect-[4/5] mx-auto overflow-hidden rounded-2xl shadow-2xl relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }
);

CanvasCard.displayName = "CanvasCard";
