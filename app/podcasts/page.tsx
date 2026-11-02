import { ContactCard } from "@/components/contact/contact-card";
import {
  PlatformLinks,
  PodcastEpisodes,
} from "@/components/podcasts/podcast-episodes";
import { FadeIn } from "@/components/ui/motion-primitives";
import { getContent } from "@/lib/content/get-content";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Podcasts",
  description:
    "The Foundry, E-Cell's podcast featuring unfiltered conversations with founders, investors and builders.",
  path: "/podcasts",
});

export const dynamic = "force-dynamic";

export default async function PodcastsPage(): Promise<ReactNode> {
  const content = await getContent();

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-14 sm:px-10 sm:pt-100 sm:pb-16">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50">
            The Foundry · A podcast by E-Cell
          </p>
          <h1 className="font-serif text-[2.875rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[3.375rem] lg:text-[3.875rem]">
            Founders, unfiltered
          </h1>
          <p className="max-w-[36ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            Long-form conversations with people who are actually building,
            recorded on campus, produced by our media crew.
          </p>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-275 px-6 pb-16 sm:px-10 sm:pb-20">
        <FadeIn delay={0.1}>
          <PlatformLinks socials={content.siteConfig.socials} />
        </FadeIn>
      </section>

      <PodcastEpisodes episodes={content.podcastEpisodes} />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
