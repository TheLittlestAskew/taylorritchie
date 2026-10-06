-- One skill must not carry the same evidence_title twice.
--
-- Why: the 2026-10-06 evidence fan-out added 36 secondary rows whose evidence_title
-- deliberately MATCHES their primary record, so that `group by evidence_title` returns every
-- skill a given project proves and the full prose lives in exactly one row. That design makes
-- title a meaningful key — and it also made re-running the fan-out silently duplicate all 36
-- rows, with nothing in the schema to stop it.
--
-- Checked before applying, not assumed:
--   select count(*) from (select skill_id, evidence_title
--     from public.candidate_skill_evidence group by 1,2 having count(*) > 1) d;   -->  0
-- Existing data already satisfied the constraint, so this is additive and cannot fail on
-- live rows. Per NORTH_STAR-style practice, a constraint is only added once a count query
-- proves the current rows satisfy it.
--
-- Verified after applying, by REJECTION rather than by reading this file: re-inserting an
-- existing (skill_id, evidence_title) pair raises SQLSTATE 23505. Probe rolled back.
alter table public.candidate_skill_evidence
  add constraint candidate_skill_evidence_skill_id_title_key
  unique (skill_id, evidence_title);
