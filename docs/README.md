# Documentation

Project docs live in two places. Setup and deploy instructions stay in the root
[`README.md`](../README.md) so they appear on the repository landing page and
cannot drift from a second copy.

| Document | Covers |
| --- | --- |
| [Project README](../README.md) | Local setup, Supabase schema, environment variables, admin routes, Netlify deploy steps |
| [Design system](./design-system.md) | Brand palette, typography, icon conventions, and the changes made to implement them |

## Local setup, in brief

The full instructions are in the [project README](../README.md#local-setup).
Quick version, Node 22.x:

```bash
npm install
cp .env.example .env.local   # fill in Supabase + admin values
npm run dev                  # http://localhost:3000
```

Run [`supabase/schema.sql`](../supabase/schema.sql) once in the Supabase SQL
Editor to create the `state` table and `media` bucket. Without it the site still
renders from the defaults in `lib/content/defaults.ts`.

## Environment variables and deploy

See [Environment variables](../README.md#environment-variables) and
[Deploy on Netlify](../README.md#deploy-on-netlify). The short version: supply
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
`SUPABASE_SERVICE_ROLE_KEY` in Netlify's environment variables, otherwise the
admin can read but neither save content nor upload images.
