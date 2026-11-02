import { NextResponse, type NextRequest } from "next/server";

import { isAuthorized, unauthorized } from "@/app/api/admin/auth";
import { writeContent } from "@/lib/content/repository";
import type { SiteContent } from "@/lib/content/types";

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(req)) return unauthorized();

  let content: SiteContent;
  try {
    content = (await req.json()) as SiteContent;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  if (!content || typeof content !== "object") {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  try {
    await writeContent(content);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
