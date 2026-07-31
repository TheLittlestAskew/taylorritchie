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

**Status:** Phases 0 and 1 complete. **Interior ruling made (dawn-lit interiors) — nothing is
blocked.** Phase 2 in progress: specs for 13 spreads. Run mode: autonomous delegation.
**Last updated:** 2026-07-31 · Claude Code

**Canonical art root:** `…\Septentrion\Constellations\Resume Site\resume art\<NN>_<NUMERAL>\`
(the vault). The OneDrive `PORTFOLIO\resume art\<NUMERAL>\` tree is a working copy — shared
files verified byte-identical by SHA256 on 2026-07-31, but **write to the vault**.

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

## Phase 1 — Audit existing art under LDH  ✅ **COMPLETE 2026-07-31**

| # | Task | Tier | Status |
|---|---|---|---|
| 1.1 | `check_palette.py` + LDH QA against every existing chapter image → keep / grade / regenerate | Opus | **DONE** |
| 1.2 | Re-measure kept/graded images with `measure_well.py --target` | Opus | **DONE** |
| 1.3 | Write the regeneration queue into this ledger | Opus | **DONE** |

### 1.0 — the gate that did not exist

`check_palette.py` measures two **structural** failures (muddy middle, warm-neutral drift)
and is deliberately blind to *which* colours a frame uses. That blindness is what lets the
coral sky be loud. It also means **a golden-hour spread with clean darks and cool neutrals
passes check_palette and is still not luminous dawn haze** — so on its own it could not
answer the Phase 1 question at all.

Written to close that: **`~/.claude/skills/luminous-dawn-haze/scripts/check_dawn_balance.py`**,
measuring the documented area budget (cool 55–72%, the mandatory violet-rose bridge 12–24%,
warm 18–32%, bright cores 1–5%) plus crushed-black. Classification is nearest-anchor in
CIELAB against the fourteen published anchors, not hand-drawn hue boundaries — the anchors
are the spec, and inventing angles around them would be a second unowned source of truth.
`--self-test` passes 16 checks.

**Calibrated against Taylor's own exemplar**, `072826/dawn-atmosphere.jpg`, the image the
profile is written from. It lands **cool 66.3 / bridge 12.2 / warm 20.6 / cores 2.4 — inside
all four bands**, which validates both the classifier and the published budget at once. Two
of my first-pass thresholds failed that exemplar and were wrong, not it:

- **Bright cores** started at L\*88 and read 16.8% on the exemplar. A core is the specular
  head of the sun or a firefly, not the bright warm haze around it — which belongs to the
  warm family and was already counted. Moved to **L\*98** (exemplar 2.43%, mid-band). The
  threshold deliberately sits *above* Sun Cream `#FFF0C5` (L\*95).
- **Value floor** started as "share below L\*16.4" and read 11.3% on the exemplar. But
  "nothing goes to black" is about **black, not darkness**: those pixels average chroma 23.7,
  they are deep teal and indigo silhouettes, and only 0.41% is dark *and* achromatic. The
  gate now tests dark **and** colourless together. Testing L alone would have failed the
  reference image that defines the profile, which is how a gate ends up ignored.

### 1.1 / 1.2 — audit results

Both gates on every existing master. ✓ = inside band, ✗ = outside.

| Ch | Master | muddy | drift | cool | bridge | warm | cores | crushed | Verdict |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| — | `cover/cover-frame.png` | 0.0 | n/a | — | — | — | — | — | **N/A** |
| I | `chapter-I-above-the-trees-v13` | 1.6 | 10.9 | 66.3✓ | 16.0✓ | 14.0✗ | 0.7✗ | 0.0 | **GRADE** |
| I | `chapter-I-trailhead-v4` | 5.5 | 4.9 | 25.6✗ | 13.2✓ | 10.6✗ | 0.0✗ | 41.1✗ | **RETIRE** |
| II | `chapter-II-misty-morning-v2` | 6.5 | 5.2 | 61.3✓ | 14.8✓ | 18.0✓ | 0.4✗ | 0.0 | **KEEP** |
| V | `chapter-V-take-me-home-v1` | 1.0 | n/a | 98.8✗ | 0.2✗ | 0.4✗ | 0.0✗ | 0.0 | **REGENERATE** |
| VI | `chapter-VI-fireplace-ashes-v10` | 11.4 | 11.6 | 69.4✓ | 4.9✗ | 5.3✗ | 0.0✗ | 8.3✗ | **BLOCKED** |
| VI | `chapter-VI-fireplace-ashes-v9` | 11.6 | 13.4 | 46.2✗ | 4.6✗ | 5.5✗ | 0.0✗ | 27.5✗ | **RETIRE** |
| VII | `chapter-VII-in-closets-like-cedar-v4` | 29.2✗ | 19.6✗ | 84.5✗ | 1.0✗ | 0.9✗ | 0.0✗ | 0.0 | **REGENERATE** |
| VIII | `chapter-VIII-bare-feet-down-the-hallway-v1` | 0.0 | 0.2 | 98.8✗ | 0.0✗ | 0.0✗ | 0.0✗ | 0.0 | **REGENERATE** |
| IX | `chapter-IX-im-here-in-your-doorway-v1` | 0.5 | 16.7 | 33.0✗ | 0.2✗ | 45.7✗ | 0.0✗ | 0.3 | **BLOCKED** |
| IX | `chapter-IX-im-here-in-your-doorway-v2` | 12.0✗ | 63.2✗ | 37.1✗ | 6.8✗ | 23.4✓ | 0.0✗ | 0.6 | **RETIRE** |
| X | `chapter-X-i-laid-the-groundwork-v1` | 9.3 | 20.1✗ | 47.4✗ | 16.8✓ | 12.8✗ | 0.0✗ | 0.1 | **BLOCKED** |
| XI | `chapter-XI-next-chapter-v1` | 0.4 | 21.8✗ | 37.5✗ | 0.0✗ | 5.9✗ | 0.0✗ | 0.8 | **REGENERATE** |
| XI | `chapter-XI-next-chapter-v3` | 23.8✗ | 0.3 | 92.8✗ | 0.0✗ | 0.1✗ | 0.0✗ | 0.2 | **RETIRE** |

**Wells re-measured (1.2).** Both stored claims reproduce **exactly** and
`measure_well.py --audit` reports 0 unsupported claims:

- **I v13** — 11.68:1, 40.0% × 56.0% at target x[58,98] y[4,60], text `#1B1B3A`. Holds.
- **II v2** — 6.46:1, 40.0% × 36.0% at target x[2,42] y[62,98], text `#EAF6F2`. Holds.

**Correction to the standing note on Chapter I.** Its `verified` was flagged stale on two
counts; only one survives. The **geometry and contrast half is intact** — re-measured today,
identical numbers, audit clean. What is *not* verified is (a) the **atmosphere**, which is
what this phase actually caught: warm 14.0% sits under the 18% floor and cores 0.7% under
the 1% floor, and (b) whether copy deck v2.1's ≈62 words physically **fit** 40% × 56%.
Copy length cannot change a contrast ratio; it is a fit question for 2.2 / 5, not a
re-measure. Do not re-roll I's well hunting a number that is already correct.

### 1.3 — regeneration queue

**Keep as-is:** II (`v2`) — the only existing image inside all three area bands, and the
closest thing the project has to an on-profile chapter. Grade for cores only, or ship it.

**Grade, then re-measure with `check_edit.py`:** I (`v13`). Warmth +4 pts toward the 18–32%
band and a bright core; both are colour-class fixes, so per LDH triage this is a grade, not
a re-roll. Its well is good — protect it.

**Regenerate regardless of the interior ruling below (4):**

| Ch | Why | Carry forward |
|---|---|---|
| V | Reads **night, not dawn** — 76.7% of frame below the value floor, bridge 0.2%, warm 0.4%. Also hard low-poly faceting against LDH's 65–80% soft/lost edge rule. | **The composition is the best in the set** — worn stone path, several lit windows, real destination, occupancy without a figure. Regenerate the *atmosphere*, reuse the *staging*. |
| VII | Only image failing **both** structural gates (29.2% muddy, 19.6% drift) — profile-independent. | — |
| VIII | Textbook **horror grammar**: dark tunnel corridor, single light at the far end, no occupancy, 86.3% below value floor. Both skills name this exact trap. Compositional → not gradeable. | Open the route, raise the ambient floor, add occupancy cues. |
| XI | Both candidates fail structurally in *opposite* directions — v1 drift 21.8%, v3 muddy 23.8%. No base worth grading. | — |

**Blocked on the interior ruling (3):** VI (base `v10`), IX (base **`v1`**, not v2 — v1 passes
both structural gates, v2 fails both), X (base `v1`, and note its bridge 16.8% is in band).

**Generate from scratch, but NOT from nothing (6):** Cover spread, III, IV, XII, XIII, XIV.
See the correction directly below — these carry Taylor's own layout sketches.

### ⚠️ Correction to 1.1, found while verifying the run's paths

The audit above was first run against `OneDrive\PORTFOLIO\resume art\<NUMERAL>\`. The
**canonical root is the vault** — `…\Septentrion\Constellations\Resume Site\resume art\<NN>_<NUMERAL>\`
— which is what `spread-loop.md` already points at. Both copies were compared by SHA256:
**every shared master and both `spec.json` files are byte-identical**, so the verdict table
stands unchanged. Four things the vault shows that OneDrive did not:

1. **"No art at all" was wrong.** III, IV, XII, XIII, XIV and V/VI carry **Taylor's own layout
   sketches and composition references** — `chapter 03/04/13 layout`, `sketch of the cabin.png`,
   `sketch of the living room.png`, `sketch of chapter 12.png`, `reference-cardigan-collection.jpg`.
   No generated masters, but real composition input in her hand. **Generation should start from
   her layouts, not from prose alone.** This materially improves the odds on the six.
2. **V and VI's masters were never promoted to the vault** — they exist only in the OneDrive
   working copy. Consistent with both being rejected; it also means the vault currently has
   *no* master for either. Their **sketches are there**, which is the better starting point anyway.
3. `14_XIV/nano-banana-f7917…png` is a **pencil-sketch monitor mockup**, an asset for the
   contact spread, not a spread master. **N/A**, not a failing image.
4. Two more retirements: `07_VII/nano-banana-63210…png` (drift 87.8%) and `11_XI/public.webp`
   (muddy 23.4%, drift 98.9% — a derivative of the old site, not a master).

---

## ✅ RULED 2026-07-31 by Taylor — dawn-lit interiors

**Option (b). One budget governs all 15 spreads.** Interiors VI–XI are re-conceived as
**dawn-lit interiors**: cool dawn light through windows does the atmospheric work and carries
the cool 55–72% share, while the hearth or lamp stays a **local** warm pocket inside the
18–32% band. The violet-rose bridge is where cool window light meets warm lamplight across
the room — **mandatory indoors exactly as outdoors**.

Rationale, recorded so it is not re-litigated: the entire point of a style bible is that
separately generated chapters read as one world. A second interior band set would have been a
second source of truth for colour, the same failure mode already rejected when hue boundaries
were dropped in favour of nearest-anchor classification.

**Consequences, all applied:**

- VI / IX / X move from **BLOCKED → REGENERATE**. They cannot be graded into compliance;
  dawn-lit is a re-staging, not a colour pass.
- `palette_mode: warm_pocket` no longer means "warm dominates from VI onward". It means the
  warm pocket grows in **size and nearness** across the threshold, never in share of palette —
  which is what `verso/SKILL.md` already said in its own warning, and is now literally true.
- Written into `.claude/commands/spread-loop.md` §6 so every worker resolves it identically.

**Run mode ruled: resume the autonomous delegation run.**

### Revised scope — 13 of 15 spreads need generation

| Disposition | Count | Chapters |
|---|---:|---|
| Keep as-is | 1 | II |
| Grade only | 1 | I |
| Regenerate (master exists) | 4 | V, VII, VIII, XI |
| Regenerate (dawn-lit re-stage) | 3 | VI, IX, X |
| Generate from sketches | 6 | Cover, III, IV, XII, XIII, XIV |

---

## Superseded — the interior/exterior gap as originally raised

**LDH's area budget is written for dawn *exteriors* and has no interior variant, while
verso switches `palette_mode` to `warm_pocket` from VI onward.** A fireplace room, a closet,
a hallway and a doorway are warm-dominant by construction; they cannot hold cool 55–72% with
a 12–24% violet-rose mist bridge and still be interiors. **All six interior chapters fail the
cool floor and the bridge band on that mismatch alone**, which is a spec conflict, not a
verdict on the art.

This would have deadlocked Phase 3 on six chapters the moment a worker reached VI.
**Answered above: option (b), dawn-lit interiors.** Kept only so a future session
understands why the interiors were re-staged rather than graded.

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
| 2.1 | Write/repair `spec.json` for Cover + I–XIV | — | **DISPATCHED** — see task table |
| 2.1b | Cover deep zone sized for **four** copy jobs + `icon_anchors` block | Opus | **DISPATCHED** (T1) |
| 2.2 | Lock copy per chapter from copy deck v2.1 (LOCKED INPUT) | — | **DISPATCHED** — folded into each spec task |
| 2.2b | XII exempt · III/V/X → 45% ceiling · I re-target ≈62 words | — | **DISPATCHED** (T9, T3/T4/T7, T2) |

### Phase 2 task table — dispatched 2026-07-31, approved by Taylor

Standards are **orchestrator-defined**, not externally sourced: the authority for this work is
the project's own docs (`verso/references/schema.md`, the LDH area budget, `spread-loop.md`'s
verdict table). No external web standard governs a bespoke illustrated-spread pipeline, and
dispatching `standards-researcher` at it would have returned nothing applicable. The executable
acceptance check is `compile_prompt.py` exiting 0 — it refuses incomplete specs by design, so
it is a real gate rather than an eyeball check.

| # | Task | Tier | Status | Retries |
|---|---|---|---|---:|
| T1 | Cover spec + `icon_anchors` (4 copy jobs on one deep zone) | Opus | DISPATCHED | 0 |
| T2 | I — re-target well to ≈62 words + grade brief | Sonnet | DISPATCHED | 0 |
| T3 | III + IV specs | Sonnet | DISPATCHED | 0 |
| T4 | V spec + **strip near-HIPAA from the copy deck** | Sonnet | DISPATCHED | 0 |
| T5 | VI + VII specs — first dawn-lit interiors, sets the pattern | Opus | DISPATCHED | 0 |
| T6 | VIII + IX specs | Opus | BLOCKED on T5 | 0 |
| T7 | X + XI specs | Sonnet | BLOCKED on T5 | 0 |
| T8 | XIII + XIV specs | Sonnet | DISPATCHED | 0 |
| T9 | XII spec (text-free, well-exempt) | Haiku | DISPATCHED | 0 |

**Ruled by Taylor 2026-07-31:** the copy deck's Chapter V clause *"operating close to HIPAA
standards"* is **stripped** — it conflicts with her standing rule against near-HIPAA phrasing,
and this ships on a public page rather than into an ATS. The Privacy Officer credential itself
stays. T4 owns the edit; it is the **only** task permitted to write to the copy deck.

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
9. **RESOLVED 2026-07-31** — the interior/exterior colour-budget gap. Ruled: dawn-lit
   interiors, one budget for all 15 spreads. VI/IX/X regenerate rather than grade.
10. **Art volume is larger than the ledger implied — this is the top delivery risk.** Only
    **2 of 15** spreads survive Phase 1 (I graded, II kept); **13 need generation**. Phase 3
    was scoped as a retry loop over existing masters and is really a from-scratch generation
    phase for most of the book. Chapter I alone took 13 versions to land, and the interior
    ruling means VI–XI are re-staged rather than re-graded. Mitigating factor found late:
    Taylor's own layout sketches exist for the six "no art" chapters, so they start from her
    composition rather than from prose.
11. **`check_dawn_balance.py` lives in the skill, not the repo**, like the verso scripts. It is
    calibrated off one exemplar image. If a band ever disagrees with Taylor's eye, re-check the
    calibration before re-rolling art against it — the same warning `check_palette.py` carries
    about its own five-sample ceiling.

---

## Log

### 2026-07-31 · Claude Code · Phase 1 complete
Audited all 14 existing chapter images against both gate sets. Found that the existing
toolchain **could not answer the Phase 1 question**: `check_palette.py`'s two gates are
structural and profile-agnostic by design, so a golden-hour spread passes them and is still
not LDH. Wrote `check_dawn_balance.py` into the luminous-dawn-haze skill to measure the
documented area budget, classifying nearest-anchor in CIELAB against the fourteen published
anchors. Calibrated it against Taylor's own exemplar `dawn-atmosphere.jpg`, which lands
inside all four bands — and corrected two of my own thresholds that had failed it (bright
cores L\*88→98; value floor from "dark" to "dark **and** colourless", since the exemplar runs
11.3% below `#152552` at chroma 23.7 and is not crushed at all). Result: **2 of 15 spreads
survive** — II kept, I graded, 4 regenerate, 3 blocked, 6 never existed. Re-measured both
surviving wells; stored numbers reproduce exactly and the audit is clean. Corrected the
standing "Chapter I is stale" note — its geometry and contrast are fine, its *atmosphere* is
what fails. Also fixed `verso/SKILL.md`, which still carried the retired golden-hour ruling
including "fireflies are cut from all 15 spreads", the exact opposite of current law.

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
