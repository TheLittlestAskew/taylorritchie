# HANDOFF — taylorritchie

> Resume / portfolio site (GitHub Pages, served at tayloraritchie.com) — index.html, resume/, tracker.html, systemhorizon/.
> Handoff is **enabled** for this repo. Every change updates the DO NEXT block below and prepends a log entry.

## ▶ DO NEXT
Review `storybook-concept.html` in the storybook-architecture draft PR. Decide whether the blue-green base with indigo and moss chapter shifts plus apricot-gold radiance should replace the current production direction, and identify any content or intensity changes before promoting the concept into `index.html`. Do not replace the live homepage without Taylor's explicit approval.

---

## Log
<!-- newest first · one entry per logical task/session · timestamp · source · changed · commit · next -->

### 2026-08-29 00:13 ET · Codex
- **Changed:** Added a tracker-ready intake for the confirmed ProgressNow application. This repository is public-facing, so it intentionally excludes Taylor's home address, personal contact information, and reference contact information. Do not create a duplicate: update existing `public.job_applications` row `190fe9fe-40a3-4e64-8b71-09a14367d3a1` only after an exact `ProgressNow` + `Operations Coordinator` match.
- **Commit:** `f33d4cd`
- **Tracker update:** Set `status` to `Applied`; retain existing verified posting data; set `submission_date` only to the confirmed local date `2026-08-29` (the exact TriNet submission time was not captured, so do not invent one); set `last_update` to the actual update time; preserve the established `post_url`, `org_url`, source evidence, requirements, skills match/gap, and DOL contact limitation. Add a compact note: `Applied via TriNet on 2026-08-29; TriNet confirmation: Your application has been successfully submitted.`
- **Verified posting:** Operations Coordinator | ProgressNow | full-time | remote anywhere in the United States | associated location Washington, DC | 15% travel | $55,000/year | Idealist listing published 2026-08-22 (seen 2026-08-23). Source listing: `https://www.idealist.org/en/job/c47645555a3e40afbad09703dd8a12de-operations-coordinator-progressnow-washington`; employer site: `https://progressnow.org/`; submitted through `https://app.trinethire.com/companies/242386-progressnow/jobs/122945-operations-coordinator`.
- **Materials and form facts:** Uploaded `TaylorRitchie_Resume_OperationsProgramAdministration_20260720.docx`; pasted a tailored cover letter (no cover-letter file); completed the nonprofit-compliance, accounting/software, salary, remote-work, East Coast-hours, location, source, and rowing-coach questions; listed Idealist as source. The application explicitly says the submitted materials will be retained and Taylor will be notified if she is a good fit.
- **DOL/employer contacts:** ProgressNow's official contact page is `https://progressnow.org/contact/` and exposes a contact form only. No public employer phone, street address, named contact, or contact email was verified. Do not fabricate or backfill these fields; do not create a DOL activity from this record unless later evidence supplies the required contact information.
- **Next:** Unchanged. See the block above this log.

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

> Older entries archived to handoff-archive/2026-07.md and handoff-archive/2026-06.md
