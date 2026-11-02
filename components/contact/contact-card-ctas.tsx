"use client";

import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactButton } from "./contact-button";
import { Icon } from "@/components/ui/icon";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactCardCtas({ email }: { email: string }): ReactNode {
  return (
    <LayoutGroup>
      <motion.div
        layout
        transition={{ layout: { duration: 0.55, ease: EASE } }}
        className="mt-2 flex flex-wrap items-center gap-3"
      >
        <ContactButton email={email} />

        <motion.div
          layout
          transition={{ layout: { duration: 0.55, ease: EASE } }}
        >
          <Link
            href="/contact"
            className="border border-foreground/5 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-md/2 transition-colors"
          >
            Reach the team
            <Icon
              name="arrow_forward"
              className="text-[18px] transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}
