# Contributing

This site is maintained by successive Co-op Society committees. Keep it
simple, consistent, and well-documented for whoever comes after you.

## Workflow

1. Create a feature branch from `main`: `git checkout -b feature/short-name`
2. Make focused commits with meaningful messages (present tense:
   "Add sponsor tier badges", not "added stuff").
3. Before pushing, make sure all of these pass locally:
   ```bash
   npm run typecheck
   npm run lint
   npm run format:check
   npm run test
   npm run build
   ```
4. Open a pull request. Vercel will attach a preview deployment — check your
   change on desktop and mobile widths before requesting review.
5. Squash-merge to `main` once approved. `main` deploys to production.

## Code style

- TypeScript strict mode; no `any` unless truly unavoidable.
- Server Components by default; add `"use client"` only when the component
  needs state, effects, or browser APIs.
- Reuse the primitives in `components/ui` — don't restyle buttons or
  headings ad hoc.
- Follow the existing 8px spacing rhythm and theme tokens in
  `styles/globals.css`. No hard-coded hex colours in components.
- Every image needs meaningful `alt` text (or `alt=""` if decorative).
- Comments only where the code can't speak for itself.

## Adding a managed content type

1. Create the table in a new `supabase/migrations/` file (UUID PK,
   `created_at`, `updated_at`, RLS with public read + admin write).
2. Add its domain type to `types/database.ts`.
3. Register it in `lib/admin-config.ts` — the admin dashboard UI is
   generated from that entry.
4. Add a data-access function in `lib/data.ts` (with placeholder fallback)
   and build the public page.

## Handover checklist for outgoing committees

- Transfer ownership of the Vercel project, Supabase project, and GitHub
  repository to the incoming IT Director.
- Rotate the `SUPABASE_SERVICE_ROLE_KEY` if anyone leaving had access.
- Update `profiles.is_admin` flags for the new committee.
