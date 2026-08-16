# Rezwan — Portfolio + Career Dashboard

A personal portfolio site with a private, database-backed admin CMS. Public
pages are read-only and require no login; everything under `/admin` is
gated behind Supabase Auth.

See `architecture-plan.md` (in the parent conversation) for the full
rationale behind the stack and schema. This README covers running and
extending the actual code.

## Status

**Fully built:** design system, all public pages with real empty states,
Supabase auth + middleware guard, admin overview with live stats, and
complete CRUD for every content type — Projects, Skills, Achievements,
Certifications, Roadmap, Journey, Social links, Homepage content, Resume
(Supabase Storage upload), and Media (Supabase Storage library). See
`PROJECT_STATE.md` for the full detail and what's still genuinely
outstanding (gallery management, drag-and-drop reordering, alt text
capture on upload).
pattern, typically 20–30 minutes per content type.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres,
Auth, Storage) · Framer Motion · Zod · Vercel.

## Local setup

1. **Node.js 20+** required.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a [Supabase](https://supabase.com) project (free tier is fine).
4. In the Supabase SQL editor, run `supabase/migrations/0001_init.sql`,
   then `supabase/migrations/0002_storage.sql` (creates the Storage
   bucket the Resume/Media admin pages upload to). Run them in that
   order, in separate queries.
5. Copy the env template and fill it in:
   ```bash
   cp .env.example .env.local
   ```
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from
     Project Settings → API.
   - `ADMIN_EMAIL` — the one email allowed into `/admin`.
   - Create that user under Authentication → Users in the Supabase
     dashboard (invite yourself, or add directly with a password) — there
     is no public sign-up page.
   - `GITHUB_TOKEN` / `GITHUB_USERNAME` — optional, only needed for the
     `/api/github` route.
6. Run the dev server:
   ```bash
   npm run dev
   ```
7. Visit `/admin/login` and sign in with the account you created in step 5.

## Adding content

Log into `/admin`. Each content type follows the same flow: **list page →
"New" button → form → save → shows up on the public site immediately**
(pages are rendered dynamically, not statically cached). Delete requires
a confirmation prompt.

## Extending the pattern for a new content type

Every admin section follows the same shape: Zod schema in
`lib/validations/`, server actions (`create`/`update`/`delete`) under
`app/admin/(dashboard)/<section>/actions.ts`, a form component in
`components/admin/`, and `page.tsx` / `new/page.tsx` /
`[id]/edit/page.tsx`. Skills is the shortest complete example to copy if
you ever add a new content type beyond what's already here.

## Deployment

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com) (free tier).
3. Add the same environment variables from `.env.local` in the Vercel
   project settings.
4. Deploy. Vercel rebuilds automatically on every push to `main`.
5. Add a custom domain later under Vercel → Domains — no code changes
   needed.

**Database migrations going forward:** write new SQL files under
`supabase/migrations/`, numbered sequentially, and run them in the
Supabase SQL editor (or via the Supabase CLI once linked).

**Backups:** Supabase takes automatic daily backups on paid plans; on the
free tier, periodically export via Database → Backups → Download, or
`pg_dump` against the connection string in Project Settings → Database.

## Known environment note

Fonts are loaded via `next/font/google`, which fetches font files at build
time. This requires outbound internet access to `fonts.googleapis.com` —
present on Vercel and any normal dev machine, just worth knowing if you
ever build in a network-restricted sandbox.
