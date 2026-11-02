import { readContent } from "./repository";
import type { SiteContent } from "./types";

// Server-side content accessor used by public pages. Reads the single
// Supabase JSONB row and falls back to the built-in defaults.
export async function getContent(): Promise<SiteContent> {
  return readContent();
}
