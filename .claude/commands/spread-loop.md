---
description: Run one chapter through the verso generate-and-verify loop. Usage - /spread-loop XI
---

# /spread-loop — one chapter, compiled → generated → measured → judged

Run the full verso loop for a **single** spread and exit with a verdict backed by real
numbers. Argument is a chapter numeral (`Cover`, `I`–`XIV`).

**Hard cap: 3 generation attempts.** Never a 4th. Exit `RETRY-EXHAUSTED` with the
measurement history instead — an unwinnable gate is information, not a reason to keep
spending. Chapter X once had no passing rectangle anywhere in frame; a loop without a
cap would still be running.

## Paths

| What | Where |
|---|---|
| Specs + masters | `C:\Users\theli\Obsidian Vaults\Septentrion\Constellations\Resume Site\resume art\<NN>_<NUMERAL>\` |
| verso scripts | `~/.claude/skills/verso/scripts/` |
| LDH compiler | `~/.claude/skills/luminous-dawn-haze/scripts/compile_dawn.py` |

4K masters **stay in the vault**. Only WebP/AVIF derivatives enter this repo.

## The loop

### 1. Compile
```bash
python ~/.claude/skills/verso/scripts/compile_prompt.py <spec.json>
python ~/.claude/skills/verso/scripts/compile_prompt.py <spec.json> --params
```
`--params` emits the MCP call arguments. The compiler **refuses incomplete specs by
design** — a rejection (exit 1) means fix the spec, never hand-write the prompt around it.

Cross-check continuity against neighbours before generating:
```bash
python ~/.claude/skills/verso/scripts/compile_prompt.py <spec.json> --siblings <prev> <next>
```

### 2. Generate
`nanobanana:gemini_generate_image` with the compiled prose and the `--params` values —
`model: pro`, `aspect_ratio: 21:9`, `use_image_history: false`.

Re-state the style anchor (a known on-palette chapter) on **every** generation. Warm
drift is cumulative and silent otherwise.

> ⚠️ **Never put meta-instructions in the prompt.** Verified 2026-07-31: appending
> `"Test image only."` to a working prompt makes the model return **no image at all**,
> with no error explaining why — it reads as "don't really make this." The identical
> prompt succeeds with that sentence removed. If a generation returns "No image returned
> from model," suspect prompt phrasing before you suspect the API, the key, or the quota.
> Scene prose only. `compile_prompt.py` and `compile_dawn.py` already emit exactly that.

### 3. Crop
21:9 → 16:9, **biased toward the well**. Crop bias is not taste. On Chapter I the same
source measured **11.68:1 on the right window and 1.0:1 on the centre window**, because
centre slid the forest mass into the text band. Record the bias in the spec.

### 4. Measure
Text colour follows the well's value class — this is the single easiest thing to get
backwards:

- `value_class: pale` → deep indigo **`#1B1B3A`**
- `value_class: deep` → pale mist **`#EAF6F2`**

```bash
python ~/.claude/skills/verso/scripts/measure_well.py MASTER.png \
  --text "#1B1B3A" \
  --target '{"x":[58,98],"y":[4,60]}' \
  --json measured.json
```
Exit 0 = viable well, 1 = none, 2 = bad input.

### 5. Palette check
```bash
python ~/.claude/skills/verso/scripts/check_palette.py MASTER.png
```

### 6. Verdict

| Gate | Pass |
|---|---|
| Worst-pixel contrast | **≥ 4.5:1** (`absolute_min`, not grain-tolerant) |
| Well width | 38–45% · III/V/X target the **45% ceiling** · XIII–XIV ~25% · **XII exempt, no well** |
| Well position | within ±10 pts of target |
| Muddy middle | low — references run 0.1–0.7%; drifted spreads run 12–29% |
| LDH areas | cool 55–72% · violet-rose bridge 12–24% **present** · warm 18–32% · bright cores 1–5% |
| Value floor | nothing colder than `#152552` reads as black; no `#000` |
| Fireflies | sparse, dim, irregular. Neon or grid-spaced = regenerate |

Exit **PASS** (write `well.measured` + `status: verified` back to the spec) or
**RETRY-EXHAUSTED** with every attempt's numbers. Never exit silently.

## Triage — grade vs. regenerate

- **Colour** off → grade or edit. Cheaper and lower-risk than regenerating.
- **Composition, depth ladder, firefly placement** off → regenerate. Grading cannot fix drawing.

Editing an approved master is the preferred repair. Chapter I's edit held contrast at
11.68:1 against the base's 11.86:1 *and improved muddy from 2.7% to 1.6%*. Always verify
the edit rather than trusting it:

```bash
python ~/.claude/skills/verso/scripts/check_edit.py BASE.png EDITED.png \
  --target '{"x":[58,98],"y":[4,60]}' --text "#1B1B3A"
```
Exit 1 means the edit broke a gate or gave up more contrast than tolerance allows.

## Composition rules earned the hard way

1. **A trail that closes into darkness reads as a threat; a trail opening toward a lit
   clearing reads as an invitation.** Chapter I v12 sent the path into a conifer tunnel
   and Taylor correctly called it *menacing*. On the first spread anyone sees, that
   difference is the whole tone of the book.
2. **Wells belong on smooth planes at a value extreme** — open sky, a shaded bank, firelight
   on plaster. Vertical objects fail three predictable ways: bark spans both value
   extremes at once (1.0–1.45:1), a backlit canopy leaks sky through the gaps
   (1.0–1.72:1), and a flat silhouette slab passes but can't reach 38% width without
   eating the composition (14.35:1 at 28% wide).
3. **Nothing crosses the well.** One thin city spire held two columns at 2.67:1 while every
   other column ran above 7:1. Worst-pixel is the verdict, so a single object loses it.
4. **Name species positively** — "every tree is a needled conifer, spruce and fir, tiered
   branches, spired top." Listing trees to *avoid* does not work on this model family.
5. **A pale well must be cool, not warm.** Writing Chapter I's well as "cream and butter
   gold" tripped warm-neutral drift at 19.9% against an 18% ceiling; a large low-chroma
   warm field is precisely what that gate measures. Rewriting it cool raised contrast at
   the same time, because cool-pale is also brighter.
6. **Horror check.** Indigo + mist + single light + no occupancy is horror grammar, and this
   palette holds three of four by construction. If a spread feels "off," that's the first
   suspect — not the palette.
