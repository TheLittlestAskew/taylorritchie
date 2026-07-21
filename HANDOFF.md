# HANDOFF — taylorritchie

> Resume / portfolio site (GitHub Pages, served at tayloraritchie.com) — index.html, resume/, tracker.html, systemhorizon/.
> Handoff is **enabled** for this repo. Every change updates the DO NEXT block below and prepends a log entry.

## ▶ DO NEXT
Review `storybook-concept.html` in the storybook-architecture draft PR. Decide whether the blue-green base with indigo and moss chapter shifts plus apricot-gold radiance should replace the current production direction, and identify any content or intensity changes before promoting the concept into `index.html`. Do not replace the live homepage without Taylor's explicit approval.

---

## Log
<!-- newest first · one entry per logical task/session · timestamp · source · changed · commit · next -->

### 2026-07-21 · Codex
- **Changed:** Reframed the approved narrative architecture beginning with the hero only: a first-person approach toward a warmly lit house in rainy woods. The composition keeps the house on the right, a wet reflected path leading toward the door, and calm dark space on the left for Taylor's name. Used Taylor's supplied palette (`#0A100E`, `#272832`, `#413251`, `#5C4077`, `#755E90`, `#B9B8E2`) with amber reserved for the windows and path reflection. No later section changed.
- **Asset:** Generated with the built-in image-generation tool from Taylor's house reference, palette reference, and the prior simplified hero as the style-density reference. Optimized to an 86.4 KB WebP at `img/storybook/hero-house-v1.webp`. The superseded `hero-forest-v3.webp` project copy was removed; its original generation remains archived.
- **Tests:** `html-validate` (pass); responsive/reduced-motion/browser audit at 320–1920 px (pass); `git diff --check` (pass); desktop visual inspection at 1440 px (pass).
- **Next:** Taylor reviews the house approach hero in draft PR #2. Continue the journey one section at a time only after hero approval.

### 2026-07-21 · Codex
- **Changed:** Redesigned only the contents section as the second approved section-by-section pass. Recreated Taylor's reference composition with a simplified illustrated open book and broad ribbons of light on the left, plus a quiet ochre field containing live, clickable chapter navigation on the right. The book is an object inside the scene; there is no site-wide page frame or center crease. All later sections remain unchanged.
- **Asset:** Generated with the built-in image-generation tool using Taylor's book-spread reference plus the approved simplified hero as the style-density reference. Optimized to a 50.4 KB WebP at `img/storybook/contents-book-v1.webp`.
- **Tests:** `html-validate` (pass); responsive/reduced-motion/browser audit at 320–1920 px (pass); `git diff --check` (pass); desktop visual inspection at 1440 px (pass).
- **Next:** Taylor reviews the contents composition in draft PR #2. If approved, choose the next single section. Do not redesign later sections as a batch.

### 2026-07-21 · Codex
- **Changed:** Simplified only the storybook hero illustration after Taylor found the prior landscape too busy. The replacement uses broad pine silhouettes, a few atmospheric depth planes, one cyan clearing, and sparse peach-gold grasses. Removed the owl, path, dense foliage, and micro-texture. All later sections remain unchanged.
- **Asset:** Generated with the built-in image-generation tool from Taylor's three simplified forest references and optimized to a 55.9 KB WebP at `img/storybook/hero-forest-v3.webp`. Replaced the superseded project copy of `hero-forest-v2.webp`; its original generation remains in Codex's generated-images archive.
- **Next:** Taylor reviews the simplified hero in draft PR #2. Continue section-by-section only after hero approval.

### 2026-07-21 · Codex
- **Changed:** Revised only the storybook prototype hero after Taylor requested a section-by-section process. Replaced the original threshold scene with a new full-bleed Contemporary Editorial Storybook Illustration forest landscape, composed with quiet left-side space for the title and a radiant path plus owl focal point drawing the eye deeper. Removed the uncommitted chapter-spread experiments so all sections below the hero remain at the previous draft state.
- **Asset:** Generated with the built-in image-generation tool from Taylor's forest reference and optimized to a 209.9 KB WebP at `img/storybook/hero-forest-v2.webp`.
- **Tests:** `html-validate` (pass); responsive/reduced-motion/browser audit at 320–1920 px (pass); `git diff --check` (pass); desktop visual inspection at 1440 px (pass).
- **Next:** Taylor reviews the hero composition in draft PR #2. If approved, choose the next single section to redesign. Do not redesign the remaining sections as a batch.

### 2026-07-20 · Codex
- **Changed:** Created a standalone storybook-architecture prototype on `codex/storybook-architecture`. Added a semi-monochromatic radiant palette that deepens through blue-green, indigo, and moss chapters with apricot-gold contrast; an original threshold illustration; chapter-based evidence cards; a dedicated creative-systems section connecting D&D work to professional systems practice; restrained GSAP ScrollTrigger parallax on desktop; and a static reduced-motion experience. The live `index.html` is unchanged.
- **Asset:** Generated an original editorial watercolor/cut-paper threshold scene with the built-in image-generation tool, then optimized it from a 2.8 MB PNG to a 287.9 KB WebP at `img/storybook/threshold-radiance.webp`.
- **Tests:** `npx --yes html-validate storybook-concept.html` (pass); `node tests/storybook-audit.mjs http://127.0.0.1:4173/storybook-concept.html` (pass at 320, 375, 480, 768, 1024, 1280, 1440, and 1920 px; local links, IDs, one `h1`, alt text, disputed-metric absence, mobile navigation, anchor behavior, horizontal scrolling, reduced-motion transforms, desktop parallax activation, and browser console errors); `git diff --check` (pass); visual inspection at 320 and 1440 px (pass).
- **Unresolved:** Taylor must choose whether the chapter-to-chapter hue changes feel cohesive and whether this concept should replace the live homepage.
- **Next:** Review the draft prototype. If approved, promote it into `index.html`, reconnect the fuller work archive, rerun production validation, and merge only with explicit approval.

### 2026-07-20 · Codex
- **Changed:** Taylor explicitly approved merging PR #1. Updated the return point from pre-merge review to post-merge GitHub Pages verification.
- **Commit:** `docs: set post-merge deployment return point`
- **Tests:** No source changes; the production implementation remains covered by the validation recorded below.
- **Unresolved:** GitHub Pages deployment must finish before the live URL can be verified.
- **Next:** Merge PR #1, then verify the homepage, résumé, and SystemHorizon production routes.

### 2026-07-20 · Codex
- **Changed:** Promoted the approved editorial prototype into `index.html`; removed the superseded root-level concept copy; added production navigation, SEO/Open Graph metadata, `ProfilePage` structured data, keyboard focus treatment, reduced-motion behavior, and mobile navigation; rewrote featured work as evidence-led cases; added a native-details secondary archive using representative existing assets; preserved the `systemhorizon/`, tracker, portfolio document, and image routes; and added the current Business Systems & CRM Operations résumé at the canonical public path `resume/TaylorRitchie_Resume.pdf`.
- **Content:** Used `706-767-7196` from `TaylorRitchie_MasterResume_Source_20260720.docx`; retained the four approved homepage metrics; did not elevate the disputed Stripe metrics; used the current official title and privacy language; and linked the verified canonical LinkedIn profile URL.
- **Commit:** `585aa89` (`feat: promote editorial redesign to production homepage`)
- **Tests:** `npx --yes html-validate index.html` (pass); `node tests/site-audit.mjs http://127.0.0.1:4173/` (pass at 320, 375, 480, 768, 1024, 1280, 1440, and 1920 px; local links, duplicate IDs, one `h1`, alt text, disputed-metric absence, navigation, archive control, anchor behavior, horizontal scrolling, and browser console errors); `git diff --check` (pass); visual inspection of the current two-page résumé render and 320/1440 homepage screenshots (pass).
- **Unresolved:** Human review is still required for final visual preference and authorization to merge. No production deployment or merge was performed.
- **Next:** Review PR #1, confirm final visuals, and merge to `main` when approved.

### 2026-07-20 · ChatGPT
- **Changed:** Created `feat/romeo-juliet-resume-redesign` and added a complete responsive single-page concept in `romeo-juliet-concept.html`. The concept includes the cinematic name-card hero, broadcast-style About section, impact metric strip, chapter-card experience, editorial portfolio grid, theatrical playbill capabilities section, and `FIN.` contact close. Content is grounded in the current resume and professional portfolio while avoiding the disputed Stripe migration metric.
- **Commit:** `b35e590`
- **Next:** Review the concept, revise the art direction/content, then promote the approved design into `index.html` and reconnect the complete portfolio assets.

### 2026-06-28 12:58 ET · Claude chat
- **Changed:** Merged the SystemHorizon control panel into `systemhorizon/` (sub-route of tayloraritchie.com) via git subtree --squash; dropped stale meridian-keystone.html and the nested handoff.
- **Commit:** `2bc88ba`
- **Next:** Repoint the systemhorizon-build skill; archive the old SystemHorizon repo.

### 2026-06-23 09:37 ET · Claude chat
- **Changed:** Enabled repo handoff — added this `HANDOFF.md` at root.
- **Commit:** `docs: enable repo handoff`
- **Next:** Set by the next real change to the repo.
