import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { Icon, type MaterialSymbolName } from "@/components/ui/icon";
import type { PodcastEpisode, SocialLinks } from "@/lib/content/types";

function PlatformLinks({ socials }: { socials: SocialLinks }): ReactNode {
  const platforms: {
    label: string;
    href: string;
    icon: MaterialSymbolName;
  }[] = [
    { label: "Spotify", href: socials.spotify, icon: "podcasts" },
    { label: "YouTube", href: socials.youtube, icon: "play_arrow" },
    {
      label: "All platforms",
      href: socials.podcastFeed,
      icon: "rss_feed",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {platforms.map((platform) => (
        <a
          key={platform.label}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-foreground/8 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
        >
          <Icon name={platform.icon} weight={500} className="text-[18px]" />
          {platform.label}
          <Icon
            name="arrow_outward"
            className="text-[16px] text-foreground/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      ))}
    </div>
  );
}

export function PodcastEpisodes({
  episodes,
}: {
  episodes: PodcastEpisode[];
}): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <div className="flex flex-col gap-4">
          {episodes.map((episode, index) => (
            <FadeIn key={episode.id} delay={Math.min(index * 0.05, 0.3)}>
              <article className="project-card flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
                <button
                  type="button"
                  aria-label={`Play episode ${episode.number}: ${episode.title}`}
                  className="focus-ring inline-flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
                >
                  <Icon name="play_arrow" fill className="ml-0.5 text-[22px]" />
                </button>

                <div className="flex min-w-0 grow flex-col gap-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
                    {episode.number} · {episode.date}
                  </p>
                  <h2 className="text-[19px] font-medium leading-snug tracking-tight text-foreground sm:text-[21px]">
                    {episode.title}
                  </h2>
                  <p className="text-[13px] font-medium tracking-tight text-foreground/70">
                    {episode.guest}
                    <span className="font-normal text-foreground/50">
                      {" "}
                      · {episode.guestRole}
                    </span>
                  </p>
                  <p className="mt-1 text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
                    {episode.excerpt}
                  </p>
                </div>

                <div className="shrink-0 self-start rounded-full bg-foreground/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/60 ring-1 ring-foreground/8 sm:self-center">
                  {episode.duration}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export { PlatformLinks };
