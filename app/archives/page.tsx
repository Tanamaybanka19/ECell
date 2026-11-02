import type { ReactNode } from "react";
import Link from "next/link";
import type { Metadata } from "next";

import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { Icon, type MaterialSymbolName } from "@/components/ui/icon";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Archives",
  description:
    "The E-Cell archive: our workforce across the years, every event we have run, and all the aftermovies in between.",
  path: "/archives",
});

type ArchiveLink = {
  href: string;
  icon: MaterialSymbolName;
  title: string;
  description: string;
  meta: string;
};

const ARCHIVE_LINKS: ArchiveLink[] = [
  {
    href: "/archives/workforce",
    icon: "groups",
    title: "Workforce",
    description:
      "The people behind every event, issue and episode: core council, leads and associates.",
    meta: "24 members",
  },
  {
    href: "/archives/events",
    icon: "event",
    title: "Past Events & Works",
    description:
      "A running record of everything we have organised since day one: fests, competitions, workshops and talks.",
    meta: "2024 – 2026",
  },
  {
    href: "/archives/aftermovie",
    icon: "movie",
    title: "Aftermovie",
    description:
      "The highlight reels our media crew cuts after every flagship: proof that we work hard and film harder.",
    meta: "3 films",
  },
];

export default function ArchivesPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-16 sm:px-10 sm:pt-100 sm:pb-20">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <h1 className="font-serif text-[2.875rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[3.375rem] lg:text-[3.875rem]">
            The archive
          </h1>
          <p className="max-w-[36ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            Everything we have built, everyone who built it, and every moment
            worth rewatching.
          </p>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-275 px-6 pb-8 sm:px-10">
        <div className="flex flex-col gap-6">
          {ARCHIVE_LINKS.map((link, index) => (
            <FadeIn key={link.href} delay={Math.min(index * 0.08, 0.3)}>
              <Link
                href={link.href}
                className="project-card focus-ring group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-4xl border border-foreground/8 bg-background p-6 sm:gap-8 sm:p-8"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-foreground/10 bg-background">
                  <Icon
                    name={link.icon}
                    weight={500}
                    className="text-[24px] text-foreground"
                  />
                </span>
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="text-[20px] font-medium tracking-tight text-foreground sm:text-[24px]">
                    {link.title}
                  </span>
                  <span className="max-w-[52ch] text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
                    {link.description}
                  </span>
                  <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                    {link.meta}
                  </span>
                </span>
                <Icon
                  name="arrow_outward"
                  className="text-[24px] shrink-0 text-foreground/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground"
                />
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
