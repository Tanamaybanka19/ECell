import { defaultContent } from "./defaults";
import type { Department, Person, SiteContent } from "./types";

/**
 * Merge saved content over the built-in defaults, backfilling fields that
 * older saved payloads are missing (e.g. departments gained heads/subheads/
 * associates, and the top level gained `core`). Used by both the server
 * repository and the client store so stale data never crashes an editor.
 */
export function reconcileContent(saved: Partial<SiteContent>): SiteContent {
  const base: SiteContent = JSON.parse(JSON.stringify(defaultContent));
  const merged: SiteContent = { ...base, ...saved } as SiteContent;

  if (!Array.isArray(merged.core)) merged.core = base.core;

  const savedDepartments = Array.isArray(saved.departments)
    ? saved.departments
    : null;
  if (!savedDepartments) {
    merged.departments = base.departments;
    return merged;
  }

  merged.departments = savedDepartments.map((dept, i) => {
    const fallback = base.departments[i];
    const people = (key: "heads" | "subheads" | "associates"): Person[] => {
      const value = (dept as Partial<Department>)[key];
      if (Array.isArray(value)) return value;
      return fallback ? fallback[key] : [];
    };
    return {
      ...dept,
      responsibilities: Array.isArray(dept.responsibilities)
        ? dept.responsibilities
        : (fallback?.responsibilities ?? []),
      heads: people("heads"),
      subheads: people("subheads"),
      associates: people("associates"),
    } as Department;
  });

  return merged;
}
