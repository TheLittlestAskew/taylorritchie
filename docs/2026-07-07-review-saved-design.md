# /review-saved — Design Spec

Date: 2026-07-07
Status: Approved, not yet implemented.

## Problem

The existing job pipeline (`/review-alerts` → `/apply`, plus the Resume Gap Checker → `/resume-gap-review`) only sees jobs that arrive as **email alerts** from LinkedIn/Idealist/Indeed via the 7 AM cloud routine. It has no visibility into jobs Taylor manually **saves/bookmarks** directly on LinkedIn or Idealist. `/review-saved` closes that gap.

## Source reality check (verified live 2026-07-06/07)

- **LinkedIn** (`linkedin.com/my-items/saved-jobs/`): paginated list (~9 pages / ~90 jobs at time of check), each card shows title/org/location/"Posted Xh/Xd ago". Requires an authenticated browser session — the login page itself is bot-defensive, so this only works from a browser Taylor is already logged into. No "date saved" field exists anywhere on the page.
- **Idealist** (`idealist.org/dashboard/saved-items?tab=JOB`): single page, 19 saved jobs at time of check, same shape — title/org/location/salary/"Posted X days ago". Also no "date saved" field.

**Implication:** Neither platform exposes when a job was saved, only when it was *posted*. A literal "saved in the last 24 hours" filter is not implementable from either page. The design instead uses a **diff-against-tracker** approach: anything not already in the Supabase tracker (by `post_url`) counts as new this run. This mirrors how `/review-alerts` already dedupes, and means the "last 24h" framing from the original request becomes "new since the last time this command ran."

## Flow

### 1. Scrape both sources
- Load claude-in-chrome tools. Get tab context.
- **LinkedIn**: navigate to `linkedin.com/my-items/saved-jobs/`. If redirected to a login/error page, stop and ask Taylor to log in, then continue (same pattern as `/review-alerts` Step 2b). Paginate through all pages, extract per card: title, organization, location, remote status, salary (if shown), job posting URL, posted-age text. Tag `source: "LinkedIn Saved"`.
- **Idealist**: navigate to `idealist.org/dashboard/saved-items?tab=JOB`. If logged out, ask Taylor to log in. Extract the same fields from the single page. Tag `source: "Idealist Saved"`.
- Use `read_page`/`find` (not just `get_page_text`) to capture each card's actual posting URL — link hrefs aren't in the plain-text dump.

### 2. Dedupe against Supabase
Query `SELECT post_url FROM job_applications WHERE post_url IS NOT NULL`. Drop any scraped job whose URL already exists (any status). Report counts: scraped / already tracked / new.

### 3. Cheap heuristic tag (all new jobs)
For every remaining new job, do the same fast title/keyword match against `variants-index.md` that `/review-alerts` Step 4 does. Tag each `GrantsDevelopment` / `OpsCoordination` / `SystemsOps` / `New pattern?`. This is a heuristic, not a scored fit — cheap by design.

### 4. Full fit-score — only for `New pattern?` jobs
Jobs that heuristically land in one of the 3 existing variant clusters are treated as matched; no further scoring needed to assign a resume (consistent with how `/review-alerts` already treats a clean heuristic tag as sufficient for the picker step).

For jobs tagged `New pattern?` only: browser-fetch the full posting (reuse `/review-alerts` Step 2b fetch logic — LinkedIn needs the live session, Idealist is public, Indeed n/a here), then run the same fit-scoring as `/apply` Step 2: `skills_match`, `skills_gap`, `match_percent`, `recommendation` (`Definitely` / `Can't Hurt` / `Long Shot` / `Don't Bother`).

This scoping keeps the expensive step (full fetch + LLM scoring) bounded to the ambiguous subset instead of all ~109 first-run jobs.

### 5. Gap-build check
Among `New pattern?` jobs scored `Definitely` or `Can't Hurt`, cluster by role theme (same judgment call the Resume Gap Checker routine already makes: "2+ postings sharing a similar new theme, not one-off mismatches").

- **2+ similar good-match postings, no existing variant fits** → auto-build a new resume variant immediately, no approval wait (this is the one behavioral difference from `/resume-gap-review`, which stops and asks first). Steps, matching `/resume-gap-review` Step 4a:
  1. Draft the variant from the master resume, ATS-compliant, truthful, following the same standards as the existing 3.
  2. Save locally to `C:\Users\theli\job-pipeline\resume\variants\TaylorRitchie_Resume_<ShortName>.md`.
  3. Add an entry to `variants-index.md` (target keywords, framing, "who this is for").
  4. Export an ATS-clean Google Doc to the Drive **Resumes** folder (`1eDDxghLfURGCqLaD1NOKURDZgNdnkEPk`), named `TaylorRitchie_Resume_<ShortName>_MASTER`. Update the mirrored `variants-index` Doc there too.
  5. Append to `gap-review-log.md`: `{date}: AUTO-BUILT — {gap_role_type} → {ShortName} variant (via /review-saved, {N} good-match postings)`.
  6. Assign the new variant to the triggering jobs' rows.
- **Single one-off good match, no variant fits** → tag `New pattern? (single match — no variant built)`, do not build anything. Still inserted as Discovered in Step 6.
- **`Long Shot`/`Don't Bother` `New pattern?` jobs** → tag `New pattern? (weak fit)`, no build, still inserted as Discovered.

Never fabricate experience to fill a gap — if a build reveals the cluster needs a skill Taylor doesn't have, say so plainly instead of drafting around it (same guardrail as `/resume-gap-review`).

### 6. Insert every new job as Discovered
Same insert shape as `/review-alerts` Step 5, for all new jobs regardless of match quality, with `other_notes` noting `Source: {source} | Posted: {posted_age_text}`.

### 7. Picker
Display a ranked table (index, title, org, salary, location, source, variant/match%). Ask which to run full `/apply` on — same UX as `/review-alerts` Step 4/6. Full resume+cover-letter doc generation and Gmail drafting only happens for jobs Taylor explicitly picks; the auto-build in Step 5 is scoped strictly to the resume **variant library**, never to a per-job application packet.

### 8. Report
Counts: scraped (LinkedIn / Idealist) → already tracked → new → heuristic-matched → `New pattern?` fully scored → variants auto-built → inserted as Discovered → prepped for application.

## Non-goals / constraints carried over
- No cloud/scheduled version. LinkedIn scraping requires Taylor's live authenticated browser session; this stays a manually-run local command.
- Never auto-submit or auto-send anything — same guardrail as `/apply`.
- Never fabricate experience.
- First run will be large (~109 jobs) since nothing is deduped yet; accepted as a one-time cost. Subsequent runs are small (just what's newly saved since last run).

## Open items for implementation
- Exact LinkedIn pagination mechanics (click "Next" vs URL param) — confirm during build.
- Whether Idealist's list order implies save-order (useful for display sorting even without a real timestamp) — not load-bearing for the dedupe logic either way.
