# Rezwan — Portfolio + Career Dashboard
## Architecture & Technical Plan (Phases 1–3)

---

## 1. Requirements Summary

- Public site: identity + Now/Achievements/Future narrative, project case studies, skills, certifications, roadmap, journey, resume.
- Private `/admin`: full CMS for every content type above, no code edits needed to publish.
- No content exists yet — empty states must be polished, not embarrassing.
- Long-term platform: today it's "Learning → Projects → Skills → Achievements," later it grows into "Business → Entrepreneurship." Schema and IA need headroom for that without a rebuild.
- Constraints: low/no budget, no current hosting/domain, must be maintainable solo for years, security matters since there's a real admin login on the public internet.

---

## 2. Stack Decision

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router) + TypeScript** | SSR/SSG hybrid gives good SEO and fast public pages; one framework serves both the public site and the admin CMS; huge ecosystem for a solo long-term project. |
| Styling | **Tailwind CSS + shadcn/ui** | shadcn's components are copy-in (not an npm black box), accessible by default (Radix primitives), and fully restyleable — avoids the "generic template" look while not building form/modal/toast primitives from scratch. |
| Animation | **Framer Motion** | Only for the Level-2 interactions you asked for (scroll reveal, hover, timeline, page transitions); respects `prefers-reduced-motion` natively. |
| Database | **Supabase Postgres** | Real relational DB (you explicitly don't want a messy single-table CMS), generous free tier, and bundles auth + storage so you're not standing up three separate services. |
| Auth | **Supabase Auth**, restricted to one admin account | You need exactly one authenticated user (you). Rolling custom auth is unnecessary risk; Supabase handles password hashing, sessions, rate limiting on auth endpoints. |
| Data access | **Supabase JS client + generated TypeScript types** (no separate ORM) | Given "don't overengineer," a full ORM (Prisma/Drizzle) is extra weight for a schema this size. Supabase's type generator gives you full type safety on queries without another abstraction layer. If the schema gets much more relational later, Drizzle is the natural upgrade path. |
| Storage | **Supabase Storage** | Project images, certs, resume PDF, journey/achievement images — one bucket system, signed upload URLs, works with the same auth. |
| GitHub data | **GitHub REST API via Octokit**, cached with Next.js `revalidate` | Avoids hard rate-limit issues; repo data is never the *only* source of a project (per your requirement), just an optional enrichment. |
| SEO | **Next.js native Metadata API** + app-router `sitemap.ts` / `robots.ts` | Built in, no extra dependency (`next-seo` would be redundant here). |
| Validation | **Zod** | Shared validation schemas between admin forms and server actions — one source of truth per content type. |
| Hosting | **Vercel (free tier)** | Git-push deploys, first-class Next.js support, generous free tier, trivial custom-domain setup later. |

**Deliberately excluded:** a headless CMS (Sanity/Contentful) — you already want a fully custom admin, so a second CMS layer would duplicate it; a state-management library — App Router server components + a bit of client state cover this; a separate ORM — justified above.

---

## 3. Database Schema

```
site_settings        -- singleton row: hero copy, "Currently" text, resume url, seo defaults
social_links          (id, platform, url, visible, order)

categories            (id, name, slug, type enum[project|skill|achievement], order)

skills                (id, name, category_id fk, level enum[learning|familiar|working_knowledge|advanced|building_with_it],
                        description, icon_url, featured, order)

projects               (id, slug, name, short_description, full_description,
                        category_id fk, status enum[planned|in_progress|completed|archived],
                        start_date, end_date, featured, thumbnail_url,
                        github_url, live_url, docs_url, video_url,
                        problem, solution, my_role, challenges, what_i_learned,
                        future_improvements, github_repo (nullable, for API enrichment), order)
project_technologies  (project_id fk, skill_id fk)      -- join table
project_gallery       (id, project_id fk, image_url, caption, order)
skill_projects        (skill_id fk, project_id fk)       -- "related projects" on a skill

achievements           (id, title, description, date, category_id fk, image_url, link, featured, order)

certifications          (id, name, issuing_org, date, credential_id, credential_url,
                        image_url, description, order)
certification_skills  (certification_id fk, skill_id fk)

roadmap_items           (id, title, description, category, stage enum[now|next|future],
                        status, priority, image_url, order)
roadmap_skills         (roadmap_item_id fk, skill_id fk)
roadmap_projects      (roadmap_item_id fk, project_id fk)

journey_entries          (id, year, title, description, category, image_url,
                        related_project_id fk (nullable), featured, visible, order)

media                  (id, url, type, alt_text, uploaded_at)   -- registry of Storage uploads
```

Every content table has an `order` column for drag-and-drop reordering in the dashboard, and most have a boolean visibility/`featured` flag so you can stage content before it goes public. Auth is handled entirely by Supabase's own `auth.users` — no custom `admin_users` table needed; the admin route guard just checks that the logged-in user's email matches one value in an environment variable.

---

## 4. Information Architecture

**Public routes**
```
/                     home (hero, Currently, featured projects, skills, achievements, journey, roadmap teaser, CTA)
/projects             filterable grid
/projects/[slug]      full case study
/skills
/achievements
/certifications
/roadmap              Now / Next / Future
/journey
/resume
```

**Admin routes** (all behind auth middleware)
```
/admin                          overview + stats
/admin/login
/admin/projects (+ /new, /[id]/edit)
/admin/skills
/admin/categories
/admin/achievements
/admin/certifications
/admin/roadmap
/admin/journey
/admin/homepage                 hero text, "Currently" block
/admin/social-links
/admin/resume
/admin/media
/admin/settings
```

---

## 5. Folder Structure

```
/app
  /(public)/            page.tsx, projects/, skills/, achievements/, certifications/, roadmap/, journey/, resume/
  /admin/                layout.tsx (auth guard), page.tsx, projects/, skills/, ...
  /api/github/route.ts
  layout.tsx, globals.css, sitemap.ts, robots.ts
/components
  /ui/                   shadcn primitives
  /site/                 public-facing sections (Hero, ProjectCard, Timeline, RoadmapBoard...)
  /admin/                CMS tables, forms, image uploader
/lib
  /supabase/             client.ts (browser), server.ts (server components), middleware.ts helpers
  /github/                octokit wrapper + cache
  /validations/          zod schemas, one per content type
  /types/                generated Supabase types
/supabase
  /migrations/            SQL migration files
middleware.ts             protects /admin/*
.env.example
```

---

## 6. Auth & Security

- Single admin account in Supabase Auth; `/admin` middleware checks session + that the email matches `ADMIN_EMAIL` env var — no public sign-up path exists anywhere.
- All writes happen through Next.js Server Actions (never client-side direct-to-DB calls), so every mutation is validated with Zod and re-checks the session server-side.
- Row Level Security on every Supabase table: public tables are read-only to `anon`, writable only to the authenticated admin.
- File uploads validated by type/size before hitting Storage; signed upload URLs, not public write access to buckets.
- Rate limiting on the login route (Supabase Auth has this built in).
- No secrets in client bundles — anything sensitive stays in Server Components/Actions and env vars.

---

## 7. Visual Direction

- **Palette:** near-black background (`#0A0A0B`), off-white text (`#F2F2F0`), a single restrained accent — a desaturated amber or cyan used sparingly for links/highlights/status dots, not gradients.
- **Type:** a geometric/technical sans for headings (e.g. Inter Tight or Söhne-adjacent), a monospace accent for metadata, dates, status labels, and code-like details (project stack tags, roadmap stage labels) to reinforce the "engineering" feel without leaning on neon or glass.
- **Texture:** faint 1px grid/blueprint lines as a background layer on hero/section dividers — subtle, not decorative noise.
- **Motion:** scroll-reveal on section entry, hover-lift on cards, animated Now/Next/Future roadmap transitions, page transitions on route change — everything gated behind `prefers-reduced-motion`.
- **Empty states:** written in-voice ("The workshop is currently quiet. New builds are coming.") rather than generic "No data" messages, per your spec.

---

## 8. Next Steps

Once you confirm this direction (or want changes to the stack/schema), the build proceeds in the phases you outlined: design system → database migrations → auth → admin dashboard → public site → project system → GitHub integration → animation/SEO/accessibility pass → testing → deployment docs → README.
