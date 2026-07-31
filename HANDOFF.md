# HANDOFF — taylorritchie

> Resume / portfolio site (GitHub Pages, served at tayloraritchie.com) — index.html, resume/, tracker.html, systemhorizon/.
> Handoff is **enabled** for this repo. Every change updates the DO NEXT block below and prepends a log entry.

## ▶ DO NEXT
Clear the two remaining human blockers on `SlashGoal_AmongTrees_Ship.md` before the delegation run can start: (1) install the run-persistence plugin — `/plugin install ralph-loop@claude-plugins-official` (it exists in the local marketplace clone but is NOT installed, so no `/ralph-loop` command resolves); (2) decide what `tayls-voice` is — the plan names it as the authority for all narrative chapter copy in Phase 2.2, but it does not exist anywhere in `~/.claude` or the Septentrion vault. Then run Phase 0.1: verify the GitHub Pages deployment from merged PR #1 at `https://tayloraritchie.com/` (homepage, résumé download, `systemhorizon/` subroute) — still the plan's first task. The current public contact number is `706-767-7196`, resolved from the July 20, 2026 master résumé source.
- Prereq for the whole run: source the CC0 ambient night-audio loop to `audio/night-loop.{ogg,mp3}`. Claude cannot generate or license audio.
- All storybook work belongs on `feat/among-trees-storybook`. `main` must stay untouched mid-build.

---

## Log
<!-- newest first · one entry per logical task/session · timestamp · source · changed · commit · next -->

### 2026-07-31 · Claude Code
- **Changed:** Preflight for `SlashGoal_AmongTrees_Ship.md` (the Among Trees storybook ship goal). Created `feat/among-trees-storybook`; added the repo's first `.gitignore`; added `package.json` + lockfile with `playwright`, `@axe-core/playwright`, and `sharp-cli@5.2.0` so the Phase 6 gates resolve tooling from the repo instead of a machine-global install. Outside this repo: installed three missing skills into `~/.claude/skills` — `luminous-dawn-haze` (the plan's #1 authority, incl. `scripts/compile_dawn.py`), `cynosure`, and `delegation-protocol` (its 4 worker agents were already in `.claude/agents`). Verified the Playwright+axe toolchain end-to-end against a page with a seeded missing `alt` and 1.9:1 text; axe caught both (`image-alt[critical]`, `color-contrast[serious]`), screenshots and console capture work.
- **Commit:** `f888e94`
- **Friction:** misread — reported `compile_dawn.py` as "does not exist anywhere on your machine" and called it a hard blocker; the search only walked extracted directories and never looked inside the uninstalled `.skill` bundles, which are plain zips. It was in `luminous-dawn-haze.skill` the whole time. Extracting bundles to a temp dir before declaring anything missing is the fix.
- **Friction:** gen-fail — the first axe smoke test threw `Error: Please use browser.newContext()`. `@axe-core/playwright` rejects a page created by `browser.newPage()`; it requires an explicit `browser.newContext()` first. Worked immediately once the context was created.
- **Next:** See the DO NEXT block above — two human blockers (ralph-loop plugin, tayls-voice) before Phase 0.
- **Watch out:** `npm audit` reports 3 high-sev findings in this repo (`sharp@0.34.2` libvips CVEs, `glob@11.0.3` CLI command injection). Do NOT run `npm audit fix` — `sharp-cli@5.2.0` is the latest published and npm's proposed "fix" is a semver-major *downgrade* to 4.2.0. Closing the libvips CVEs would need an npm `overrides` pin to `sharp@^0.35.0`, untested against sharp-cli 5. Separately, `tests/site-audit.mjs` still imports Playwright through a hardcoded absolute path into a Codex runtime cache (`C:/Users/theli/.cache/codex-runtimes/...`); now that Playwright is a real repo dependency that line should become `import { chromium } from 'playwright'`.

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
