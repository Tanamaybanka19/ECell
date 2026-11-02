import type { ReactNode } from "react";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";
import { DottedPattern } from "@/components/ui/dotted-pattern";
import { Icon } from "@/components/ui/icon";
import type { Flagship } from "@/lib/content/types";

function FlagshipCard({
  flagship,
  index,
}: {
  flagship: Flagship;
  index: number;
}): ReactNode {
  const iconName = flagship.icon;
  return (
    <FadeIn delay={Math.min(index * 0.08, 0.3)} className="break-inside-avoid">
      <article className="project-card flex h-full flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <div className="relative flex aspect-[16/9] w-full flex-col justify-between overflow-hidden rounded-2xl bg-foreground/5 p-5 ring-1 ring-foreground/5">
          <DottedPattern className="absolute inset-0 opacity-60" />
          <div className="relative flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/10 bg-background">
              <Icon
                name={iconName}
                weight={500}
                className="text-[18px] text-foreground"
              />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55">
              {flagship.edition}
            </span>
          </div>
          <p className="relative font-serif text-[1.875rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.125rem]">
            {flagship.name}
          </p>
        </div>

        <div className="flex grow flex-col gap-2 px-1 pb-1">
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {flagship.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-foreground/8 px-1 pb-1 pt-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
            {flagship.date}
          </p>
          <Icon
            name="arrow_outward"
            className="text-[18px] text-foreground/40 transition-colors group-hover:text-foreground"
          />
        </div>
      </article>
    </FadeIn>
  );
}

export function Flagships({
  flagships,
}: {
  flagships: Flagship[];
}): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
          <h2 className="font-serif text-[2.625rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[3.125rem] lg:text-[3.625rem]">
            Flagship initiatives
          </h2>
          <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
            The events our members build all year, and the campus shows up
            for.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {flagships.map((flagship, index) => (
            <FlagshipCard
              key={flagship.id}
              flagship={flagship}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-16">
          <Link
            href="/archives/events"
            className="focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-foreground/8 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            Explore past events
            <Icon
              name="arrow_forward"
              className="text-[18px] transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
