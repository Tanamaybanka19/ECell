import { NextResponse, type NextRequest } from "next/server";

import { isValidAdminCredentials } from "@/lib/content/admin-credentials";

type LoginBody = { username?: unknown; password?: unknown };

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: LoginBody;
  try {
    body = (await req.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!isValidAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Incorrect credentials." }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
