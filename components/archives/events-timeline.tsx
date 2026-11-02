import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import type { EventYearGroup, PastEvent } from "@/lib/content/types";

const TYPE_STYLES: Record<PastEvent["type"], string> = {
  Fest: "bg-foreground text-background",
  Competition: "ring-1 ring-foreground/20",
  Workshop: "ring-1 ring-foreground/20",
  Talk: "ring-1 ring-foreground/20",
  Expo: "ring-1 ring-foreground/20",
};

export function EventsTimeline({ groups }: { groups: EventYearGroup[] }): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto flex w-full max-w-160 flex-col gap-16 px-6 pb-8 sm:px-10 sm:gap-20">
        {groups.map((group) => (
          <div key={group.year} className="flex flex-col gap-6">
            <FadeIn className="flex items-center gap-4">
              <h2 className="font-serif text-[2.125rem] font-semibold leading-none tracking-tight text-foreground sm:text-[2.625rem]">
                {group.year}
              </h2>
              <span aria-hidden="true" className="h-px grow bg-foreground/10" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50">
                {group.events.length}{" "}
                {group.events.length === 1 ? "entry" : "entries"}
              </p>
            </FadeIn>
            <ol className="relative flex flex-col gap-3 border-l border-foreground/10 pl-6 sm:gap-4">
              {group.events.map((event, index) => (
                <FadeIn
                  key={event.title}
                  delay={Math.min(index * 0.05, 0.25)}
                >
                  <li className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[1.9rem] top-6 h-2 w-2 rounded-full border border-foreground/25 bg-background"
                    />
                    <article className="project-card rounded-3xl border border-foreground/8 bg-background p-6">
                      <header className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <h3 className="text-[17px] font-medium tracking-tight text-foreground sm:text-[19px]">
                          {event.title}
                        </h3>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${TYPE_STYLES[event.type]} ${
                            event.type === "Fest"
                              ? ""
                              : "font-medium tracking-[0.14em] text-foreground/70"
                          }`}
                        >
                          {event.type}
                        </span>
                        <p className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                          {event.date}
                        </p>
                      </header>
                      <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
                        {event.summary}
                      </p>
                    </article>
                  </li>
                </FadeIn>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
