# Supabase migrations — project `vtrtyagltwdrbastpppl`

This directory tracks schema for the Supabase project behind `tracker.html`
(job applications + GDOL work search) and the D&D roll/session tables.

## ⚠️ This history does not start at migration 1

The first **31** migrations on this project were applied live via the Supabase
MCP and were never written to disk. `20261006160908_create_candidate_skills_inventory.sql`
is the first one versioned here. Run `list_migrations` against the project for
the full applied list; do not assume this directory is complete.

## Rules for new migrations here

- One timestamped file per change: `YYYYMMDDHHMMSS_snake_case_name.sql`.
- The filename timestamp must match the `version` that `list_migrations` reports
  after applying. The MCP assigns its own timestamp, so rename the file to match
  rather than letting file and live state drift apart.
- Apply live via Supabase MCP `apply_migration`, then confirm with `list_migrations`.
- Private tables follow the `job_applications` pattern: RLS enabled, one
  `FOR ALL TO authenticated USING (true) WITH CHECK (true)` policy,
  `revoke all ... from anon`. This project has no owner column and no
  multi-user model, so there is no `auth.uid()` scoping.
- Enum-like `text` columns get a named `CHECK` constraint.
- Trigger functions are `language plpgsql set search_path = ''`.
