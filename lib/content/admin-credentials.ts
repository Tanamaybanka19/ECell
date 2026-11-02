// Shared admin gate for the prototype.
// The display constant is safe to bundle in the client;
// the actual check honours ADMIN_USERNAME / ADMIN_PASSWORD on the server,
// falling back to the env-set values below when not overridden.
// — In production these are set via Netlify env vars; local dev should
// also have matching values in .env.local so login behaves consistently.
export const ADMIN_CREDENTIALS = {
  username: "ecell_admin",
  password: "secure-admin-pass",
} as const;

export function isValidAdminCredentials(
  username: string,
  password: string,
): boolean {
  const expectedUsername =
    process.env.ADMIN_USERNAME ?? ADMIN_CREDENTIALS.username;
  const expectedPassword =
    process.env.ADMIN_PASSWORD ?? ADMIN_CREDENTIALS.password;

  return (
    username.trim().toLowerCase() === expectedUsername.trim().toLowerCase() &&
    password === expectedPassword
  );
}
