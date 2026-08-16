# PROJECT_STATE.md

Last updated: 404-fix pass (all remaining admin CRUD sections built).

## What's fully working

Every route in the sidebar now resolves to a real page — no more 404s.

- **Public pages** — `/`, `/projects`, `/projects/[slug]`, `/skills`,
  `/achievements`, `/certifications`, `/roadmap`, `/journey`, `/resume`.
  All fail soft to an in-voice empty state when their table is empty or
  the DB is unreachable.
- **Auth** — `/login` redirects to `/admin/login` (one coherent flow, not
  a second system). `/admin/login` authenticates via Supabase Auth.
  `middleware.ts` gates every `/admin/*` route; the `(dashboard)` layout
  re-checks server-side too.
- **Admin CRUD, complete for every content type:**
  - Projects — list/create/edit/delete, technology picker wired to the
    `project_technologies` join table
  - Skills, Achievements, Certifications — list/create/edit/delete
  - Roadmap — list/create/edit/delete, grouped by Now/Next/Future
  - Journey — list/create/edit/delete, visible/featured toggles
  - Social links — list/create/edit/delete
  - Homepage content — edits the existing `site_settings` singleton row
  - Resume — upload/replace/remove via Supabase Storage, URL saved to
    `site_settings.resume_url`
  - Media — upload/copy-URL/delete via Supabase Storage, tracked in the
    `media` table
  - Settings — account info + sign out + environment variable status
    (deliberately doesn't duplicate the content fields already editable
    under Homepage/Resume, and doesn't invent DB columns that don't exist)
- **SEO** — `sitemap.ts`, `robots.ts`, Metadata API on every route.
- **Design system** — dark base, blueprint grid, amber signal accent,
  layered ambient background, scroll-reveal, active-route nav indicator,
  digital-module project card hover treatment, numbered section headings.

## Fixed this pass

1. **All nine 404s** (`/login`, `/admin/achievements`,
   `/admin/certifications`, `/admin/roadmap`, `/admin/journey`,
   `/admin/homepage`, `/admin/social-links`, `/admin/resume`,
   `/admin/media`, `/admin/settings`). Root cause: the sidebar always
   linked to the correct paths — the `page.tsx` files at those paths
   never existed. Not a routing bug, a missing-pages gap (already
   flagged in the previous `PROJECT_STATE.md`).
2. **The `media` table had no matching Storage bucket.** `0001_init.sql`
   created the metadata table but nothing ever provisioned the actual
   Supabase Storage bucket files would live in — so Resume/Media uploads
   would have failed regardless of any UI work. Added
   `0002_storage.sql`: a public `media` bucket with public-read /
   authenticated-write policies.
3. A `MediaLibrary` delete button was briefly wired to the
   `DeleteButton` component (built for server-action form binding) for
   what's actually client-side state management — fixed to a plain
   `onClick` handler with its own confirm step.

## Database

No existing tables were modified, dropped, or recreated. One additive
migration (`0002_storage.sql`) was added because the Storage bucket
genuinely didn't exist — not a schema change, a missing piece of
infrastructure the original migration should have included. No new
columns were invented on `site_settings` or elsewhere; the Settings page
was scoped down instead of adding fake fields to fill space.

## Components created this pass

`achievement-form`, `certification-form`, `roadmap-form`, `journey-form`,
`social-link-form`, `homepage-form`, `resume-manager`, `media-library`,
`file-upload` (shared Storage upload widget used by both Resume and
Media).

## Tested

- `npx tsc --noEmit` — clean.
- `npx next lint` — clean (no warnings).
- `npx next build` — compiles successfully; fails only at the Google
  Fonts webpack loader step, confirmed by reading the full error output
  to be the *only* failure. This sandbox has no route to
  `fonts.googleapis.com`; will build clean on any machine with normal
  outbound internet.
- Verified every sidebar link resolves to an actual `page.tsx` on disk
  (`find app/admin/(dashboard) -maxdepth 1 -type d` cross-checked
  against `Sidebar`'s href list — exact match, 11 for 11).
- Manual read-through of every new page's empty/loading/error path.

## Genuinely remaining

- **Live end-to-end testing** (actually logging in, uploading a file,
  saving a form against a real Supabase project) hasn't happened —
  this sandbox has no network path to Supabase's API, only to package
  registries. Everything here is verified by type-checking, linting,
  and build compilation, not by a live request/response cycle.
- **Gallery management** for `project_gallery` still has no admin UI
  (schema and public read path exist; only single-image fields are
  editable from the dashboard).
- **Drag-and-drop reordering** wasn't built for any content type — the
  `order` column exists everywhere but is only settable indirectly
  (insertion order) rather than via UI. Explicit reordering would need
  a client-side drag library and a batch-update action.
- Alt text for uploaded media isn't collected at upload time — the
  `media.alt_text` column exists but `MediaLibrary`'s upload flow
  doesn't prompt for it yet.
