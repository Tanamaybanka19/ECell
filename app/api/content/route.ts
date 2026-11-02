import { NextResponse } from "next/server";

import { readContent } from "@/lib/content/repository";
import {
  isSupabaseConfigured,
  isSupabaseWritable,
} from "@/lib/supabase/server";

// Public content endpoint. Used by the admin app to hydrate from Supabase.
// `configured` lets the client keep using its local cache when Supabase keys
// are absent, instead of clobbering local edits with defaults.
export async function GET(): Promise<NextResponse> {
  const content = await readContent();
  return NextResponse.json({
    configured: isSupabaseConfigured(),
    writable: isSupabaseWritable(),
    content,
  });
}
