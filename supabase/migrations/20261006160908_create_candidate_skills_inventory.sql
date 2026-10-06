-- Private, structured resume-skills inventory.
--
-- Why it exists: job-fit scoring and resume tailoring currently re-derive Taylor's
-- capabilities from prose (cv.md, resume variants, job_applications.skills_match)
-- every single time. That is slow, inconsistent, and it is how overstated claims
-- leak in. These two tables make the inventory canonical and queryable:
-- candidate_skills is one row per capability, candidate_skill_evidence is the
-- proof behind it.
--
-- public.job_applications is NOT touched by this migration. No rows are seeded;
-- resume_ready_phrase and do_not_overstate_note are deliberately left empty so
-- that nothing in here can be mistaken for a vetted claim.
--
-- Conventions followed (from the live 2026-10-06 audit of this project):
--   * unprefixed snake_case table names, matching job_applications / session_notes
--     / repo_status / dnd_mechanics;
--   * private-data RLS is exactly the job_applications pattern: RLS on, one
--     FOR ALL policy scoped to role `authenticated`, anon fully revoked. This
--     database has no owner/user_id column on any table and no multi-user model,
--     so there is no auth.uid() scoping to copy;
--   * enum-like text columns get a named CHECK constraint;
--   * trigger functions are `language plpgsql set search_path = ''`.

-- ---------------------------------------------------------------------------
-- 1. candidate_skills
-- ---------------------------------------------------------------------------

create table public.candidate_skills (
  id                   uuid primary key default gen_random_uuid(),
  -- Human-readable canonical name, e.g. 'Power Automate'.
  skill_name           text not null,
  -- Lowercase, URL-safe stable identifier, e.g. 'power-automate'.
  skill_slug           text not null,
  category             text not null,
  proficiency_level    text not null,
  years_experience     numeric(4,1),
  last_used_date       date,
  is_current           boolean not null default true,
  -- Short, truthful, reusable phrase. Left null on purpose: a phrase written
  -- without Taylor's review is a fabricated claim.
  resume_ready_phrase  text,
  -- Guard rail against inflation, e.g. 'Salesforce: reports and list views only,
  -- never Apex'. Read by the tailoring step before any bullet is generated.
  do_not_overstate_note text,
  -- Requirement language a posting might use for this skill.
  job_search_keywords  text[] not null default '{}',
  -- Job-search lanes this skill supports.
  target_lanes         text[] not null default '{}',
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),

  constraint candidate_skills_skill_slug_key unique (skill_slug),

  constraint candidate_skills_category_check check (category = any (array[
    'systems_automation'::text,
    'data_reporting'::text,
    'crm_constituent_systems'::text,
    'operations_process'::text,
    'training_adoption'::text,
    'marketing_communications'::text,
    'nonprofit_compliance'::text,
    'professional_capability'::text
  ])),

  constraint candidate_skills_proficiency_level_check check (proficiency_level = any (array[
    'strong'::text,
    'working'::text,
    'familiarity'::text,
    'exposure'::text
  ])),

  -- Spelled out rather than relying on NULL >= 0 evaluating to NULL, so the
  -- intent ("unknown is allowed, negative is not") is readable.
  constraint candidate_skills_years_experience_check
    check (years_experience is null or years_experience >= 0)
);

create index candidate_skills_category_idx
  on public.candidate_skills (category);
create index candidate_skills_proficiency_level_idx
  on public.candidate_skills (proficiency_level);
-- GIN, not btree: these columns are queried with && / @> against a posting's
-- extracted requirement terms, never by equality on the whole array.
create index candidate_skills_job_search_keywords_gin_idx
  on public.candidate_skills using gin (job_search_keywords);
create index candidate_skills_target_lanes_gin_idx
  on public.candidate_skills using gin (target_lanes);

-- ---------------------------------------------------------------------------
-- 2. candidate_skill_evidence
-- ---------------------------------------------------------------------------

create table public.candidate_skill_evidence (
  id               uuid primary key default gen_random_uuid(),
  -- Cascade: evidence has no meaning once its skill is gone.
  skill_id         uuid not null
                     references public.candidate_skills(id) on delete cascade,
  -- Short label, e.g. 'Shelter intake workflow automation'.
  evidence_title   text not null,
  evidence_type    text not null,
  -- Factual description only. What was built, for whom, with what.
  evidence_summary text not null,
  -- Optional truthful resume-ready bullet. Null until Taylor approves wording.
  resume_bullet    text,
  -- Private Drive, portfolio, or public link.
  source_url       text,
  started_on       date,
  ended_on         date,
  is_resume_ready  boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  constraint candidate_skill_evidence_type_check check (evidence_type = any (array[
    'project'::text,
    'work_responsibility'::text,
    'achievement'::text,
    'training'::text,
    'portfolio'::text,
    'writing_sample'::text,
    'certification'::text,
    'other'::text
  ])),

  -- Ongoing work (no ended_on) and undated work are both legal; only a backwards
  -- range is rejected.
  constraint candidate_skill_evidence_date_range_check
    check (started_on is null or ended_on is null or ended_on >= started_on)
);

create index candidate_skill_evidence_skill_id_idx
  on public.candidate_skill_evidence (skill_id);
create index candidate_skill_evidence_evidence_type_idx
  on public.candidate_skill_evidence (evidence_type);
create index candidate_skill_evidence_is_resume_ready_idx
  on public.candidate_skill_evidence (is_resume_ready);

-- ---------------------------------------------------------------------------
-- 3. updated_at triggers
-- ---------------------------------------------------------------------------
-- Two functions rather than one shared helper, because this project has no
-- existing shared set_*_updated_at() function to extend and the table-specific
-- names make the owning table obvious from a pg_proc listing.

create function public.set_candidate_skills_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger candidate_skills_set_updated_at
before update on public.candidate_skills
for each row execute function public.set_candidate_skills_updated_at();

create function public.set_candidate_skill_evidence_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger candidate_skill_evidence_set_updated_at
before update on public.candidate_skill_evidence
for each row execute function public.set_candidate_skill_evidence_updated_at();

-- ---------------------------------------------------------------------------
-- 4. Row Level Security
-- ---------------------------------------------------------------------------
-- Mirrors public.job_applications: the only private table in this project.
-- Its single policy is `authenticated_full_access` -> FOR ALL TO authenticated
-- USING (true) WITH CHECK (true), with anon holding no DML privilege.
-- No row-ownership predicate exists to copy: this is a single-operator database
-- and no table here carries an owner column.
-- Policy names are prefixed with the table name, which is the dominant naming
-- style in this project (ddb_rolls_anon_select, public_sessions_anon_select, ...).

alter table public.candidate_skills enable row level security;
alter table public.candidate_skill_evidence enable row level security;

create policy candidate_skills_authenticated_full_access
  on public.candidate_skills
  for all
  to authenticated
  using (true)
  with check (true);

create policy candidate_skill_evidence_authenticated_full_access
  on public.candidate_skill_evidence
  for all
  to authenticated
  using (true)
  with check (true);

-- Stricter than job_applications' leftover REFERENCES/TRIGGER grants: anon gets
-- nothing at all. The anon key is published in website source, so anon must not
-- be able to read a resume inventory.
revoke all on table public.candidate_skills from anon;
revoke all on table public.candidate_skill_evidence from anon;

grant select, insert, update, delete on table public.candidate_skills to authenticated;
grant select, insert, update, delete on table public.candidate_skill_evidence to authenticated;
