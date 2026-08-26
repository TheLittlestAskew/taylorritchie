# HANDOFF — taylorritchie

> Resume / portfolio site (GitHub Pages, served at tayloraritchie.com) — index.html, resume/, tracker.html, systemhorizon/.
> Handoff is **enabled** for this repo. Every change updates the DO NEXT block below and prepends a log entry.

## ▶ DO NEXT
Review `storybook-concept.html` in the storybook-architecture draft PR. Decide whether the blue-green base with indigo and moss chapter shifts plus apricot-gold radiance should replace the current production direction, and identify any content or intensity changes before promoting the concept into `index.html`. Do not replace the live homepage without Taylor's explicit approval.

---

## Log
<!-- newest first · one entry per logical task/session · timestamp · source · changed · commit · next -->

### 2026-08-26 12:50 ET · Claude Code
- **Changed:** Banked the ten 2026-08-11 Codex entries below, which had been sitting **uncommitted in the working tree for 15 days**. Nothing was rewritten — the entries are Codex's, preserved verbatim; this entry only supplies the commit SHA they never got. Staged and committed the Chapter I parallax scene (5 referenced plates), the cabin-cutout cover (`cover-frame-v1.svg` + `chapter-one-cover-v1.png`), `hero-house-v2.webp`, `fonts/Monthoers.ttf`, and the `storybook-concept.html` changes (+83/−43).
- **Excluded on purpose:** the four `*-keyed-v2.png` chroma-key intermediates. Verified by grep that **no HTML/CSS/JS references them**, and Codex's own entry calls them temporary review copies. They remain on disk; added a `.gitignore` rule so they stop showing as untracked. Restore with `git add -f` if they turn out to matter.
- **Commit:** `1464c28`
- **Next:** Unchanged. See the block above this log.
- **Watch out:** ⚠️ **`fonts/Monthoers.ttf` is now committed to a public repo.** It is genuinely referenced by the cover `@font-face`, so the page needs it, but Monthoers is a commercial typeface and redistributing the `.ttf` in a public repo may breach its licence. Check the licence before this branch merges — removing it later means a history rewrite, not a delete. ⚠️ Also note **two clones of this repo exist**: this one (`OneDrive/.../taylorritchie-site`, branch `codex/storybook-architecture`) and `~/taylorritchie` (branch `feat/among-trees-storybook`). They will keep diverging until one is merged.

### 2026-08-11 · Codex
- **Fixed:** Reset the Chapter I overlay layers from an incorrect 112% desktop scale and expanded mobile crop to their authored full-canvas framing. All five supplied assets share a 1672×941 registration canvas, so scaling the overlays independently distorted their intended city, forest, and path proportions. The base now safely remains visible at any small parallax edges.

### 2026-08-11 · Codex
- **Changed:** Moved the Chapter I foreground-tree plate back one visual layer, behind the path/ground plate. This follows Taylor’s original-composition reference: dark trees frame the left and perimeter while the inviting trail remains the foremost readable route toward the valley and city.

### 2026-08-11 · Codex
- **Changed:** Added the approved `02-distant-atmosphere-keyed-v2.png` source to the Chapter I implementation, converted to `02-distant-atmosphere-v2.png` with alpha. Chapter I now uses every authored layer in `resume art/01_I/parallax-layout-v2` in the intended base → atmosphere → city → path → foreground order.

### 2026-08-11 · Codex
- **Changed:** Corrected the page sequence so Chapter I follows the cover immediately. The displaced Contents section now sits after the existing temporary Chapter I–III work block; it remains available while the planned field-guide/navigation treatment is built.
- **Plan alignment:** The canonical Chapter I role is `The Story Starts: Above The Trees` / Trailhead / Thesis. Its current systems-and-operations copy and Power Platform card are placeholders from the earlier prototype and must move to their planned later chapter, not remain in Chapter I.
- **Next:** Taylor supplies or approves the approximately 62-word Chapter I thesis and tagline, then Codex replaces the placeholder heading/card without inventing biographical copy.

### 2026-08-11 · Codex
- **Changed:** Replaced only Chapter I’s generic orb treatment with Taylor’s approved layered dawn-valley scene. The implemented layers are the authored sky/valley base, city, illuminated path, and transparent foreground forest, each able to parallax independently. Resume content remains stable in the verified upper-right sky well and a high-contrast evidence card.
- **Assets:** Copied the Chapter I source layers into `img/storybook/chapter-one/`; converted the magenta city/path and green forest sources to clean alpha PNGs using the built-in chroma-key helper. The keyed working-source copies are retained temporarily for review and will not be referenced by the page.
- **Next:** Taylor reviews the first implemented Chapter I scene, especially text placement, city scale, and whether the pathway gives the desired arrival from the cover. Do not change Chapter II or later chapters until Chapter I is approved.

### 2026-08-11 · Codex
- **Changed:** Added a small 0.65rem gutter between the two centered cover actions, preserving their paired placement without making them appear as one segmented control.

### 2026-08-11 · Codex
- **Changed:** Removed the threshold subtext. Centered the two threshold actions as one split control beneath the cabin cutout and retargeted `Enter the work` to Chapter I.
- **Transition intent:** The next visual unit is a scroll bridge in which the visitor appears to pass through the cabin cutout and arrives at Chapter I. The present button target establishes that navigation direction without prematurely faking the animated bridge.
- **Next:** Build the cutout-to-Chapter I scroll bridge once the Chapter I implementation replaces its current generic chapter treatment.

### 2026-08-11 · Codex
- **Changed:** Added Taylor’s supplied Monthoers typeface as a local `@font-face` and assigned it only to the cover-title treatment. Navigation and body typography retain their existing legible fonts.
- **Asset:** Copied `Monthoers.ttf` into `fonts/Monthoers.ttf`, eliminating any runtime dependency on a third-party font host for the decorative cover type.
- **Next:** Refresh the local cover and confirm the Monthoers title weight and spacing. Keep this font isolated to cover and chapter-display moments unless Taylor explicitly expands its role.

### 2026-08-11 · Codex
- **Changed:** Rebuilt the threshold as a layered cover. Chapter I’s supplied illustration now sits behind Taylor’s supplied navy cabin-frame SVG, making the landscape visible only through the temporary cabin silhouette. The hero title is split around the cutout; supporting portfolio copy and actions remain accessible beneath it.
- **Assets:** Copied the supplied `cover-frame.svg` and `chapter-I-above-the-trees-em-v1.png` into `img/storybook/cover/` as project-owned `cover-frame-v1.svg` and `chapter-one-cover-v1.png`. The existing hero-house assets are retained but no longer consumed by the threshold.
- **Next:** Inspect the cover at desktop and mobile widths. When Chapter V determines the final cabin shape, replace only `cover-frame-v1.svg`; the Chapter I layer and cover layout should remain intact.

### 2026-08-10 · Codex
- **Changed:** Corrected only the threshold hero sky. The prior bright lavender atmosphere is now a subdued rainy blue-green, pine-black, and slate-indigo sky, retaining the house, amber windows, wet path, trees, rain, negative title space, and all later story layers.
- **Asset:** Generated with the built-in image-generation tool from `hero-house-v1.webp`, then optimized to a 63 KB WebP at `img/storybook/hero-house-v2.webp`. The original asset remains in place as a recoverable prior version.
- **Tests:** Visual inspection of the generated asset (pass). Markup and full responsive audit still need to be rerun after Taylor reviews the visual change.
- **Next:** Taylor reviews the corrected sky in the first layer. If approved, run the HTML and responsive browser audits before committing.

### 2026-07-21 · Codex
- **Changed:** Rebuilt only Section 2, Contents, as the next first-person beat in the house journey. The viewer stands at the open rain-damp doorway looking into an amber foyer; a staircase and two lit interior doorways provide the visual metaphor for choosing where to go next. Live chapter navigation occupies the quiet aubergine wall on the right. No other section changed.
- **Asset:** Generated with the built-in image-generation tool using the approved house hero as the architecture, palette, lighting, and style-continuity reference. Optimized to a 58.8 KB WebP at `img/storybook/contents-entry-v1.webp`. The superseded `contents-book-v1.webp` project copy was removed; its original generation remains archived.
- **Tests:** `html-validate` (pass); responsive/reduced-motion/browser audit at 320–1920 px (pass); `git diff --check` (pass); desktop visual inspection at 1440 px (pass).
- **Next:** Taylor reviews the entering-the-house contents scene in draft PR #2. Continue one section at a time after approval.

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
