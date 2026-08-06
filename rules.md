# rules.md — Build Rules

Hard constraints for this project. If a task seems to require breaking one of these, stop and flag it rather than quietly doing it — these exist because of the hackathon deadline and the brief's explicit requirements, not arbitrary preference.

## Do not

- **Do not add authentication, accounts, or a login wall anywhere.** The brief explicitly grades this down. No "sign in to download," no session-gated share.
- **Do not add a full database.** The only persistence needed is: composited PNG → blob storage → short ID. Don't reach for Postgres/Mongo/an ORM for that — it's one storage call and one lookup.
- **Do not turn the flow into a multi-page wizard with reloads.** Upload → crop → fields → preview must live on one screen (scroll is fine, navigation is not). Test this by checking there's no `router.push` between steps 2–5 of the flow in PRD.md §3.
- **Do not skip the `/share/[id]` OG page** and point the X intent straight at the homepage. This is the single most-likely-to-be-skipped requirement in the brief — the link preview must show the *actual generated graphic*, not the site's default thumbnail.
- **Do not over-engineer for scale.** This is a hackathon submission, not production infra. No caching layers, no queues, no retry frameworks. Blob storage growing unbounded is fine for now — note it as a known limitation, don't build cleanup infra unless there's spare time on Day 7.
- **Do not silently change an architecture decision from PRD.md** (stack, client-vs-server compositing, storage choice). If you think a decision should change, say so and why before doing it.

## Must

- **Must work on iOS Safari specifically** — most HEIC uploads and most judges' phones will be here. Test on it, not just Chrome DevTools' mobile emulator.
- **Must handle the upload → crop → download loop in under 2 seconds** on a throttled connection. If a change makes this slower, that's a regression worth flagging even if the feature "works."
- **Must show a visible error state** for: corrupt file, unsupported format, oversized file (>20MB), failed share-upload. Never fail silently or blank-screen.
- **Must treat `design-tokens.md` values as placeholders** — they're a real, usable design, not a TODO stub, but if the user provides actual HH Goa 2026 brand assets, those take priority and this file should be updated to match, not layered on top of.
- **Must update `CLAUDE.md`'s "Current status" section** at the end of a work session so the next session has accurate state.
- **Must update the `README.md`** whenever a new feature is added, modified, or removed, to accurately reflect current capabilities, stack, and setup instructions.

## Definition of done (per feature, before moving on)

1. Works on a real phone (not just desktop devtools), portrait orientation
2. Handles a genuinely awkward input (a wide landscape photo, a HEIC file, an empty name field) without breaking
3. `npm run build` passes clean
4. No console errors in the browser on the happy path
5. If it touches the share flow: the `/share/[id]` page's OG image was actually verified (a Twitter Card validator or equivalent — don't just trust the meta tag is there, confirm the image resolves)

## Priority order if time runs short (Day 6–7 crunch)

1. Core flow (upload → composite → download) must work perfectly — this alone satisfies most of the grading criteria
2. Share-to-X with working OG preview — second priority, explicitly required
3. Builder-title generator, polish, error copy — cut these before cutting 1 or 2
4. Format A / stretch goals from PRD.md §9 — cut entirely if behind schedule
