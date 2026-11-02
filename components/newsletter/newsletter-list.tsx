import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { Icon } from "@/components/ui/icon";
import type { NewsletterIssue } from "@/lib/content/types";

export function NewsletterList({
  issues,
}: {
  issues: NewsletterIssue[];
}): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <div className="flex flex-col gap-4">
          {issues.map((issue, index) => (
            <FadeIn key={issue.id} delay={Math.min(index * 0.05, 0.3)}>
              <article className="project-card group flex cursor-pointer flex-col gap-3 rounded-3xl border border-foreground/8 bg-background p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-7">
                <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50 sm:w-36">
                  {issue.index}
                </p>
                <div className="flex min-w-0 grow flex-col gap-2">
                  <h2 className="text-[19px] font-medium leading-snug tracking-tight text-foreground sm:text-[21px]">
                    {issue.title}
                  </h2>
                  <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
                    {issue.excerpt}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    {issue.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] font-medium tracking-tight text-foreground/70 ring-1 ring-foreground/8"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-center sm:gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                    {issue.date}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                    Read issue
                    <Icon
                      name="arrow_outward"
                      className="text-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
