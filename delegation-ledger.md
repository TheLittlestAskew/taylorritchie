# Delegation Ledger — Among Trees Storybook Ship

> **This file is the live state of the run.** `HANDOFF.md` is deliberately frozen for the
> duration and does not track per-iteration progress. If the session dies, resume from
> here, not from zero.
>
> **Goal:** `SlashGoal_AmongTrees_Ship.md` **+** `Goal_Amendment_TwoPath_Cover.md`
> (the amendment is authority level 0 and overrides the goal wherever they conflict).
> Both live in `…\Septentrion\Constellations\Resume Site\`.
>
> **Branch:** `feat/among-trees-storybook` · `main` and the live site stay untouched mid-build.

**Status:** Phase 0 complete. Phase 1 not started.
**Last updated:** 2026-07-31 · Claude Code

---

## Status key
`TODO` · `IN PROGRESS` · `DONE` · `BLOCKED` · `N/A`

---

## Phase 0 — Preflight & branch

| # | Task | Tier | Status | Evidence |
|---|---|---|---|---|
| 0.1 | Verify live PR #1 deploy | Haiku | **DONE** | 4/4 routes 200: `/` (49,516 B), `/resume/TaylorRitchie_Resume.pdf` (297,670 B), `/systemhorizon/` (257,969 B), `/tracker.html` (68,962 B). PDF byte-count matches the local file exactly — deployed artifact confirmed identical to repo. |
| 0.2 | Verify environment | Haiku | **DONE** | See checklist below. One optional dep missing (`rembg`), no blockers. |
| 0.3 | Branch + scaffold + `/classic/` move | Haiku | **DONE** | See notes below. |
| 0.4 | Create this ledger | Haiku | **DONE** | This file. |

### 0.2 environment checklist

| Item | Result |
|---|---|
| Skills in `~/.claude/skills` | ✓ all 9 — luminous-dawn-haze, verso, delegation-protocol, review-animations, gsap-scrolltrigger, tayls-voice, cynosure, karpathy-guidelines, handoff |
| Worker agents | ✓ 4 in `~/.claude/agents` (haiku/sonnet/opus-executor, standards-researcher) — user scope, resolve fine; not copied into the repo |
| verso scripts | ✓ compile_prompt · measure_well · check_palette · check_edit |
| LDH compiler | ✓ `compile_dawn.py` |
| Python | ✓ pillow 12.3.0 · numpy 2.5.1 |
| Node | ✓ playwright · @axe-core/playwright · sharp-cli |
| Chromium | ✓ 3 builds present (1223/1228/1234) |
| `jq` | ✓ 1.8.2 — required by ralph's Stop hook under `set -euo pipefail` |
| ralph-loop plugin | ✓ installed (cache + marketplace + data all present) |
| nanobanana MCP | ✓ connected **and generation verified** at production config |
| `rembg` | ✗ **absent — optional.** Removes Phase 4 path (b) (extraction from an approved master). Path (a), transparent generation, still available. Install with `pip install rembg onnxruntime` if extraction is wanted. |

### 0.2 finding — nanobanana meta-instruction failure ⚠️

The smoke test **failed first**, then isolated cleanly. Recorded because it will cost a
worker real time otherwise:

| Config | Prompt | Result |
|---|---|---|
| pro · 21:9 | scene prose **+ `"Test image only."`** | ✗ *No image returned from model* |
| flash · 16:9 | scene prose | ✓ |
| pro · 16:9 | scene prose | ✓ |
| pro · 21:9 | scene prose | ✓ |
| pro · 21:9 | scene prose **+ `"Test image only."`** (repeat) | ✗ — **deterministic, not flaky** |
| pro · 21:9 | same prose, that sentence **removed** | ✓ |

**Root cause:** a trailing meta-instruction makes the model return no image, with no
error explaining why. **LDH vocabulary is safe** — "deep indigo," "luminous,"
"chromatic mist," "cool blue-white" all generate fine; that was the real risk and it is
ruled out. Production prompts come from `compile_prompt.py` / `compile_dawn.py`, which
emit pure scene prose, so **the pipeline is unaffected**. The trap is a worker
hand-writing a "quick test" prompt, getting an empty response, and misdiagnosing it as a
dead API key or exhausted quota. Written into `.claude/commands/spread-loop.md` §2.

**Gate verdict: PASS** at the exact production config (`pro` / `21:9` / `use_image_history: false`).

### 0.3 scaffold notes

- Created `classic/ art/ audio/ js/ css/ .claude/commands/`.
- `git mv index.html classic/index.html`.
- **Rewrote 20 asset refs from document-relative to root-absolute** (`img/…` → `/img/…`,
  plus `resume/` and `systemhorizon/`). Without this every asset on the archived page
  would have resolved to `/classic/img/…` and 404'd. `<base href="/">` was considered and
  **rejected**: the page has 7 in-page fragment anchors including the `#main` skip link,
  and `<base>` would have sent every one of them to the root document instead.
- Verified after the rewrite: 20 refs root-absolute, 7 fragments untouched, 0 leftovers.
- Added an archive banner to `/classic/` pointing at the live site.
- `<link rel="canonical">` in the archived page **already pointed to root** — correct as-is,
  so `/classic/` will not compete with the storybook for SEO. Left alone deliberately.
- **New root `index.html` is a deliberate throwaway placeholder** (`noindex`, meta-refresh
  to `/classic/`). It exists only so the branch always serves something at `/`. **Phase 5
  must overwrite it entirely with the Cover.** The file says so in a comment block. This
  is a small deviation from the goal's literal "move" — a bare move would have left the
  branch 404ing at root for the entire build, breaking local preview and the root-path
  assertions in `tests/site-audit.mjs`.
- `.claude/commands/spread-loop.md` written against the **real** script signatures
  (verified via `--help`), not invented ones. Carries the earned composition rules.

**0.3 verification:** `html-validate` clean on both files · `git diff --check` clean ·
all 5 local routes 200 · Playwright on `/classic/`: banner visible, skip link `#main`
intact, **8/8 images load, 0 HTTP ≥400, 0 console errors**.

> ⚠️ **Phase 6 will hit a false positive here — don't chase it.** A naive Playwright asset
> check reports **all 8 images broken** on `/classic/`. They are not. All 8 are
> `loading="lazy"` *and* sit inside the page's single collapsed `<details>` archive, so the
> browser never requests them — which is why the run shows 0 HTTP ≥400 alongside 8
> "broken" images. That combination (broken images + zero 4xx) is the signature of
> not-requested, not failed. All 8 return 200 on direct fetch, and they load 8/8 once
> `details.open = true` and `loading = 'eager'` are forced. Any asset check on this page
> must expand `<details>` first or it will report a regression that isn't there.

---

## Phase 1 — Audit existing art under LDH  ← **RESUME HERE**

⚠️ Chapter I was "BUILT AND VERIFIED 2026-07-30" under the **retired golden-hour** ruling,
one day before LDH became law. "Verified" no longer means verified.

| # | Task | Tier | Status |
|---|---|---|---|
| 1.1 | `check_palette.py` + LDH QA against every existing chapter image → keep / grade / regenerate | Sonnet | **TODO** |
| 1.2 | Re-measure kept/graded images with `measure_well.py --target` | Sonnet | **TODO** |
| 1.3 | Write the regeneration queue into this ledger | Haiku | **TODO** |

### Known art inventory (from the vault, 2026-07-31)

Chapter dirs `01_I`–`14_XIV` plus `cover/` exist, but **only 2 of 15 `spec.json` files do** —
`01_I` and `02_II`. Phase 2.1 writes the other 13. Existing masters/candidates include
`01_I/chapter-I-above-the-trees-v13.png`, `01_I/chapter-I-trailhead-v4.png`, and cover
frames (`cover-frame.png` / `.svg`).

### Carried forward into Phase 1

- **Chapter I's `status: verified` is stale on two independent counts.** (a) It was verified
  under golden-hour, before LDH. (b) Copy deck v2.1 grew its payload to thesis + tagline
  ≈ 62 words, and it was measured against the older, shorter text. Re-measure under the
  **final** copy before trusting 11.68:1 / 40% / 56%.
- Chapter I's well is **PALE** (open sky, deep-indigo `#1B1B3A` text), not deep. The motion
  manifest's "tree frame fades into the dark well of Chapter I" no longer describes this
  chapter — **the amendment supersedes it** with the cabin-overlay push-in, so this is
  resolved, not outstanding.

---

## Phase 2 — Specs for all 15 spreads

| # | Task | Tier | Status |
|---|---|---|---|
| 2.1 | Write/repair `spec.json` for Cover + I–XIV | Sonnet | **TODO** — 13 of 15 missing |
| 2.1b | Cover deep zone sized for **four** copy jobs + `icon_anchors` block | Sonnet | **TODO** |
| 2.2 | Lock copy per chapter from copy deck v2.1 (LOCKED INPUT) | Sonnet | **TODO** |
| 2.2b | XII exempt · III/V/X → 45% ceiling · I re-target ≈62 words | Sonnet | **TODO** |

⚠️ **The cover well is the highest-risk spec in the book.** It carries name/identity, two
icon buttons, their labels, *and* the one-shot interstitial line — four contrast-passing
jobs on one deep zone. Chapter I needed 13 versions with **one** job. Phase 5.4b reads
`icon_anchors` from this spec and is instructed to **block rather than guess** if it's absent.

**Voice ruling — decided, do not re-litigate:** chapter copy uses `tayls-voice`
**Mode 1 (Personal Voice, professional end)**. Mode 3 (Fiction) is not used. Write the
ruling into every `spec.json` copy block. II–XI are resume content **verbatim** — do not
re-voice them; only Cover, I, XIII, XIV are narrative.

---

## Phases 3–7 — not started

| Phase | Status | Note |
|---|---|---|
| 3 — Master generation loop | **TODO** | ≤2 Sonnet retries per chapter → Opus escalation. Opus adjusts the spec, never the gate. |
| 4 — Overlays | **TODO** | `rembg` absent → path (a) transparent generation only, unless installed. Firefly layer is **code, not image**. |
| 5 — Site build | **TODO** | Incl. **5.4b** (data-driven icon placement) and **5.10 / 5.10b** (Resume Spread Page) from the amendment. Root `index.html` placeholder must be overwritten here. |
| 6 — Verification gates | **TODO** | 11 gates: 8 original (7 amended for the `/resume/` carve-out) + 9–11 from amendment §C. |
| 7 — One human gate, then ship | **TODO** | 🛑 **Delete `.git\claude-handoff-skip` before the merge.** See below. |

---

## 🛑 Open risks

1. **`.git\claude-handoff-skip` is present and 0 bytes.** A blank file suppresses the handoff
   guard in **every** session, not just this run — `Test-SkipRequested` returns true
   unconditionally for an empty file. It was written 2026-07-31 14:07 for a run that had
   not yet started, so the repo has been silent about unbanked work since then with
   nothing running to justify it. **Phase 7 must delete it before the merge**; the ship
   itself has to happen under the normal guard. A companion `.why` file explains it locally.
2. **Copy is the real blocker, not art.** Wells cannot be finally verified until real text
   sits in them. Phase 2.2 locks copy *before* generation for exactly this reason.
3. **Mobile triples the matrix.** One 16:9 master will not hold a planned well at 375px.
   Art-directed crops per breakpoint, each re-measured (5.6), is the biggest under-priced item.
4. **Repo weight.** 4K sources stay in the vault. Only WebP/AVIF enter git — irreversible
   in history otherwise.
5. **5.10 is not optional scope.** The amendment *removed* the old fast-lane clause. If the
   Resume Spread Page is deferred, the site ships with no quick path to the résumé at all —
   a strict regression against the current editorial page for a 40-second screener.
6. **Audio bed may contain road noise.** The source filename contains `traffic`. Needs a
   listen on speakers before ship; replace rather than filter if it reads wrong. The loop
   itself is already fixed and seam-verified under 0.6 dB.
7. **`npm audit` reports 3 high-sev findings** (`sharp@0.34.2` libvips, `glob@11.0.3`).
   **Do NOT run `npm audit fix`** — the proposed "fix" is a semver-major *downgrade* of
   `sharp-cli` to 4.2.0.
8. **`tests/site-audit.mjs` imports Playwright via a hardcoded absolute path** into a Codex
   runtime cache. Now that Playwright is a real repo dependency, that line should become
   `import { chromium } from 'playwright'`. Phase 6 gate 8 extends this file, so fix it there.

---

## Log

### 2026-07-31 · Claude Code · Phase 0 complete
Integrated `Goal_Amendment_TwoPath_Cover.md` into the goal doc as authority level 0 — it was
**orphaned**: the ralph invocation named only `SlashGoal_AmongTrees_Ship.md`, so an autonomous
run would have built the whole site and silently ignored the two-path cover, the interstitial,
and the Resume Spread Page. Resolved three conflicts that would each have deadlocked a worker:
`/resume/` was listed do-not-touch while §B builds a page there (now a carve-out — new
`index.html` permitted, every pre-existing file byte-identical); §D cited a "copy deck v2.1"
that existed only as a file headed `v2` (renumbered, content already matched); and §A1 reads
cover `spec.json` well data that does not exist yet (now 5.4b, blocks rather than guesses).
Then ran Phase 0.1–0.4: live deploy verified, environment verified, nanobanana generation
failure diagnosed to a prompt-phrasing trigger rather than config, scaffold + `/classic/`
move completed with the asset-path rewrite, this ledger created.
