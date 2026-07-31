# HANDOFF — taylorritchie

> Resume / portfolio site (GitHub Pages, served at tayloraritchie.com) — index.html, resume/, tracker.html, systemhorizon/.
> Handoff is **enabled** for this repo. Every change updates the DO NEXT block below and prepends a log entry.

## ▶ DO NEXT
🟢 **Phase 0 is COMPLETE (`5d46f2b`). Next is Phase 1 — audit the existing art under LDH.**

**`delegation-ledger.md` is the live state of the storybook run; this file is the pointer.** Read the ledger first: it carries the phase table, the 0.2 environment results, the earned gotchas, and the open-risk list. If the session dies mid-run, resume from the ledger, not from zero.

**Phase 1 (Sonnet, Opus on disputes) — three tasks:**
1. Run `check_palette.py` + the LDH QA checklist against every existing chapter image → verdict **keep / grade / regenerate** each (colour = grade; composition, depth ladder, firefly placement = regenerate).
2. Re-measure kept/graded images with `measure_well.py --target` from each `spec.json`.
3. Write the regeneration queue into the ledger.

⚠️ **Chapter I's `status: verified` is stale on two independent counts** and must be re-earned: it was verified 2026-07-30 under the **retired golden-hour** ruling, one day before LDH became law; and copy deck v2.1 grew its payload to thesis + tagline ≈ 62 words, so its 11.68:1 / 40% / 56% numbers were measured against shorter text. Only **2 of 15** `spec.json` files exist (`01_I`, `02_II`) — Phase 2.1 writes the other 13.

**Read BOTH goal documents.** `Goal_Amendment_TwoPath_Cover.md` is **authority level 0** and overrides `SlashGoal_AmongTrees_Ship.md` wherever they conflict. Both are in `…\Septentrion\Constellations\Resume Site\`. The amendment was previously orphaned — the ralph invocation named only the goal file, so an autonomous run would have silently skipped the two-path cover, the interstitial, and the Resume Spread Page. That is fixed; keep it that way.

**Ruling on Phase 2.2 voice — decided, do not re-litigate:** chapter copy uses `tayls-voice` **Mode 1 (Personal Voice, professional end)**. Mode 3 (Fiction) is not used. Write the ruling into each `spec.json` copy block so all 14 chapters resolve it identically. Chapters II–XI are resume content **verbatim** — do not re-voice them.

**Correction to the 2026-07-31 entry below: the handoff guard was never actually suspended.** `.git\claude-handoff-skip` is present and 0 bytes, but a blank file does **not** skip. `Get-Content -Raw` returns `$null` on a 0-byte file, `.Trim()` throws, and the `catch` returns `$false` — so `Test-SkipRequested` reports *not skipped*, the opposite of what line 143's comment intends. Verified empirically 2026-07-31. The guard has been live the whole time and correctly caught this session's work. The file is inert and misleading; **delete it in Phase 7 before the merge** as planned, but it is housekeeping now, not a live risk.

- All storybook work belongs on `feat/among-trees-storybook`. `main` must stay untouched mid-build.
- The public contact number is `706-767-7196` (July 20, 2026 master résumé source).
- 🛑 Root `index.html` is a **throwaway placeholder**. Phase 5 must overwrite it with the storybook Cover. If it reaches production, the build shipped incomplete.

---

## Log
<!-- newest first · one entry per logical task/session · timestamp · source · changed · commit · next -->

### 2026-07-31 17:45 ET · Claude Code
- **Changed:** Integrated `Goal_Amendment_TwoPath_Cover.md` into the ship goal as authority level 0 and completed **Phase 0** of the Among Trees storybook run. The amendment was **orphaned**: the ralph invocation named only `SlashGoal_AmongTrees_Ship.md`, so an autonomous run would have built the whole site while silently ignoring the two-path cover, the scenic-route interstitial, and the Resume Spread Page. Resolved three conflicts that would each have deadlocked a worker mid-run: `/resume/` was listed do-not-touch while amendment §B builds a page there (now an explicit carve-out — new `index.html` permitted, every pre-existing file byte-identical, Phase 6 gate 7 amended to match); §D cited a "copy deck v2.1" that existed only as a file headed `v2` (renumbered in place, content already matched); and §A1 reads cover `spec.json` well data that does not exist yet (now task 5.4b, instructed to **block rather than guess** coordinates). Added Phase 5.10/5.10b, tasks 2.1b/2.2b, and Phase 6 gates 9–11. Then ran Phase 0: live deploy verified (4/4 routes 200, deployed PDF byte-identical to local at 297,670 B), environment verified, `/classic/` archive created, `art/ js/ css/` scaffolded, `.claude/commands/spread-loop.md` written against the **real** verso script signatures rather than invented ones, and `delegation-ledger.md` created as the run's live state.
- **Commit:** `5d46f2b` (+ `efd2393` recording its sha in the ledger)
- **Friction:** gen-fail — the nanobanana Phase 0.2 smoke test failed with `No image returned from model` at the exact production config (`pro`/`21:9`). Six isolation runs found the cause: a **trailing meta-instruction** (`"Test image only."`) makes the model return no image and no error. Deterministic, reproduced twice. LDH vocabulary was the real suspect and is **cleared** — "deep indigo", "luminous", "chromatic mist" all generate fine; the identical prompt succeeds with that one sentence removed. Production prompts come from `compile_prompt.py`/`compile_dawn.py`, which emit pure scene prose, so the pipeline is unaffected. Written into `spread-loop.md` §2 because the trap is a worker hand-writing a quick test, getting silence, and misdiagnosing it as a dead API key.
- **Friction:** misread — reported to Taylor that the handoff guard was "suppressed in every session" and that the repo was "silent about unbanked work". Both wrong. I took the previous entry's claim at face value instead of reading `handoff-guard.ps1`. A **blank** skip file does not skip: `Get-Content -Raw` returns `$null` on a 0-byte file, `.Trim()` throws, and the `catch` returns `$false`. Verified empirically. Read the hook, don't trust a prior entry's description of it.
- **Friction:** gen-fail — a stray Gujarati character (`ન`) landed inside a CSS block while editing `classic/index.html`, producing an invalid rule. Caught on the next read and fixed before commit; `html-validate` clean afterwards. Worth a glance at edited CSS blocks rather than assuming the diff is what was intended.
- **Next:** Phase 1 — audit existing art under LDH. See the DO NEXT block above.
- **Watch out:** Three traps recorded in the ledger. (1) A naive Playwright asset check on `/classic/` reports **all 8 images broken** — a false positive. They are `loading="lazy"` inside the page's single collapsed `<details>`, so the browser never requests them; that is why the run shows 8 "broken" images alongside **zero** HTTP ≥400. All 8 return 200 on direct fetch and load 8/8 once `<details>` is expanded. Phase 6 must expand it first. (2) `<base href="/">` is not an option for the archived page — it has 7 in-page fragment anchors including the `#main` skip link, so 20 asset refs were rewritten to root-absolute instead. (3) `rembg` is absent, which removes Phase 4's extraction path; transparent generation still works. Process note: commits `5d46f2b` and `efd2393` were pushed **without** the mandatory `NEXT:` line. Not amended — a pushed message is frozen by contract; corrected here instead.

### 2026-07-31 · Claude Code
- **Changed:** Among Trees storybook run in flight; live state is `delegation-ledger.md`; handoff guard suspended via `.git\claude-handoff-skip` for the duration. Recorded the Phase 2.2 voice ruling: `tayls-voice` Mode 1 (Personal Voice, professional end) governs all chapter copy; Mode 3 is not used. This is the last banked entry before the suspension; the run itself will not write per-iteration entries, by design — a ralph iteration is not a unit of work, a phase is, and 25 bookkeeping entries would pollute the log the Septentrion dashboard parses.
- **Commit:** `fa92167`
- **Friction:** gen-fail — wrote this entry with a `<this entry's commit>` placeholder, then amended to fill in the sha, which changed the sha and left the entry citing a commit that no longer existed. Self-inflicted circular reference. The fix is to commit the entry first, read the sha, then correct it in a small follow-up commit; never amend to insert a sha into the file being committed.
- **Next:** See the DO NEXT block above. Recovery point mid-run is `delegation-ledger.md`, not this file.
- **Watch out:** The skip file is **blank**, not session-scoped. `Test-SkipRequested` in `handoff-guard.ps1` returns true unconditionally for an empty file (`if (-not $held) { return $true }`) and only compares ids when the file has content — so the session-id form would have died on the session restart that `ralph-loop` registration requires. Blank was the only form that covers the run, and the cost is that this repo is silent about unbanked work in **every** session until the file is deleted. Phase 7 must delete it before the merge. A companion `.git\claude-handoff-skip.why` explains this locally for any session that finds the flag and does not have this context.

### 2026-07-31 · Claude Code
- **Changed:** Closed the last two prereqs for `SlashGoal_AmongTrees_Ship.md`. Installed the `ralph-loop` plugin (via `claude plugin install`, scope user) and `jq` 1.8.2 via scoop — ralph's Stop hook calls `jq` under `set -euo pipefail`, so with `jq` absent it died at exit 127 instead of the exit 2 that blocks a turn, meaning the loop would have silently never looped. Installed the `tayls-voice` skill from its bundle. Added `audio/night-loop.{ogg,mp3}` (96 s, 714 KB / 1.1 MB) plus `audio/CREDITS.md` carrying the mandatory Pixabay attribution HTML.
- **Commit:** `0d0141a`
- **Friction:** re-run — `/plugin install ralph-loop@claude-plugins-official` was sent twice and both times arrived as chat text rather than executing; the CLI does not intercept the argument form of `/plugin`. The shell subcommand `claude plugin install ralph-loop@claude-plugins-official` worked first try. Use the shell form, or bare `/plugin` for the interactive picker.
- **Next:** See the DO NEXT block above — restart the session, then two launch decisions.
- **Watch out:** The supplied audio was **not loop-safe**: fade-in over the first ~5 s and a fade-out at the tail (−49.4 dB at t=0, −45.7 dB at t=140 s, against a −33 dB body), so a raw loop dips to near-silence every pass. Fixed by trimming to body `[6 s,106 s]`, swapping the halves at the midpoint and crossfading 4 s, which makes the loop point an interior moment of the recording. Seam verified under 0.6 dB variation. Separately: the source filename contains `traffic` and faint road noise may be in the bed — needs a listen on speakers before ship, and replacement rather than filtering if it reads wrong.

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
