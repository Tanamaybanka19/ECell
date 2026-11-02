import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Trim whitespace and strip accidental wrapping quotes from pasted values. */
function normalize(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/^["']|["']$/g, "");
  return trimmed ? trimmed : undefined;
}

const SUPABASE_URL = normalize(process.env.NEXT_PUBLIC_SUPABASE_URL);
const SUPABASE_ANON_KEY = normalize(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const SUPABASE_SERVICE_ROLE_KEY = normalize(
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

/** True when the public URL + anon key are present. */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/** True when server-side writes (service role) are available. */
export function isSupabaseWritable(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

function makeClient(key: string): SupabaseClient {
  return createClient(SUPABASE_URL as string, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Read client (anon key). Safe for server components / route handlers that
 * only need public SELECT access.
 */
export function getReadClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  return makeClient(SUPABASE_ANON_KEY as string);
}

/**
 * Admin client (service role). Bypasses RLS and must NEVER be imported into
 * a client component. Only used inside /app/api/admin/* route handlers.
 */
export function getAdminClient(): SupabaseClient | null {
  if (!isSupabaseWritable()) return null;
  return makeClient(SUPABASE_SERVICE_ROLE_KEY as string);
}
