import Link from "next/link";
import type { ReactNode } from "react";

import { ContactCardCtas } from "./contact-card-ctas";
import { BrandIcon, type BrandName } from "@/components/ui/brand-icon";
import { Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "@/components/shaders/shader-flow";
import { getContent } from "@/lib/content/get-content";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export async function ContactCard(): Promise<ReactNode> {
  const { siteConfig } = await getContent();

  return (
    <section className="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <FadeIn>
        <div className="relative w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{
                WebkitMaskImage: CARD_FADE_MASK,
                maskImage: CARD_FADE_MASK,
              }}
            >
              <ShaderFlow scale={3} brightness={3} />
            </div>

            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="font-serif text-[2.375rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[2.875rem] lg:text-[3.375rem]">
                  Build with us
                </h2>
                <p className="mb-6 max-w-[29ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
                  Whether you have a startup idea, a collaboration pitch or
                  just curiosity, we would love to hear from you.
                </p>
                <ContactCardCtas email={siteConfig.email} />
              </div>

              <div className="flex flex-col items-center justify-center gap-6 rounded-[1.1rem] border border-foreground/8 bg-background p-6 sm:p-8">
                <div className="flex items-center gap-3 opacity-75">
                  <SocialIcon
                    href={`mailto:${siteConfig.email}`}
                    label="Email"
                    material="mail"
                  />
                  <SocialIcon
                    href={siteConfig.socials.instagram}
                    label="Instagram"
                    brand="instagram"
                  />
                  <SocialIcon
                    href={siteConfig.socials.linkedin}
                    label="LinkedIn"
                    brand="linkedin"
                  />
                  <SocialIcon
                    href={siteConfig.socials.youtube}
                    label="YouTube"
                    brand="youtube"
                  />
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-[13px] tracking-tight text-foreground/70">
                    {new Date().getFullYear()} &copy; {siteConfig.fullName}
                  </p>
                  <p className="text-[12px] tracking-tight text-foreground/45">
                    By students, for founders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  material,
  brand,
}: {
  href: string;
  label: string;
  material?: Parameters<typeof Icon>[0]["name"];
  brand?: BrandName;
}): ReactNode {
  const isExternal = href.startsWith("http");
  const props = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Link
      href={href}
      aria-label={label}
      className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-foreground/8 bg-background text-foreground/70 transition-colors hover:border-foreground/15 hover:text-foreground"
      {...props}
    >
      {brand ? (
        <BrandIcon name={brand} className="h-[18px] w-[18px]" />
      ) : (
        <Icon name={material ?? "mail"} weight={500} className="text-[20px]" />
      )}
    </Link>
  );
}
