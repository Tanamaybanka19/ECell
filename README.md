# E-Cell SXCM

Website of the Entrepreneurship Cell, St. Xavier's College Mumbai. Next.js 16
App Router front end with a Supabase-backed content admin at `/admin`.

Brand tokens, typography and icon conventions: [`docs/design-system.md`](docs/design-system.md).

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Content | Supabase Postgres (single JSONB row) + Storage bucket for media |
| Hosting | Netlify via the OpenNext adapter (no plugin pinned) |

## Local setup

Node **22.x** is required (`engines` in `package.json`).

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |

### Supabase schema

Run [`supabase/schema.sql`](supabase/schema.sql) once in the Supabase dashboard
(SQL Editor). It creates:

- `public.state` — one row (`id = 1`) holding all site content as JSONB, with
  public `SELECT` and no anon write policy (writes go through `service_role`).
- A public `media` storage bucket (10 MB, png/jpeg/webp/gif).
- An `updated_at` trigger.

Without the schema the site still renders: `lib/content/repository.ts` falls
back to the built-in defaults in `lib/content/defaults.ts`.

## Environment variables

Copy `.env.example` to `.env.local`. Never commit real values.

| Variable | Scope | Required | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | build + runtime | yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | build + runtime | yes | Publishable/anon key, read-only under RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | runtime, server only | for admin writes | Bypasses RLS for saves and uploads |
| `ADMIN_USERNAME` | runtime | optional | Admin login (defaults to `admin`) |
| `ADMIN_PASSWORD` | runtime | optional | Admin login (defaults to `ecell-admin`) |
| `NEXT_PUBLIC_SITE_URL` | build | optional | Canonical origin for SEO tags |

Notes:

- `SUPABASE_SERVICE_ROLE_KEY` must **never** carry a `NEXT_PUBLIC_` prefix. It is
  read only by `lib/supabase/server.ts` inside `/api/admin/*` route handlers.
- Without the service role key the site is read-only: `/api/content` reports
  `writable: false`, `/api/admin/content` and `/api/admin/upload` fail, and the
  admin panel keeps edits in `localStorage` instead of Supabase.
- `NEXT_PUBLIC_*` values are inlined at build time, so changing them needs a
  redeploy rather than a restart.
- Site URL resolution order is `NEXT_PUBLIC_SITE_URL`, then Netlify's injected
  `URL`, then `https://ecell-sxcm.netlify.app` (see `lib/metadata.ts`). It feeds
  canonical links, `og:url`, `sitemap.xml` and `robots.txt`.
- The admin gate compares a shared username/password sent as request headers and
  is a prototype-grade gate: set non-default values before the site is public.

## Admin

| Route | Description |
| --- | --- |
| `/admin/login` | Posts to `/api/admin/login`, keeps the session in `sessionStorage` |
| `/admin` | Edits content, autosaves to `/api/admin/content` |

API routes: `GET /api/content` (public read + `configured`/`writable` flags),
`POST /api/admin/content` (save), `POST /api/admin/upload` (media upload).

## Deploy on Netlify

[`netlify.toml`](netlify.toml) pins the build command, publish directory and
Node 22; Next.js is handled by Netlify's OpenNext adapter, which is installed
and updated automatically, so nothing else is required.

1. In Netlify: **Add new project → Import an existing project → GitHub**, then
   pick this repository and the `main` branch.
2. Leave the detected settings alone — `netlify.toml` supplies `npm run build`,
   `.next` and `NODE_VERSION=22`.
3. Add every variable from the table above under **Site configuration →
   Environment variables**, scoped to all deploy contexts. Set
   `NEXT_PUBLIC_SITE_URL` only if you use a custom domain.
4. Deploy, then check `https://<site>/api/content` returns
   `"configured":true,"writable":true` — that confirms the functions received the
   Supabase credentials.
5. The default origin is `https://ecell-sxcm.netlify.app`. Attaching a custom
   domain later means setting `NEXT_PUBLIC_SITE_URL` to it and redeploying.

Deploying from the CLI instead: `npx netlify-cli login`, then
`npx netlify-cli init` and `npx netlify-cli deploy --build --prod`.

Caveat: image uploads pass through a Netlify Function, which caps request body
size, so very large files fail above the platform limit even though the bucket
allows 10 MB. `lib/content/image-resize.ts` resizes client-side before upload;
if an upload does fail, the client falls back to a base64 data URL stored inside
the content row, which bloats that JSONB row.

## Layout

```
app/                 routes (App Router), API handlers under app/api
app/admin/           content manager UI
components/          site sections and shared UI
lib/content/         defaults, reconciliation, repository, admin store
lib/supabase/        anon (read) and service-role (write) clients
supabase/schema.sql  database, bucket and policy setup
docs/                design system notes
```
