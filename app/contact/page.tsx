import type { ReactNode } from "react";
import Link from "next/link";
import type { Metadata } from "next";

import { ContactButton } from "@/components/contact/contact-button";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { Icon, type MaterialSymbolName } from "@/components/ui/icon";
import { BrandIcon, type BrandName } from "@/components/ui/brand-icon";
import { getContent } from "@/lib/content/get-content";
import { createMetadata, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.fullName}: partnerships, recruitment and everything in between.`,
  path: "/contact",
});

export const dynamic = "force-dynamic";

export default async function ContactPage(): Promise<ReactNode> {
  const content = await getContent();
  const contact = content.contactPage;
  const { siteConfig: settings } = content;
  const instagramHref = settings.socials.instagram;
  const socials: { label: string; href: string; brand: BrandName }[] = [
    { label: "Instagram", href: settings.socials.instagram, brand: "instagram" },
    { label: "LinkedIn", href: settings.socials.linkedin, brand: "linkedin" },
    { label: "YouTube", href: settings.socials.youtube, brand: "youtube" },
    { label: "X", href: settings.socials.x, brand: "x" },
  ];

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-14 sm:px-10 sm:pt-100 sm:pb-16">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <h1 className="font-serif text-[2.875rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[3.375rem] lg:text-[3.875rem]">
            {contact.heading}
          </h1>
          <p className="max-w-[36ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            {contact.subhead}
          </p>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-160 px-6 pb-8 sm:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {contact.infoBlocks.map((block, index) => (
            <FadeIn key={block.title} delay={Math.min(index * 0.08, 0.3)}>
              <article className="project-card flex h-full flex-col gap-3 rounded-3xl border border-foreground/8 bg-background p-6 sm:p-7">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/10 bg-background">
                  <Icon
                    name={block.icon as MaterialSymbolName}
                    weight={500}
                    className="text-[20px] text-foreground"
                  />
                </span>
                <h2 className="text-[17px] font-medium tracking-tight text-foreground sm:text-[18px]">
                  {block.title}
                </h2>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[14px] font-medium tracking-tight text-foreground/80">
                    {block.line1}
                  </p>
                  <p className="text-[13px] tracking-tight text-foreground/55">
                    {block.line2}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15}>
          <article className="project-card mt-4 flex flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-[17px] font-medium tracking-tight text-foreground sm:text-[18px]">
                {contact.followHeading}
              </h2>
              <div className="flex items-center gap-2.5 opacity-75">
                {socials.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="focus-ring inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-foreground/8 bg-background text-foreground/70 transition-colors hover:border-foreground/15 hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BrandIcon
                      name={social.brand}
                      className="h-[18px] w-[18px]"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-foreground/8 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              {contact.instagramHandle}
              <Icon
                name="arrow_outward"
                className="text-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </article>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-4">
          <div className="flex justify-center py-6">
            <ContactButton
              label={`Copy ${settings.email}`}
              email={settings.email}
            />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
