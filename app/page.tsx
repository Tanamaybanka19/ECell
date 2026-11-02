import { ContactCard } from "@/components/contact/contact-card";
import { Departments } from "@/components/departments/departments";
import { Flagships } from "@/components/home/flagships";
import { Stats } from "@/components/home/stats";
import { Hero } from "@/components/hero/hero";
import { FadeIn } from "@/components/ui/motion-primitives";
import { getContent } from "@/lib/content/get-content";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description: `Welcome to ${siteConfig.fullName}. ${siteConfig.description}`,
  path: "/",
});

export const dynamic = "force-dynamic";

function renderRichText(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default async function HomePage(): Promise<ReactNode> {
  const content = await getContent();

  return (
    <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
      <Hero hero={content.hero} siteName={content.siteConfig.fullName} />
      <Stats stats={content.stats} />
      <section className="mx-auto w-full max-w-160 px-6 sm:px-10">
        <FadeIn>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <h2 className="font-serif text-[1.875rem] font-medium tracking-tight text-foreground sm:text-[2.125rem]">
              {content.whoWeAre.heading}
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[17px]">
              {content.whoWeAre.paragraphs.map((paragraph, i) => (
                <p key={i}>{renderRichText(paragraph)}</p>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
      <Departments
        departments={content.departments}
        core={content.core}
        withHeadline
        viewMoreVisible
      />
      <Flagships flagships={content.flagships} />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
