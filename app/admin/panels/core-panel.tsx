"use client";

import type { ReactNode } from "react";

import { useContent } from "@/lib/content/admin-store";

import { SectionCard } from "../components/fields";
import { PeopleListEditor } from "../components/people-list-editor";

export function CorePanel(): ReactNode {
  const content = useContent();

  return (
    <SectionCard title="Core — Chairperson & Vice Chairperson(s)">
      <p className="mb-4 max-w-[60ch] text-[13px] leading-relaxed tracking-tight text-foreground/55">
        The leadership of the cell. Add the chairperson first, then any number
        of vice chairpersons. Each person can have an optional photo and bio.
      </p>
      <PeopleListEditor label="Core members" path="core" people={content.core} />
    </SectionCard>
  );
}
