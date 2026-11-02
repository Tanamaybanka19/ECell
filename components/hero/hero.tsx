import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "@/components/shaders/shader-flow";
import type { Hero as HeroContent } from "@/lib/content/types";

const HERO_CARD_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export function Hero({
  hero,
  siteName,
}: {
  hero: HeroContent;
  siteName: string;
}): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="inline-flex items-center gap-2 text-[15px] font-medium tracking-tight text-foreground/60">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-foreground"
              />
              {siteName}
            </p>

            <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.625rem] lg:text-[3.65rem]">
              <span className="block whitespace-nowrap">{hero.headingLine1}</span>
              <span className="block whitespace-nowrap">{hero.headingLine2}</span>
            </h1>

            <p className="max-w-[34ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">
              {hero.subhead}
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div className="relative aspect-square w-full md:max-w-105 overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-55 dark:opacity-35"
                  style={{
                    WebkitMaskImage: HERO_CARD_MASK,
                    maskImage: HERO_CARD_MASK,
                  }}
                >
                  <ShaderFlow scale={3} brightness={3} />
                </div>
                <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                    {hero.cardTop}
                  </p>
                  <p className="font-serif text-6xl font-semibold italic leading-none tracking-tight text-foreground sm:text-7xl">
                    E<span aria-hidden="true" className="mx-1 not-italic">·</span>Cell
                  </p>
                  <div
                    aria-hidden="true"
                    className="flex items-center gap-2 text-foreground/40"
                  >
                    <span className="h-px w-8 bg-current" />
                    <span className="h-1 w-1 rounded-full bg-current" />
                    <span className="h-px w-8 bg-current" />
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                    {hero.cardBottom}
                  </p>
                </div>
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
