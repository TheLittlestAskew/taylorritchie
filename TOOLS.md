# TOOLS — taylorritchie

> What this project uses and what for. Maintained by the handoff motion: whenever
> a tool is used here, add or bump its row.
> Types: `Skill` · `MCP` · `CLI` · `App` · `Service` · `Site` · `Library` · `Data` · `Task`
> A `~` before a date means inferred, not observed. `—` means unknown.

## Active

| Tool | Type | Used for | Access | Last used | Cost | Notes |
|---|---|---|---|---|---|---|
| **GitHub Pages** | Service | Hosting the live resume site | tayloraritchie.com | 2026-08-05 | Free | Custom domain via root `CNAME` |
| **Supabase (job pipeline)** | Service | `tracker.html` — the job-application tracker's Report and Work-Search views | project `vtrtyagltwdrbastpppl` | ~2026-08-30 | Free tier | Same project as `Rectrix_Caedere`; `dashboard_jobs` anon view |
| **Supabase (projects heartbeat)** | Service | `systemhorizon/index.html` reads the `projects` table the sync heartbeat writes | project `qzliydcrlhioradwacmd` | 2026-09-03 | Free tier | ⚠️ This repo hosts the SH page that renders the heartbeat, so a stale Ephemeris note shows up **here**, not just in the SystemHorizon repo |
| **GitHub** | Service | Remote host for `TheLittlestAskew/taylorritchie` | github.com | 2026-08-05 | Free | Public repo |
| **git** | CLI | Version control, handoff motion | `C:\Program Files\Git` | 2026-09-26 | Free | — |
| **nanobanana** | MCP | Generating the storybook chapter frames | `@ycse/nanobanana-mcp` | 2026-09-26 | Free tier | `gemini-3-pro-image-preview`, 16:9, `use_image_history: false`, **no anchor image** — an anchor gives the flattest tree masses but throws composition out at random. No size parameter, hence the stuck 1376×768 |
| **Python** | CLI | Running the Early Morning gate and well-measurement scripts | local install | 2026-09-26 | Free | Standing project rule: drive every verification from Python, never bash string interpolation over Windows paths |
| **check_grade.py** | CLI | The five enforced Early Morning colour gates | vault `Constellations/CVsite/Style/` | 2026-09-26 | Free | `--sky-well` scope is declared per spread, never inferred. `--self-test` green on 60 |
| **probe_well.py** | CLI | Largest **in-band** (32–40%) text well whose every pixel clears 4.5:1 | vault `Constellations/CVsite/Style/` | 2026-09-26 | Free | Written 2026-09-26. `--self-test` green on 17. Use instead of `measure_well.py` once a chapter's well width is fixed by the Almanac |
| **measure_well.py** | CLI | Finding a well when its location is unknown; `--audit` of spec claims | `~/_retired/2026-08-04_among-trees-style/skills-live/verso/scripts/` | 2026-09-26 | Free | ⚠️ Lives outside any git repo. Width band corrected 38–45% → 32–40% on 2026-09-26; `--self-test` green on 37 |
| **Playwright** | Library | Headless browser driving `tests/site-audit.mjs` | `devDependencies` `playwright@^1.62.1` | ~2026-08-05 | Free | `npm test` |
| **@axe-core/playwright** | Library | Automated accessibility audit in the site-audit test | `devDependencies` `@axe-core/playwright@^4.12.1` | ~2026-08-05 | Free | Contrast + a11y gates |
| **sharp-cli** | Library | Image resizing/optimisation for `art/` and `img/` | `devDependencies` `sharp-cli@^5.2.0` | ~2026-08-05 | Free | — |
| **Node.js + npm** | CLI | Running the test script and the sharp pipeline | local install | ~2026-08-05 | Free | — |
| **/spread-loop** | Skill | Repo-local command for the storybook spread iteration loop | `.claude/commands/spread-loop.md` | ~2026-08-05 | Free | Project-scoped command, not a global skill |
| **Claude Code** | App | Site edits, test runs, handoffs | CLI / IDE extension | 2026-09-26 | Paid | — |
| **/handoff** | Skill | Banking work here — the log entry, the DO NEXT pointer, and this table | `~/.claude/skills/handoff` | 2026-09-26 | Free | Restated in `AGENTS.md` so Codex honours it too; only Claude Code has the Stop hook |
| **Codex** | App | Some site edits; distinct handoff source label | Codex CLI / IDE | ~2026-07-20 | Paid | `taylorritchie` has entries from both Codex and ChatGPT on 2026-07-20 |
| **septentrion-sync** | Skill | Feeds this repo's handoff state to the vault + SystemHorizon heartbeat | `~/.claude/skills/septentrion-sync` | 2026-09-02 | Free | In both `REPOS` and `TOOLS_REPOS` |
| **Job Ops Sunday DOL Reminder** | Task | Sunday toast prompting the GDOL work-search report | Task Scheduler | 2026-08-30 | Free | Pairs with `tracker.html` here and the `/dol-fill` skill |
| **Job Ops Friday Shortfall Alert** | Task | Friday toast when the week is short on work-search contacts | Task Scheduler | 2026-08-28 | Free | — |

## Retired

| Tool | Type | Was used for | Retired | Why |
|---|---|---|---|---|
| ~~**wip-backup.ps1**~~ | Task | Automatic WIP snapshotting into this repo | 2026-07-14 | 🛑 Pushed personal data to a public remote. Disabled and renamed; do not re-enable |
