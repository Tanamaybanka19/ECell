import type { ReactNode } from "react";

import type { Person } from "@/lib/content/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function PersonRow({ person }: { person: Person }): ReactNode {
  const hasBio = Boolean(person.bio && person.bio.trim());

  return (
    <article className="project-card flex items-center gap-4 rounded-2xl border border-foreground/8 bg-background px-4 py-3.5 sm:gap-5 sm:px-5">
      {person.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={person.image}
          alt=""
          className="h-12 w-12 shrink-0 rounded-full border border-foreground/10 object-cover sm:h-14 sm:w-14"
        />
      ) : (
        <span
          aria-hidden="true"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground/5 font-mono text-[14px] font-semibold tracking-tight text-foreground ring-1 ring-foreground/8 sm:h-14 sm:w-14 sm:text-[15px]"
        >
          {getInitials(person.name)}
        </span>
      )}
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <p className="text-[15px] font-medium tracking-tight text-foreground sm:text-[16px]">
            {person.name}
          </p>
          {person.role ? (
            <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/60 ring-1 ring-foreground/8">
              {person.role}
            </span>
          ) : null}
        </div>
        {hasBio ? (
          <p className="text-[13px] leading-[1.45] tracking-tight text-foreground/55">
            {person.bio}
          </p>
        ) : null}
      </div>
    </article>
  );
}
