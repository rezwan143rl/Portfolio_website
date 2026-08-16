-- 0001_init.sql
-- Run this in the Supabase SQL editor, or via `supabase db push` once the
-- CLI is linked to your project. Safe to run once against a fresh project.

create extension if not exists "pgcrypto";

-- ─── Categories (shared by projects, skills, achievements) ─────────────────
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  type text not null check (type in ('project', 'skill', 'achievement')),
  "order" integer not null default 0
);

-- ─── Skills ──────────────────────────────────────────────────────────────
create table skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_id uuid references categories(id) on delete set null,
  level text not null check (level in ('learning', 'familiar', 'working_knowledge', 'advanced', 'building_with_it')),
  description text,
  icon_url text,
  featured boolean not null default false,
  "order" integer not null default 0
);

-- ─── Projects ────────────────────────────────────────────────────────────
create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text not null,
  full_description text,
  category_id uuid references categories(id) on delete set null,
  status text not null default 'planned' check (status in ('planned', 'in_progress', 'completed', 'archived')),
  start_date date,
  end_date date,
  featured boolean not null default false,
  thumbnail_url text,
  github_url text,
  live_url text,
  docs_url text,
  video_url text,
  problem text,
  solution text,
  my_role text,
  challenges text,
  what_i_learned text,
  future_improvements text,
  github_repo text,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table project_technologies (
  project_id uuid references projects(id) on delete cascade,
  skill_id uuid references skills(id) on delete cascade,
  primary key (project_id, skill_id)
);

create table project_gallery (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  image_url text not null,
  caption text,
  "order" integer not null default 0
);

create table skill_projects (
  skill_id uuid references skills(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  primary key (skill_id, project_id)
);

-- ─── Achievements ────────────────────────────────────────────────────────
create table achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date date,
  category_id uuid references categories(id) on delete set null,
  image_url text,
  link text,
  featured boolean not null default false,
  "order" integer not null default 0
);

-- ─── Certifications ──────────────────────────────────────────────────────
create table certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuing_org text not null,
  date date,
  credential_id text,
  credential_url text,
  image_url text,
  description text,
  "order" integer not null default 0
);

create table certification_skills (
  certification_id uuid references certifications(id) on delete cascade,
  skill_id uuid references skills(id) on delete cascade,
  primary key (certification_id, skill_id)
);

-- ─── Roadmap ─────────────────────────────────────────────────────────────
create table roadmap_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  stage text not null check (stage in ('now', 'next', 'future')),
  status text,
  priority integer,
  image_url text,
  "order" integer not null default 0
);

create table roadmap_skills (
  roadmap_item_id uuid references roadmap_items(id) on delete cascade,
  skill_id uuid references skills(id) on delete cascade,
  primary key (roadmap_item_id, skill_id)
);

create table roadmap_projects (
  roadmap_item_id uuid references roadmap_items(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  primary key (roadmap_item_id, project_id)
);

-- ─── Journey ─────────────────────────────────────────────────────────────
create table journey_entries (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title text not null,
  description text,
  category text,
  image_url text,
  related_project_id uuid references projects(id) on delete set null,
  featured boolean not null default false,
  visible boolean not null default true,
  "order" integer not null default 0
);

-- ─── Site-wide content ───────────────────────────────────────────────────
create table social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  visible boolean not null default true,
  "order" integer not null default 0
);

create table site_settings (
  id integer primary key default 1 check (id = 1), -- singleton row
  hero_headline text not null default 'Building at the intersection of technology, engineering, automation and business.',
  hero_subline text not null default '[ADD YOUR INTRODUCTION]',
  currently_text text not null default '[ADD YOUR CURRENT FOCUS]',
  resume_url text
);
insert into site_settings (id) values (1);

create table media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  type text,
  alt_text text,
  uploaded_at timestamptz not null default now()
);

-- ─── updated_at trigger for projects ─────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_set_updated_at
before update on projects
for each row execute function set_updated_at();

-- ─── Row Level Security ──────────────────────────────────────────────────
-- Public (anon) role: read-only on every table.
-- Authenticated role: full access — access itself is restricted at the
-- application layer (middleware + layout checks) to the single admin email,
-- since Supabase Auth on this project has no public sign-up path.

do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'categories', 'skills', 'projects', 'project_technologies', 'project_gallery',
      'skill_projects', 'achievements', 'certifications', 'certification_skills',
      'roadmap_items', 'roadmap_skills', 'roadmap_projects', 'journey_entries',
      'social_links', 'site_settings', 'media'
    ])
  loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "%I public read" on %I for select using (true)', t, t);
    execute format('create policy "%I authenticated write" on %I for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'')', t, t);
  end loop;
end $$;
