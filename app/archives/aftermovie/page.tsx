import { ContactCard } from "@/components/contact/contact-card";
import { AftermovieGallery } from "@/components/archives/aftermovie-gallery";
import { FadeIn } from "@/components/ui/motion-primitives";
import { getContent } from "@/lib/content/get-content";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Aftermovie",
  description:
    "Aftermovies and highlight films from E-Cell events, shot and cut by our media crew.",
  path: "/archives/aftermovie",
});

export const dynamic = "force-dynamic";

export default async function AftermoviePage(): Promise<ReactNode> {
  const content = await getContent();

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-16 sm:px-10 sm:pt-100 sm:pb-20">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50">
            Archives · Aftermovie
          </p>
          <h1 className="font-serif text-[2.875rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[3.375rem] lg:text-[3.875rem]">
            The highlight reels
          </h1>
          <p className="max-w-[36ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            Months of work, three minutes of glory. Every aftermovie we have
            ever cut.
          </p>
        </FadeIn>
      </section>
      <AftermovieGallery
        aftermovies={content.aftermovies}
        youtubeUrl={content.siteConfig.socials.youtube}
      />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
