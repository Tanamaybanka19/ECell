import { NextResponse, type NextRequest } from "next/server";

import { isValidAdminCredentials } from "@/lib/content/admin-credentials";

/** True when the request carries valid shared admin credentials. */
export function isAuthorized(req: NextRequest): boolean {
  const username = req.headers.get("x-admin-user") ?? "";
  const password = req.headers.get("x-admin-password") ?? "";
  return isValidAdminCredentials(username, password);
}

export function unauthorized(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
