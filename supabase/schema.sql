-- E-Cell SXCM — Supabase backend
-- =================================
-- Run once in: Supabase Dashboard > SQL Editor > New query > paste > Run.
-- Creates the content table, a public media bucket, and access policies.
--
-- Access model:
--   * Anyone (anon) may READ content  -> public website.
--   * Only the server (service_role) may WRITE content / upload media.
--     The service_role key is never sent to the browser; it lives in
--     SUPABASE_SERVICE_ROLE_KEY and is used only by /app/api/admin/* routes,
--     which are gated by the shared admin username/password.

-- 1) Content state — one JSONB row (id = 1) holds the whole site's content.
create table if not exists public.state (
  id integer primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.state enable row level security;

drop policy if exists "state public read" on public.state;
create policy "state public read" on public.state
  for select using (true);

-- No anon/authenticated write policies: writes go through service_role,
-- which bypasses RLS. This keeps the anon key read-only.

-- Seed an empty row so reads never fail; the app backfills defaults.
insert into public.state (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- 2) Media storage bucket — public read, server-side upload/delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true,
  10485760,
  array['image/png','image/jpeg','image/webp','image/gif']
)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');

-- Uploads/deletes use service_role (bypasses RLS), so no anon write policy.

-- 3) Keep updated_at fresh on writes.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists state_set_updated_at on public.state;
create trigger state_set_updated_at
  before update on public.state
  for each row execute function public.set_updated_at();
