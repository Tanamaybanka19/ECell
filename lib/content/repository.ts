import { defaultContent } from "./defaults";
import { reconcileContent } from "./reconcile";
import type { SiteContent } from "./types";
import { getAdminClient, getReadClient } from "@/lib/supabase/server";

const STATE_ID = 1;
const MEDIA_BUCKET = "media";

/**
 * Read the whole site content from Supabase (single JSONB row). Falls back to
 * the built-in defaults when Supabase is not configured or the row is empty.
 */
export async function readContent(): Promise<SiteContent> {
  try {
    const client = getReadClient();
    if (!client) return defaultContent;

    const { data, error } = await client
      .from("state")
      .select("data")
      .eq("id", STATE_ID)
      .maybeSingle();

    if (error || !data?.data) return defaultContent;

    return reconcileContent(data.data as Partial<SiteContent>);
  } catch {
    return defaultContent;
  }
}

/** Persist the whole site content to Supabase. Server-only. */
export async function writeContent(content: SiteContent): Promise<void> {
  const client = getAdminClient();
  if (!client) {
    throw new Error(
      "Supabase is not configured for writes (missing SUPABASE_SERVICE_ROLE_KEY).",
    );
  }

  const { error } = await client
    .from("state")
    .upsert({ id: STATE_ID, data: content }, { onConflict: "id" });

  if (error) throw new Error(error.message);
}

/** Upload an image to the public `media` bucket and return its public URL. */
export async function uploadMedia(file: File): Promise<string> {
  const client = getAdminClient();
  if (!client) {
    throw new Error(
      "Supabase is not configured for uploads (missing SUPABASE_SERVICE_ROLE_KEY).",
    );
  }

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const safeExt = /^[a-z0-9]+$/.test(ext) ? ext : "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${safeExt}`;

  const { error } = await client.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new Error(error.message);

  const { data } = client.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
