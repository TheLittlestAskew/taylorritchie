# HANDOFF — taylorritchie

> Resume / portfolio site (GitHub Pages, served at tayloraritchie.com) — index.html, resume/, tracker.html, systemhorizon/.
> Handoff is **enabled** for this repo. Every change updates the DO NEXT block below and prepends a log entry.

## ▶ DO NEXT
When Taylor is ready to relaunch the portfolio, replace the temporary maintenance page in `index.html` with the approved redesign (already built and merged once in PR #1 — check git history for `585aa89` before rebuilding from scratch), then validate and deploy it. The temporary page intentionally retains email, LinkedIn, and résumé access for recruiters. **No action needed here until Taylor says go** — confirmed 2026-08-28, she's still actively working the design and wants the maintenance page to stay up.

`systemhorizon/` is now a dead redirect stub only (see log below) — SystemHorizon itself lives at `sh.tayloraritchie.com`, a separate GitHub Pages deploy out of `TheLittlestAskew/SystemHorizon`, gated by Cloudflare Access. Nothing in this repo talks to Supabase anymore.

---

## Log
<!-- newest first · one entry per logical task/session · timestamp · source · changed · commit · next -->

### 2026-09-05 · Claude Code (🛑 HIPAA claim was live on the public site repo — removed from `main`)
- **Changed:** `resume/TaylorRitchie_MasterResume.md`, two lines. This file sits on `main` in a **public** repo served by GitHub Pages, so the claim was publicly readable at `github.com/TheLittlestAskew/taylorritchie` and reachable as a raw path under `tayloraritchie.com`. It is not referenced by any site HTML/JS, so it never rendered on the homepage — but "unlinked" is not "unpublished."
  - Skills line: `HIPAA-adjacent operating standards` → `confidentiality, segmentation & access controls`.
  - Experience bullet: `enabling the organization to operate close to HIPAA standards` → `enforcing confidentiality and role-based access controls`. The achievement (privacy-segmented architecture, no enterprise licensing) is unchanged; only the regulatory claim is gone.
  - Wording follows the master resume's own guardrail: *"Use 'served as Privacy Officer' and describe confidentiality, segmentation, and access controls. Do not claim HIPAA compliance or use 'near-HIPAA.'"*
- **Commit:** `ab26de9`
- **Next:** Unchanged. See the block above this log — the maintenance page stays up until Taylor says go.
- **Watch out:** 🛑 **`resume/TaylorRitchie_Resume_OpsAndSystems.pdf` on `main` still contains the claim, twice**, and a PDF cannot be text-edited — it has to be regenerated through the `.docx` build pipeline in `Septentrion\JobSearch\Resume & Job Hunting\`. That PDF is a **downloadable deliverable**, so it is the higher-exposure copy of the two. `TaylorRitchie_Resume.pdf` and `TaylorRitchie_Resume_GrantsAdmin.pdf` are clean; so are all three `resume/variants/*.md`. ⚠️ `feat/among-trees-storybook` carries the same two lines in its copy of this file and will reintroduce them on merge unless fixed there too. ⚠️ **Do not "fix" the HIPAA strings in `build_*.py`** — there they are forbidden-claim guardrails doing their job, and deleting them removes the check.


### 2026-08-28 · Claude chat
- **Changed:** Found and closed a live data leak: `systemhorizon/index.html` was a June 2026 snapshot of the old single-file SH build, still fully unauthenticated, hitting a Supabase project directly with an embedded anon key and RLS disabled — anyone with the URL could read and write tasks, pain log, and Career/job-search data. It was never linked from the maintenance-page homepage, so exposure was via guessable URL only, but it was genuinely live. No delete permission on this repo (integration returned 403 on tree creation), so replaced the file in place with a meta-refresh redirect stub pointing to `sh.tayloraritchie.com` — same URL now sends any old bookmark to the real, auth-gated app instead of leaking data.
  - This was found while doing the real fix: SystemHorizon is being moved off the default GitHub Pages URL onto `sh.tayloraritchie.com`, gated by Cloudflare Access, decoupled from this repo entirely (see `TheLittlestAskew/SystemHorizon` HANDOFF for the other half of this work). The `systemhorizon/` subtree merge from 2026-06-28 is now fully superseded.
- **Commit:** `0dcfa64`
- **Tests:** None — this is a static redirect page, verified by reading the committed content back.
- **Next:** See DO NEXT above. Once `sh.tayloraritchie.com` is confirmed live (Tayls-only Cloudflare dashboard steps, tracked in the SystemHorizon repo's HANDOFF), `systemhorizon/` in this repo could be deleted entirely rather than kept as a redirect stub — low priority, not blocking anything.

### 2026-08-24 · Codex
- **Changed:** Replaced the public homepage with Taylor's supplied illustrated maintenance page. The image remains fully visible at every viewport size, and a compact accessible dock retains verified email, LinkedIn, and résumé links.
- **Commit:** `d3ae463` (`feat: add illustrated maintenance page`)
- **Tests:** `npx --yes html-validate index.html` (pass); verified `img/maintenance-page.png` and `resume/TaylorRitchie_Resume.pdf` exist; `git diff --check` (pass).
- **Next:** Relaunch the full portfolio only after Taylor approves its redesign.

### 2026-07-26 22:52 ET · Claude Code
- **Changed:** Added `systemhorizon/PROJECTS_CONTENT_SPEC.md` — reconciled all claude.ai Projects + the documented portfolio into per-project page/dashboard content for the SystemHorizon `projects` view, plus a schema extension and display-pattern library. Also built a `septentrion-sync` → Supabase heartbeat (script + wrapper hook live in `~/.claude/skills/septentrion-sync/`, outside this repo) that auto-stamps project status.
- **Commit:** `747c322`
- **Next:** Unchanged. See the block above this log.
- **Watch out:** The heartbeat needs 5 columns added to the `projects` table (SQL in spec §7) before it can write; until then it self-reports "NOT PUSHED — missing columns" and is harmless.

### 2026-07-26 11:44 ET · Claude Code
- **Changed:** Added the Handoff Contract to `AGENTS.md` so Codex follows it. Codex reads `AGENTS.md`, never `~/.claude/skills/`, so it had no handoff instructions at all before this.
- **Commit:** `4d70829`
- **Next:** Unchanged. See the block above this log.
- **Watch out:** Log entries must now carry a tool label (`Claude Code` / `Claude desktop` / `Codex` / `ChatGPT`). Do not restructure this file; the dashboard parses it.

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
