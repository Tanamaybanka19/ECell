import { ContactCard } from "@/components/contact/contact-card";
import { Departments } from "@/components/departments/departments";
import { FadeIn } from "@/components/ui/motion-primitives";
import { getContent } from "@/lib/content/get-content";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Departments",
  description:
    "Meet the teams behind E-Cell: projects & partnerships, incubation & innovation, sponsorships & finance, PR & creatives, research & learning, administration, operations and filming.",
  path: "/departments",
});

export const dynamic = "force-dynamic";

export default async function DepartmentsPage(): Promise<ReactNode> {
  const content = await getContent();

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-16 sm:px-10 sm:pt-100 sm:pb-20">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <h1 className="font-serif text-[2.875rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[3.375rem] lg:text-[3.875rem]">
            The crews behind the chaos
          </h1>
          <p className="max-w-[36ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            Every member joins one department, and ends up learning a bit of
            everything.
          </p>
        </FadeIn>
      </section>
      <Departments departments={content.departments} core={content.core} />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
