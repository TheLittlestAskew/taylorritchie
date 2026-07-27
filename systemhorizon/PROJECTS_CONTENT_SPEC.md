# SystemHorizon — Projects Content & Display Spec

**Purpose:** Everything the SystemHorizon `projects` view and home dashboard need to represent Taylor's real project portfolio. Built by cross-referencing the live claude.ai Projects list (read 2026-07-27) against the documented work portfolio (memory + GitHub repos).

**How to use this doc:** Section 1 is the master table (act from this). Section 2 is the schema change that makes project pages worth building. Section 3 is per-project content. Section 4 is the home-dashboard rollup. Section 5 is the display pattern library.

> Confidence markers: ✅ read directly from source this session · 🧠 from memory/repos · ⚠️ inferred, verify before shipping.

---

## ▶ Next action

**Paste the schema SQL (Section 7) into the Supabase SQL editor.** It adds 5 nullable columns and unblocks the auto-updating heartbeat that's already wired (Section 7). Everything else here is reference you build from as you rework the SystemHorizon projects view.

## ✓ Decisions locked (2026-07-27)

- **Naming:** `Rectrix Caedere` = campaign + brand + public site (its own project). `Aftermath Atlas` = the analytics app; the `Aftermath Meridian` Supabase DB is just its backend, **not a separate project card**. "RC: Aftermath Meridian" on claude.ai maps to Aftermath Atlas.
- **Schema:** the projects-table extension (Section 2) gets folded into the next SystemHorizon UI update. The 5 columns the heartbeat needs are safe to add now (Section 7) — they're nullable and the current app ignores unknown columns.
- **Staying current:** solved by the `septentrion-sync` → Supabase heartbeat (Section 7), not by hand.

---

## 1. Master reconciliation table

claude.ai Project ∪ portfolio, deduped. **Active** = touch in last ~30 days. Health is my read, not yours — override freely.

| Project | claude.ai? | Repo / home | Type | Area | Status | Health | Headline metric |
|---|---|---|---|---|---|---|---|
| **System Horizon** | ✅ pinned | `taylorritchie/systemhorizon` | app | Ops & Infra | Active | 🟡 | 10/15 views live |
| **Septentrion / Observatory** | ✅ pinned | `SystemHorizon` (Septentrion vault) | app + vault | Ops & Infra | Active | 🟢 | 5 panels, daily 07:30 task |
| **Rectrix Caedere** (campaign + brand + site) | ✅ | `rectrixcaedere` | app + content | Aftermath | Active | 🟢 | live site + roll dashboard |
| **Aftermath Atlas** (analytics app) | ✅ "RC: Aftermath Meridian" | `aftermath-atlas` | app | Aftermath | Active | 🟡 | Spread/Court/Orrery + ext |
| **Sky Is The Limit (SITL)** | ✅ pinned | `sitl_vault` | automation + archive | Aftermath | Active | 🟢 | mp3→note→approve pipeline |
| **Where The Flowers Forget** | ✅ | (aftermath-atlas / vault) | archive | Aftermath | Paused | 🟡 | S02 integrated |
| **Ashfall Brittania** | ✅ pinned | `ashfall_vault` | archive | Aftermath | Active | 🟢 | you play; DM is "Taylor (DM)" |
| **Pacts & Power** | ✅ | `pacts_power_vault` | archive | Aftermath | Paused | ⚪ | vault synced |
| **Dimension 20 pipeline** | chat only | `aftermath-atlas-dev` | automation + archive | Aftermath | Active | 🟡 | Ep 1 proven, 2–17 pending |
| **Resume & Job Hunting** | ✅ pinned | `taylorritchie`, `career-ops` | automation | Career | Active | 🟢 | tracker + weekly discovery |
| **Storybook Resume** | (under Resume) | `~/Documents/storybook-resume` | app | Career | Not started | ⚪ | 9-scene spec, 0 built |
| **Nonprofit Power Platform** | — | `nonprofit-power-platform` | content/case-study | Career | Paused | 🟡 | 129 tr_ tables, branches unmerged |
| **Invisible String Theory** | ✅ | (Swift intel) | intel | Swift | Active | 🟢 | Swift merch + next-move predict |
| **Swiftwatch** | (under IST) | `~/changedetection` | intel/monitor | Swift | Active | 🟢 | 2 watches, chain verified |
| **Fantasy Football** | ✅ | (new, GitHub) | app + learning | Learning | Active | 🟡 | ESPN league tracker, building |
| **Learn JavaScript** | ✅ | — | learning | Learning | Ongoing | ⚪ | skill-building track |

Legend: 🟢 healthy/moving · 🟡 works but has a known trap · ⚪ idle/parked.

---

## 2. Schema extension (do this first)

The current `projects` table can't hold a portfolio. Add these columns (all nullable, so nothing breaks). Keep the existing ones.

```sql
-- existing: id, name, description, area, status, priority, start_date, due_date, closed_date, created_at
ALTER TABLE projects ADD COLUMN kind        text;    -- 'app'|'automation'|'archive'|'content'|'intel'|'learning'
ALTER TABLE projects ADD COLUMN health      text;    -- 'Green'|'Yellow'|'Red'|'Idle'
ALTER TABLE projects ADD COLUMN pinned      boolean; -- surfaces on home
ALTER TABLE projects ADD COLUMN live_url    text;    -- deployed site
ALTER TABLE projects ADD COLUMN repo_url    text;    -- GitHub
ALTER TABLE projects ADD COLUMN dash_url    text;    -- dashboard/vault/tracker link
ALTER TABLE projects ADD COLUMN tech        text;    -- comma tags: 'React,Supabase'
ALTER TABLE projects ADD COLUMN metric_label text;   -- 'Rolls tracked'
ALTER TABLE projects ADD COLUMN metric_value text;   -- '9,300'  (text: some are '10/15')
ALTER TABLE projects ADD COLUMN next_action text;    -- the one thing to do next
ALTER TABLE projects ADD COLUMN last_activity date;  -- last handoff/commit/session
```

Extend the row mapper (`pToR`/`pFrR`) with the same camelCase↔snake_case pairs. Also widen `status` to include **`Paused`** and **`Idea`** beyond Open/In Progress/Closed — half your portfolio is parked, not open or closed, and forcing it into "Open" makes the dashboard lie.

**Why these and not more:** every field here answers a question you actually ask at a glance — "is it alive (health/last_activity), where do I click (3 urls), what's the one number that matters (metric), what do I do next (next_action)." Anything past this is detail that belongs on the project page, pulled live, not stored.

---

## 3. Per-project content + display

Each block: **Overview** → **What goes on the page** → **Display** → **Dashboard surface**. Grouped by area so you can build one area's cards at a time.

### AREA: Ops & Infra

#### System Horizon 🧠 ✅
- **Overview:** This app. Single-file React 18 control panel (CDN React, pre-compiled JSX, raw `fetch` to Supabase `qzliydcrlhioradwacmd`, no localStorage so it cross-device syncs). 10/15 views live.
- **Page:** live-status ping (returns 200 ✓), the 10 built views + 5 stubs as a checklist, the **missing `tayls-task-manager.jsx` source** flag (biggest risk — last session's finding), open items (streak bug, recurring strip hardcoded, Failed Flows unbuilt), links to repo + live.
- **Display:** self-referential card — a build-progress bar (views built/total) + a "known traps" red-list. This is the one project whose page can read its *own* Supabase for real counts.
- **Dashboard:** don't dashboard itself as a metric tile; instead its home IS the dashboard. Surface only the JSX-source-missing warning as a persistent banner until fixed.

#### Septentrion / The Observatory 🧠 ✅ pinned
- **Overview:** Your "mind palace" — agentic-OS dashboard (Septentrion vault, shipped 2026-07-17): 5 panels, a daily 07:30 generator task, `/handoff` skill feeding a Return Point that auto-syncs from every repo's HANDOFF.md.
- **Page:** the 5 panels' current state, last generator run time, which repos feed it, the Return Point summary, pending items (jobs Supabase decision, HTML Embed plugin, gh install).
- **Display:** a "last synced" timestamp + a repo-feed list with per-repo freshness dots. This is your meta-project; show it as a hub that links out to all the others.
- **Dashboard:** one tile — "Observatory last synced: [time]" with green/red freshness. If it's stale, everything downstream is stale.

### AREA: Aftermath (D&D analytics ecosystem)

> ⚠️ Naming: resolve RC vs Aftermath Meridian vs Aftermath Atlas first (Watch-out #1). Content below assumes: **Rectrix Caedere** = your campaign + brand + public site; **Aftermath Atlas** = the analytics app; **Aftermath Meridian** = the Supabase DB behind Atlas.

#### Rectrix Caedere 🧠 ✅
- **Overview:** Your D&D campaign, its brand system, and the public site (`rectrixcaedere.com`). Has a `/rc-brand` skill, oracle-card product concept, and a Roll Analytics dashboard. Supabase `Rectrix_Caedere` (via `supabase-cutter`). DDB roll-sync extension writes rolls direct to this DB.
- **Page:** live-site link + status, brand asset pointers, the oracle-deck product line, roll-sync health (last roll ingested), the prop-types black-screen bug history as a resolved-issues log.
- **Display:** brand-forward card (this is the one project that should carry its own visual identity — pull the RC palette). Roll-count metric + "last roll synced" freshness.
- **Dashboard:** metric tile "RC rolls tracked: [n]" + last-sync dot. It's your flagship creative-data product; it earns a home tile.

#### Aftermath Atlas 🧠 ✅ (claude.ai: "RC: Aftermath Meridian")
- **Overview:** Vite + Supabase roll-analytics app — Spread / Court / Orrery views + a browser extension. Supabase `Aftermath_Meridian` (`supabase-aftermath-meridian`, project `aftermath-atlas-dev`). The engine that RC and Dimension 20 data feed into. Note: local repo `C:\Users\theli\Obsidian Vaults\aftermath-atlas` has uncommitted/diverged changes + 6 orphaned remote migrations (last session).
- **Page:** the 3 analytics views with a screenshot each, extension version, DB table list, the **open repo hygiene items** (diverged branch, orphaned migrations, `seed.sql` line-30 quoting bug), deploy status.
- **Display:** app-card with a live "deploy status" pill + a repo-health strip (branch clean/diverged, migrations in sync y/n). This project's page is where the git-hygiene debt should live visibly so it stops rotting.
- **Dashboard:** repo-health dot only (red until branch/migrations reconciled). Don't bury known debt in a detail view — a red dot on home is what gets it fixed.

#### Sky Is The Limit (SITL) 🧠 ✅ pinned
- **Overview:** D&D campaign + the transcription pipeline that powers the whole ecosystem: mp3 → AssemblyAI transcribe → spellcheck → Windows-toast approve → session note. Scheduled-task watcher auto-starts. The pattern Dimension 20 was cloned from.
- **Page:** pipeline stage diagram with per-stage health, watcher task status (running/stopped), pending approvals count, last processed episode, the AssemblyAI custom-spelling config.
- **Display:** **horizontal pipeline strip** — 4 stages as pills that light green as audio flows through. Pending-approvals badge is the live number that matters.
- **Dashboard:** tile "SITL pending approvals: [n]" — actionable, it's a to-do queue. Plus watcher-alive dot.

#### Where The Flowers Forget (WtFF) 🧠 ✅
- **Overview:** Archive of the D&D campaign "Where The Flowers Remember" — transcripts → session notes. S02 integrated into aftermath-atlas (session/archive.html, roll logs).
- **Page:** episode index (processed vs pending), roll logs, session-note links, which season is current.
- **Display:** progress-bar card (episodes archived / total) + episode list. Same template as SITL/D20 minus the live pipeline.
- **Dashboard:** progress % only, in a "D&D archives" grouped tile — not its own home tile (it's paused).

#### Ashfall Brittania 🧠 ✅ pinned
- **Overview:** D&D campaign "Ashfall Britannia" — **you're a PLAYER, not the DM** (the DM is also named Taylor, shown "Taylor (DM)" — never conflate). `ashfall_vault`.
- **Page:** your character sheet/notes, session log, vault link. Framed as a player's journal, not an ops archive.
- **Display:** journal/lore card, lighter than the pipeline projects. A "your role: Player" badge to keep the distinction loud.
- **Dashboard:** last-session date in the grouped D&D tile. Low priority for home.

#### Pacts & Power 🧠 ✅
- **Overview:** D&D campaign vault (`pacts_power_vault`), synced (audio cleanup, PAT→GCM done). Currently idle.
- **Page:** vault contents index, sync status, last activity.
- **Display:** minimal archive card. Parked, so no live elements.
- **Dashboard:** none unless reactivated. Lives in the archives group only.

#### Dimension 20 pipeline 🧠 (claude.ai: "Dimension 20 D&D transcripts" chat)
- **Overview:** Transcript → session note → `showcase.rolls` for Dimension 20 (24 campaigns, 225 transcripts imported). SITL workflow adapted; reconciled against Wikipedia/DDB; Episode 1 proven, Eps 2–17 pending. Writes to `aftermath-atlas-dev` via `supabase-aftermath-meridian`.
- **Page:** campaign index (24), per-campaign episode-processing progress, reconciliation source notes (face/total policy), the big pending queue (Eps 2–17 + other campaigns).
- **Display:** **matrix/grid** — campaigns × processing-state heatmap (this is the one project with enough volume to justify a heatmap, like the pain tracker's). Headline: episodes processed / total across all campaigns.
- **Dashboard:** tile "D20 episodes processed: [n]/[total]" with a thin progress bar. It's a long grind; a visible bar keeps it honest.

### AREA: Career

#### Resume & Job Hunting 🧠 ✅ pinned
- **Overview:** Your job-search command center. `career-ops` (v1.22.0), Supabase job tracker (GA DOL source of truth), `/harvest-jobs` + `/apply` + `/dol-fill` + `/enrich-employer` skills, resume variants, weekly work-search compliance (GA DOL requires 3 contacts/week), Sun/Fri GDOL toasts.
- **Page:** the **application funnel** (Discovered → Applied → Interview → Offer), this week's work-search compliance (X/3 contacts), resume variant list, recent applications with scores (MAVEN 94%, NDI 84%), upcoming GDOL report deadline.
- **Display:** **funnel + weekly-compliance meter** as the hero. This is the most dashboard-native project you have — it's already counters and deadlines.
- **Dashboard:** two tiles — "Work-search: X/3 this week" (turns red Fri if unmet) and "Apps this week: [n]". These are deadline-driven; they belong on home permanently.

#### Storybook Resume 🧠
- **Overview:** 9-scene "career as a journey" scroll-snap resume site, Among Trees design DNA. Spec + 10-task plan committed at `~/Documents/storybook-resume`. **Build not started.**
- **Page:** the 9-scene storyboard, the 10-task plan as a checklist, design-DNA reference, link to spec.
- **Display:** task-checklist card with a "0/10 built" bar. It's a plan, so show it as a plan.
- **Dashboard:** none yet (nothing shipped). Appears once build starts.

#### Nonprofit Power Platform 🧠
- **Overview:** Sanitized public case-study repo of your 6-area Power Platform build (129 tr_ tables verified, 0 PII). Source-private never commits. HANDOFF banked 2026-07-22, branches unmerged.
- **Page:** the 6 areas, table count, the privacy guarantee (source-private / public-sanitized split), unmerged-branches flag, PR history.
- **Display:** portfolio/case-study card — this one's a showcase piece, style it for a hiring manager's eyes. Note the unmerged branches as an open item.
- **Dashboard:** none (it's a portfolio artifact, not active work). Career-area grouping only.

### AREA: Swift

#### Invisible String Theory ✅ (read this session)
- **Overview:** Your Taylor Swift intelligence project — decoding Easter eggs, tracking merch (Vinyl / Cardigan / Signed editions), and predicting her next moves. Context is a library of song-title `.txt` files (invisiblestring, mirrorball, hoax, madwoman, mytearsricochet, illicitaffairs…) + a merch tracker MD. Most recent chat: "Predicting Taylor Swift's next moves" (2 days ago). 8% of project capacity used.
- **Page:** current predictions/watch-list, merch tracker (what's available / wishlist / owned), Easter-egg decode log, tie-in to Swiftwatch's live change feed.
- **Display:** an intel-feed card — a running list of "signals" with dates. Pair it with Swiftwatch's live detections so predictions sit next to evidence.
- **Dashboard:** tile "Swift: last signal [date]" — fun, low-stakes, but it's active so it earns a small home presence.

#### Swiftwatch ✅ 🧠
- **Overview:** changedetection.io in Docker (`~/changedetection`, localhost:5000) watching the TS store (30 min) + taylorswift.com (2 h); ntfy topic `tayls-swiftwatch-4afd0e20` → BurntToast Windows toasts. Full chain verified 2026-07-22 (dup-toast bug fixed).
- **Page:** the 2 watches with last-check + last-change times, ntfy topic, the notification chain diagram (changedetection → Apprise → ntfy → BurntToast), Docker container status.
- **Display:** monitor card — 2 watch rows with freshness dots + a "last change detected" banner. It's the sensor; Invisible String Theory is the analyst.
- **Dashboard:** fold into the IST tile, or a tiny "watches: 2 ✓" health dot. Don't double-count on home.

### AREA: Learning

#### Fantasy Football ✅ (read this session)
- **Overview:** You're building a **Fantasy Football tracking web app for your ESPN league** ⚠️ (spanning the season — memory line truncated, verify scope). Doubles as a learn-to-code project (recents: GitHub access, guided-practice coding). Last updated Jul 14. No context files yet.
- **Page:** app build status, the ESPN league it tracks, feature checklist, repo link, "learning goals" this project is teaching you.
- **Display:** dual-purpose card — a build-progress bar + a small "skills practiced" tag row (it's half portfolio, half coursework).
- **Dashboard:** none until it ships something. Learning-area grouping.

#### Learn JavaScript ✅ 🧠
- **Overview:** Skill-building track (you self-rate beginner at JS; can edit existing code, not build from scratch). Ongoing.
- **Page:** topics covered / to-do, linked exercises, a "concepts learned" log.
- **Display:** progress/streak card — reuse the pain-tracker's streak component pattern for study consistency.
- **Dashboard:** optional study-streak tile if you want the nudge; otherwise none.

---

## 4. Home dashboard — the cross-project rollup

Don't put 16 project cards on home. Put **one Project Pulse strip** + **a handful of deadline/health tiles**. Everything else lives on the `projects` view.

**4a. Project Pulse strip** (new home section, above or beside Focus Tasks)
- Shows only `pinned = true` projects (cap ~6).
- Each row: `health dot · name · metric_value · last_activity · next_action (truncated) · →`
- Sorted by health (Red first — problems surface, not hide) then last_activity.
- Click a row → project detail page.

**4b. Health rollup KPI tile** (fits your existing KPI-tile row)
- "Projects: 9 active · 2 blocked · 3 parked" — counts by status/health.
- One glance answers "is anything on fire."

**4c. Deadline tiles** (only projects with real deadlines earn these)
- **Work-search: X/3 this week** — red Friday if unmet (GA DOL compliance is a legal deadline, highest priority).
- **SITL pending approvals: [n]** — actionable queue.
- **Observatory last synced: [time]** — if stale, trust nothing downstream.

**4d. Persistent banners** (only when true)
- 🔴 "System Horizon JSX source missing" until you restore `tayls-task-manager.jsx`.
- 🔴 "Aftermath Atlas: branch diverged / migrations orphaned" until reconciled.

**Design principle for home:** a project only earns home real-estate if it has *a number that changes* or *a deadline that bites*. Static/parked projects (Pacts, Storybook, Nonprofit PP, Ashfall) never touch home — they live on the projects grid, grouped by area. This keeps home a cockpit, not a museum.

---

## 5. Display pattern library

Reusable card templates so 16 projects don't need 16 designs. Assign each project a `kind`; the `kind` picks the template.

| `kind` | Template | Hero element | Live element |
|---|---|---|---|
| `app` | **Product card** | deploy-status pill (200 ✓ / down) | live/repo/dash link row |
| `automation` | **Pipeline strip** | 3–4 stage pills lighting green | pending-queue badge |
| `archive` | **Progress card** | episodes done/total bar | last-session date |
| `intel` | **Feed card** | running signal list w/ dates | last-detection banner |
| `content` | **Showcase card** | branded/portfolio styling | open-items list |
| `learning` | **Streak card** | study-streak / progress bar | concepts-learned count |

**Shared card chrome (every kind):** name · health dot · `area` tag · `kind` icon · last_activity · a single `next_action` line. The `next_action` line is the highest-value pixel on any project card — it's what turns "a list of projects" into "a list of what to do."

**Status color language** (reuse app-wide): 🟢 Green = moving · 🟡 Yellow = works, known trap · 🔴 Red = blocked/broken · ⚪ Idle = parked. Map `health` → these. Keep it identical to task priority colors so the whole app speaks one color language.

**Grouping on the projects grid:** group by `area` (Aftermath / Career / Ops & Infra / Swift / Learning), collapse parked areas by default. Within a group, sort by health then last_activity.

---

## 6. Watch-outs (honest reads)

1. ~~RC / Aftermath naming~~ **RESOLVED (2026-07-27):** RC = campaign+brand+site (own card); Aftermath Atlas = the app; Aftermath Meridian = its DB only, never a card. Baked into Sections 1 and 3.

2. **The claude.ai Projects list ≠ your true project list.** It's missing Swiftwatch, Storybook Resume, Nonprofit PP, and the Career-Ops tooling (they live inside other Projects or only on disk), and it *adds* "How to use Claude" (a built-in example — exclude it) and "Learn JavaScript" (arguably a skill, not a project). Don't seed the `projects` table straight from claude.ai; seed it from Section 1.

3. ~~Status goes stale by hand~~ **BUILT (2026-07-27):** see Section 7. `septentrion-sync` now stamps the projects table on every run.

4. **Don't hand-enter metric_value.** Where a real count exists (RC rolls, D20 episodes, job apps, SITL approvals), pull it live from that project's own Supabase/source on the project page. Store only a cached copy in `metric_value` for the home strip so home stays fast. Live on detail, cached on home.

---

---

## 7. How it stays live (BUILT 2026-07-27)

The projects data auto-updates from work you're already doing. No hand-maintenance.

**The chain:** every `/handoff` writes a repo's `HANDOFF.md` → `septentrion-sync` (daily 07:30 + on demand) parses all repos into `Ephemeris/<repo>.md` notes → a new script **`push-status-to-systemhorizon.ps1`** reads those notes and upserts one row per repo into the `projects` table. The SystemHorizon dashboard just reads the table.

**Files (all written this session):**
- `~/.claude/skills/septentrion-sync/push-status-to-systemhorizon.ps1` — the heartbeat.
- `run-septentrion-sync.cmd` — now runs the heartbeat right after the sync (non-fatal; can't break the chain).
- `septentrion-sync/SKILL.md` — documents it; the headless model writes notes only, never calls Supabase.

**Ownership contract** (so auto-updates never fight your manual edits):

| The heartbeat owns (overwritten every run) | You own (never touched by the script) |
|---|---|
| `id, name, area, kind, health, next_action, last_activity, repo_url` | `status, priority, description, start_date, due_date, closed_date` |

So: paste the rich per-project overviews from Section 3 into `description`, set `status`/`priority` in the UI — those stick. To rename an auto-row or change its area, edit the `$MAP` table in the script (not the UI, or the next run reverts it).

**Coverage — the honest limit.** The heartbeat covers the **8 repos** in the `septentrion-sync` REPOS list: System Horizon (taylorritchie), Aftermath Atlas, Rectrix Caedere, Sky Is The Limit, Where The Flowers Forget, Ashfall Brittania, Pacts & Power, Claude Artifacts. Projects with **no repo / no HANDOFF.md** — Invisible String Theory, Swiftwatch, Fantasy Football, Nonprofit Power Platform, Dimension 20, Storybook Resume, career-ops — are **not** auto-updated; add them manually, or add their HANDOFF.md path to the REPOS list once they have one. Verified against your live Ephemeris notes this session: 8 rows parse correctly with right health/dates. I could **not** test the Supabase write itself (no network to that project from my environment) — that's your one verification below.

### Your steps (≈2 minutes)

**Step 1 — add the 5 columns.** Supabase dashboard → project `qzliydcrlhioradwacmd` → SQL Editor → run:

```sql
ALTER TABLE projects ADD COLUMN IF NOT EXISTS kind          text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS health        text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS next_action   text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS last_activity date;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS repo_url      text;
```

(The rest of the Section 2 columns are optional until you rework the UI; add them in the same editor whenever.)

**Step 2 — run it once and confirm.** In a terminal:

```powershell
pwsh -File "C:\Users\theli\.claude\skills\septentrion-sync\push-status-to-systemhorizon.ps1"
```

Expect: `heartbeat: upserted 8 projects into SystemHorizon (...)`. If you instead see `NOT PUSHED — ... missing columns`, Step 1 didn't take. After that, open the SystemHorizon projects view — 8 rows with health dots and next-actions should be there. From then on it refreshes itself on every sync.

---

*Sources: claude.ai Projects read via browser 2026-07-27; SystemHorizon build refs (`app-state.md`, `supabase-layer.md`); memory portfolio (MEMORY.md + files); CLAUDE.md repo list. Inference markers inline. Verify ⚠️ items before seeding data.*
