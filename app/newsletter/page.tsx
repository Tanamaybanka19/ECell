import { ContactCard } from "@/components/contact/contact-card";
import { NewsletterList } from "@/components/newsletter/newsletter-list";
import { SubscribeBox } from "@/components/newsletter/subscribe-box";
import { FadeIn } from "@/components/ui/motion-primitives";
import { getContent } from "@/lib/content/get-content";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Newsletter",
  description:
    "The Venture Ledger: the E-Cell newsletter decoding startups, markets and the Mumbai hustle, one issue at a time.",
  path: "/newsletter",
});

export const dynamic = "force-dynamic";

export default async function NewsletterPage(): Promise<ReactNode> {
  const content = await getContent();

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-14 sm:px-10 sm:pt-100 sm:pb-16">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50">
            The Venture Ledger · Monthly
          </p>
          <h1 className="font-serif text-[2.875rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[3.375rem] lg:text-[3.875rem]">
            Startup stories,
            <br />
            written by students
          </h1>
          <p className="max-w-[36ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            One deep-dive into the startup world every month, researched,
            written and edited entirely by our content crew.
          </p>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-275 px-6 pb-16 sm:px-10 sm:pb-20">
        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center gap-4 rounded-4xl border border-foreground/8 bg-foreground/1.5 p-8 text-center dark:bg-foreground/3 sm:p-10">
            <h2 className="font-serif text-[1.625rem] font-medium tracking-tight text-foreground sm:text-[1.75rem]">
              Never miss an issue
            </h2>
            <p className="max-w-[40ch] text-sm leading-relaxed tracking-tight text-foreground/60">
              Get The Venture Ledger in your inbox on the first Monday of
              every month. No spam, unsubscribe anytime.
            </p>
            <SubscribeBox />
          </div>
        </FadeIn>
      </section>

      <NewsletterList issues={content.newsletterIssues} />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
