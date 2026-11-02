// Shared admin gate for the prototype. The display constant is safe to bundle
// in the client; the actual check also honours ADMIN_USERNAME / ADMIN_PASSWORD
// on the server (falling back to the defaults below).
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "ecell-admin",
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
