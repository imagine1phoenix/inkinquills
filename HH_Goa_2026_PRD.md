# PRD — HH Goa 2026 Frame / ID Card Generator
**Shortlisting task submission** · Deadline: 11:59 PM, 13 Aug 2026 (7 days from today)

> Since we're proceeding without confirming brand assets/stack, every judgment call below is marked **[ASSUMPTION]**. Swap these out first if you get real inputs (logo, colors, event copy) before you start building — everything else in the doc stays valid.

---

## 1. Objective

Build a zero-friction web tool: upload a photo → get a branded HH Goa 2026 graphic → download it or post it to X with one tap. The whole point of the grading is **speed, polish, and a working share loop** — not feature count. A tool that does one format flawlessly beats one that does two formats shakily.

**[ASSUMPTION]** Build **Format B (Builder ID Card)** as the primary deliverable. It's the format that lets you show more range in one screenshot (photo handling + dynamic text + layout), which matters more for a shortlisting round than Format A's simpler frame-wrap. Format A is listed as a stretch goal in §9 — the compositing engine is built so it's a ~2-hour add-on if you have time left.

---

## 2. Success Criteria (map directly to the brief's grading language)

| Requirement | Target |
|---|---|
| Speed | Upload → rendered result in **under 2 seconds** on a mid-range phone over 4G |
| No login/signup | Zero auth anywhere in the flow |
| Handles real photos | Any aspect ratio, jpg/png/HEIC, up to 20MB, no pre-cropping required |
| On-brand | Custom illustrated frame/card, not a logo slapped on a generic template |
| Downloadable | Real PNG file (not a canvas that only renders on-screen) |
| Share to X | Pre-filled tweet, caption + **#FrameInGoa**, and the link preview shows the *actual* generated image, not a placeholder |
| Mobile-first | Fully usable one-handed on a phone; no desktop-only interactions |

---

## 3. User Flow

```
1. Landing screen → single clear CTA: "Upload your photo"
2. Photo picker (camera or gallery on mobile) → HEIC auto-converted if needed
3. Crop/position screen → user drags to position + pinch/scroll to zoom within a fixed frame shape
4. Quick-fields form → Name, Stack/Role (free text or short chip-select), builder title (auto-generated, editable)
5. Live preview renders instantly as fields update (no separate "Generate" button/spinner — feels instant)
6. Two actions: [Download PNG]  [Share to X]
   - Download → saves final composited PNG
   - Share to X → opens X intent with caption + hashtag + link to a share page whose OG image is this exact graphic
```

No step requires a page reload. Steps 2–5 should live on one screen (or a single scroll) so it reads as "one pass," per the brief.

---

## 4. Format B — Card Content & Layout

**Fields:**
- Photo (required)
- Name (required, free text)
- Stack/Role (free text, e.g. "Full-stack · React/Node")
- Builder title — **[ASSUMPTION]** auto-generated from a small curated list keyed loosely to what they type in Stack/Role (e.g. contains "AI/ML" → picks from a "Model Whisperer / Neural Architect / Prompt Alchemist" pool; otherwise a generic "Certified Builder / Shipping Machine / Code Conjurer" pool), shown as an editable chip so users can reroll or overwrite it. This is what makes the card feel fun instead of like a form output — worth the extra hour to build.
- Event lockup: "HH GOA 2026" wordmark + date, always present, never editable

**Layout (mobile-first, roughly 1080×1350 — good for both X and Instagram-style crops):**
- Photo occupies the top ~60%, cropped into a shaped mask (rounded rect or a custom Goa-motif cutout, not a plain square)
- Bottom ~40% is the "badge" zone: name (large), builder title (accent color, playful), stack/role (smaller, secondary), event wordmark + hashtag pinned at the very bottom
- Generated image exported at 2x pixel density minimum so it doesn't look soft when posted

---

## 5. Visual Identity

**[ASSUMPTION — highest-priority thing to replace if you get real assets]** No official HH Goa 2026 brand kit was provided, so the default direction is:
- **Palette:** dark base (near-black or deep navy) with a warm Goa sunset gradient accent (coral → amber → magenta) — reads as "hacker house at golden hour," not generic corporate-event blue
- **Type:** a monospace or geometric-mono display face for name/title (reinforces "builder/hacker" identity), clean sans for secondary text
- **Motif:** a thin repeating wave or palm-silhouette line pattern as a border/texture element rather than literal clipart — keeps it graphic instead of "logo pasted on"
- **Frame shape:** rounded card with one signature cut corner or angled accent bar — something that reads as "this specific event's card" even with the photo cropped out, since the brief explicitly grades against "generic badge with a logo pasted on"

Before you build, if you can get even 10 minutes of the actual event branding (colors, a wordmark, an Instagram post from the organizers), that should override this section entirely — it's the single biggest "on-brand vs. generic" lever.

---

## 6. Technical Architecture

**[ASSUMPTION]** Stack: **Next.js (App Router) + TypeScript, deployed on Vercel** — matches your past project patterns, gives you API routes and OG image generation in one framework, and deploys in minutes.

**Image compositing:** Client-side, via the **Canvas API**. Draw the frame/card template (SVG or PNG layers) + the user's photo + text fields onto a `<canvas>`, then export via `canvas.toBlob()`. This is what makes the "few seconds, not a loading screen" requirement trivial — there's no server round-trip for the render itself.

**HEIC support:** Browsers can't decode HEIC natively. Use `heic2any` (client-side WASM) to convert to JPEG immediately on file select, before it ever touches the canvas.

**The one piece that *does* need a backend — the share-link OG image:**
X's crawler needs a static public image URL to generate a link preview; it can't screenshot a client-side canvas. So:
1. On "Share to X," POST the final composited PNG (as a blob) to an API route.
2. Store it (Vercel Blob storage — public read, no auth needed, cheap/free at hackathon scale) and get back a short ID.
3. That ID resolves to `/share/[id]`, a lightweight page whose `<meta property="og:image">` points at the stored PNG, with a human-friendly redirect/display too.
4. The X intent URL then points at `yourdomain.com/share/[id]`, not at your homepage — this is the step teams most often skip, and it's explicitly called out in the brief.

**X share URL construction:**
```
https://twitter.com/intent/tweet?text=<caption>&url=<yourdomain.com/share/id>&hashtags=FrameInGoa
```
**[ASSUMPTION]** Caption default: *"Just built my HH Goa 2026 builder card 🛠️🌊 #FrameInGoa"* — dynamic enough to feel personal without needing you to write per-user copy. Happy to draft 2–3 alt versions if you want to A/B the vibe.

**No database needed** beyond the blob store + an ID→file mapping (can literally be the blob's own key). No user accounts, no persistence of personal data beyond the generated image itself.

---

## 7. Non-Functional Requirements

- **Performance:** first render on 4G ≤ 2s after photo select; canvas re-render on field edits should feel instant (<100ms), so debounce text inputs lightly rather than re-rendering per keystroke if perf dips
- **File limits:** accept jpg/png/HEIC up to 20MB; reject gracefully with a clear message otherwise (never a silent failure)
- **Aspect ratios:** the crop step must handle ultra-wide and portrait photos without letterboxing weirdness — enforce a fixed output crop ratio and let the user pan/zoom to fit, don't try to auto-adapt the frame shape per photo
- **Mobile:** touch-drag for repositioning, no hover-dependent UI, buttons large enough for thumb tap, works in Safari iOS specifically (that's where most HEIC uploads come from)
- **Error states:** corrupt file, unsupported format, network failure on share-upload — all need a visible message, none should be a blank screen

---

## 8. Build Plan (7 days to deadline)

| Day | Focus |
|---|---|
| 1 | Lock visual design (frame/card art, palette, type) — even rough Figma/Canva pass |
| 2 | Canvas compositing engine: static template + photo layering, crop/zoom UI |
| 3 | Wire up form fields → live preview; HEIC conversion; download flow |
| 4 | Backend: blob storage upload, `/share/[id]` OG page, X intent wiring |
| 5 | Mobile pass: real-device testing (iOS Safari + Android Chrome), fix crop/touch bugs |
| 6 | Polish: builder-title generator, error states, loading/empty states, copy pass |
| 7 | Buffer day — deploy, test the full flow on 3+ real phones, submit early rather than at 11:59 |

---

## 9. Stretch Goals (only if Days 1–6 finish early)

- Add **Format A (PFP frame)** as a second mode — reuses the same photo-upload/crop/canvas pipeline, just swaps the template and drops the text fields
- Auto face-centering on upload (via a lightweight client-side face-detection lib) before falling back to manual drag
- 2–3 selectable frame/card color variants
- Direct-download-then-manual-attach flow as a fallback share path for users who prefer it over the link method

---

## 10. Open Items for You to Confirm

1. Real HH Goa 2026 brand assets (logo, colors, fonts) — replaces all of §5
2. Confirm Format B as primary (or tell me to flip to Format A / both)
3. Any organizer-provided caption copy or official hashtag beyond #FrameInGoa
4. Solo build or splitting frontend/backend — affects whether Days 4 and 2 can run in parallel
