# UNSW Co-op Society Website

The official website for the UNSW Co-op Society — built with Next.js (App
Router), TypeScript, Tailwind CSS, and Supabase, deployed on Vercel.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. **No configuration is required for local
development** — when Supabase environment variables are absent, the site
serves built-in placeholder content (see `lib/placeholder-data.ts`) so every
page renders realistically. The admin dashboard and contact-message storage
require a Supabase project (below).

## Scripts

| Command                | Purpose                       |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Start the development server  |
| `npm run build`        | Production build              |
| `npm run start`        | Serve the production build    |
| `npm run lint`         | ESLint                        |
| `npm run typecheck`    | TypeScript (strict, no emit)  |
| `npm run test`         | Vitest unit + component tests |
| `npm run format`       | Prettier (write)              |
| `npm run format:check` | Prettier (check only)         |

## Environment setup

Copy `.env.example` to `.env.local` and fill in values from your Supabase
project (Dashboard → Settings → API):

| Variable                        | Scope       | Purpose                                           |
| ------------------------------- | ----------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Public      | Supabase project URL                              |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public      | Anonymous key (safe to expose; RLS protects data) |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server only | Contact-form inserts. **Never expose or commit.** |
| `NEXT_PUBLIC_SITE_URL`          | Public      | Canonical URL for SEO metadata and sitemap        |

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/migrations/00001_initial_schema.sql` in the SQL editor
   (creates all tables, triggers, RLS policies, and the `media` storage bucket).
3. Optionally run `supabase/seed.sql` for starter content.
4. Enable the **Google** provider under Authentication → Providers
   (create OAuth credentials in Google Cloud Console; set the redirect URL
   Supabase shows you).
5. Grant committee members admin access: after they sign in once, set
   `is_admin = true` on their row in `profiles` (Table editor). This is the
   only manual database step — all content is then managed at `/admin`.

### Database schema

| Table              | Purpose                                | Public read | Write                |
| ------------------ | -------------------------------------- | ----------- | -------------------- |
| `profiles`         | Auth users; `is_admin` gates the admin | Own row     | Own row              |
| `committee`        | Committee member cards                 | Active rows | Admins               |
| `events`           | Events (soft delete via `deleted_at`)  | Published   | Admins               |
| `event_images`     | Post-event photo galleries             | Yes         | Admins               |
| `gallery`          | Site-wide photo gallery                | Published   | Admins               |
| `sponsors`         | Sponsor profiles                       | Active rows | Admins               |
| `news`             | News articles (soft delete)            | Published   | Admins               |
| `resources`        | Downloadable PDFs and links            | Published   | Admins               |
| `contact_messages` | Contact form submissions               | Admins only | Service role inserts |
| `settings`         | Key–value site settings                | Yes         | Admins               |

Every table has a UUID primary key plus `created_at`/`updated_at`
(maintained by trigger). Row Level Security is enabled on all tables;
writes always require `public.is_admin()`.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import it in Vercel — the Next.js preset needs no changes.
3. Add the four environment variables (Production + Preview).
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
5. In Supabase → Authentication → URL Configuration, add the production
   domain and `https://<domain>/auth/callback` to the redirect allow-list.

Every push to `main` deploys to production; pull requests get preview
deployments automatically.

## Folder structure

```
app/                Routes (App Router). Server Components by default.
  admin/            Protected dashboard (config-driven CRUD)
  auth/callback/    OAuth code exchange
components/
  ui/               Primitives: Button, Container, Badge, FadeIn, …
  layout/           Footer
  navigation/       Header, MobileMenu
  cards/            EventCard, CommitteeCard, SponsorCard, …
  forms/            ContactForm, admin forms, field primitives
  sections/         Page-level sections (Hero, explorers, gallery grid)
lib/                Data access, Supabase clients, constants, admin config
hooks/              (reserved for shared React hooks)
types/              Domain types mirroring the database schema
utils/              Pure helpers (formatting, logging)
styles/             Tailwind theme + global CSS
supabase/           SQL migrations and seed data
tests/              Vitest unit and component tests
middleware.ts       Session refresh + /admin route guard
```

### Key design decisions

- **Placeholder fallback**: `lib/data.ts` returns placeholder content when
  Supabase isn't configured, so contributors can work on the UI without
  credentials, and a broken database degrades gracefully instead of crashing.
- **Config-driven admin**: `lib/admin-config.ts` declares each managed
  content type's fields; the `/admin/[entity]` routes generate list/create/
  edit/delete UIs from that config. Adding a content type = one config entry
  plus its table.
- **Security in depth**: RLS enforces admin-only writes at the database even
  though the UI also checks via `requireAdmin()`. The contact form inserts
  through the service role server-side; the table has no anonymous policies.
  A honeypot field provides spam protection. Global security headers are set
  in `next.config.ts`.

## Adding a new committee admin

1. They sign in once at `/login` with Google (a `profiles` row is created
   automatically).
2. An existing admin (or the Supabase dashboard owner) sets
   `is_admin = true` on their profile row.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the branch/PR workflow and code
style expectations.
