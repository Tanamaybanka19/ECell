import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { PersonRow } from "@/components/people/person-row";
import type { Department, Person } from "@/lib/content/types";

const PEOPLE_GROUPS: {
  key: "heads" | "subheads" | "associates";
  label: string;
}[] = [
  { key: "heads", label: "Heads" },
  { key: "subheads", label: "Subheads" },
  { key: "associates", label: "Associates" },
];

function hasPeople(department: Department): boolean {
  return PEOPLE_GROUPS.some((group) => department[group.key].length > 0);
}

function PersonList({ people }: { people: Person[] }): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      {people.map((person, index) => (
        <FadeIn
          key={`${person.name}-${index}`}
          delay={Math.min(index * 0.03, 0.2)}
        >
          <PersonRow person={person} />
        </FadeIn>
      ))}
    </div>
  );
}

function DepartmentSection({
  department,
}: {
  department: Department;
}): ReactNode {
  if (!hasPeople(department)) return null;

  return (
    <div className="flex flex-col gap-6">
      <FadeIn className="flex flex-col gap-1">
        <h3 className="font-serif text-[1.5rem] font-medium tracking-tight text-foreground sm:text-[1.75rem]">
          {department.name}
        </h3>
        <p className="text-sm tracking-tight text-foreground/55">
          {department.tagline}
        </p>
      </FadeIn>
      <div className="flex flex-col gap-6">
        {PEOPLE_GROUPS.map((group) => {
          const people = department[group.key];
          if (people.length === 0) return null;
          return (
            <div key={group.key} className="flex flex-col gap-3">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/45">
                {group.label}
              </h4>
              <PersonList people={people} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WorkforceGrid({
  core,
  departments,
}: {
  core: Person[];
  departments: Department[];
}): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto flex w-full max-w-275 flex-col gap-14 px-6 pb-8 sm:gap-20 sm:px-10">
        {core.length > 0 ? (
          <div className="flex flex-col gap-6">
            <FadeIn className="flex flex-col gap-1">
              <h2 className="font-serif text-[1.875rem] font-medium tracking-tight text-foreground sm:text-[2.125rem]">
                Core
              </h2>
              <p className="text-sm tracking-tight text-foreground/55">
                The chairperson and vice chairpersons who lead the cell
              </p>
            </FadeIn>
            <PersonList people={core} />
          </div>
        ) : null}

        {departments.map((department) => (
          <DepartmentSection key={department.id} department={department} />
        ))}
      </div>
    </section>
  );
}
