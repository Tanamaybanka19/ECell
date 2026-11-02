import type { ReactNode } from "react";

import { PolaroidStrip } from "@/components/ui/polaroid-strip";
import { FadeIn } from "@/components/ui/motion-primitives";
import { DottedPattern } from "@/components/ui/dotted-pattern";
import { Icon } from "@/components/ui/icon";
import type { Aftermovie } from "@/lib/content/types";

export function AftermovieGallery({
  aftermovies,
  youtubeUrl,
}: {
  aftermovies: Aftermovie[];
  youtubeUrl: string;
}): ReactNode {
  const featured = aftermovies[0];
  if (!featured) return null;
  const rest = aftermovies.slice(1);

  return (
    <section className="relative w-full">
      <div className="mx-auto flex w-full max-w-275 flex-col gap-10 px-6 pb-8 sm:px-10 sm:gap-14">
        <FadeIn>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${featured.title} on YouTube`}
            className="focus-ring group relative block aspect-video w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background shadow-sm transition-shadow hover:shadow-lg"
          >
            <DottedPattern
              size={14}
              className="absolute inset-0 opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
            <div className="absolute left-5 top-5 flex items-center gap-2.5 sm:left-7 sm:top-7">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 bg-background">
                <Icon name="movie" weight={500} className="text-[20px] text-foreground" />
              </span>
              <span className="rounded-full bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70 ring-1 ring-foreground/10">
                Featured · {featured.year}
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                <Icon name="play_arrow" fill className="ml-1 text-[30px] sm:text-[36px]" />
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-[1.875rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.375rem]">
                  {featured.title}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/55">
                  {featured.runtime} · Watch on YouTube
                </p>
              </div>
              <Icon
                name="arrow_outward"
                className="hidden text-[24px] shrink-0 text-foreground/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground sm:block"
              />
            </div>
          </a>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rest.map((video, index) => (
            <FadeIn key={video.id} delay={Math.min(index * 0.08, 0.3)}>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card focus-ring group flex items-center gap-4 rounded-3xl border border-foreground/8 bg-background p-4 sm:p-5"
                aria-label={`Watch ${video.title} on YouTube`}
              >
                <span className="relative inline-flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-foreground/5 ring-1 ring-foreground/8">
                  <DottedPattern size={8} className="absolute inset-0 opacity-60" />
                  <Icon
                    name="play_arrow"
                    fill
                    className="relative ml-0.5 text-[20px] text-foreground"
                  />
                </span>
                <div className="flex min-w-0 grow flex-col gap-0.5">
                  <p className="truncate text-[15px] font-medium tracking-tight text-foreground">
                    {video.title}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
                    {video.year} · {video.runtime}
                  </p>
                </div>
                <Icon
                  name="arrow_outward"
                  className="shrink-0 text-[18px] text-foreground/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1} className="flex flex-col gap-5 pt-4">
          <div className="flex flex-col gap-1 text-center">
            <h2 className="font-serif text-[1.875rem] font-medium tracking-tight text-foreground sm:text-[2.125rem]">
              Frames from the archive
            </h2>
            <p className="text-sm tracking-tight text-foreground/55">
              Stills our media crew dug out of the drives.
            </p>
          </div>
          <PolaroidStrip />
        </FadeIn>
      </div>
    </section>
  );
}
