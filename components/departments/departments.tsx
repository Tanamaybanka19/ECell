import type { ReactNode } from "react";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";
import { Icon } from "@/components/ui/icon";
import { PersonRow } from "@/components/people/person-row";
import type { Department, Person } from "@/lib/content/types";

const PEOPLE_GROUPS: { key: "heads" | "subheads"; label: string }[] = [
  { key: "heads", label: "Heads" },
  { key: "subheads", label: "Subheads" },
];

function hasPeople(department: Department): boolean {
  return PEOPLE_GROUPS.some((group) => department[group.key].length > 0);
}

function DepartmentCard({
  department,
  index,
}: {
  department: Department;
  index: number;
}): ReactNode {
  const iconName = department.icon;
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card flex flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-5 sm:p-6">
        <header className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background">
            <Icon name={iconName} weight={500} className="text-[20px] text-foreground" />
          </span>
          <div className="flex min-w-0 flex-col">
            <h3 className="text-[18px] font-medium leading-tight tracking-tight text-foreground sm:text-[20px]">
              {department.name}
            </h3>
            <p className="text-[12px] tracking-tight text-foreground/50">
              {department.tagline}
            </p>
          </div>
        </header>

        <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
          {department.description}
        </p>

        <ul className="flex flex-wrap gap-1.5" aria-label="Responsibilities">
          {department.responsibilities.map((item) => (
            <li
              key={item}
              className="rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] font-medium tracking-tight text-foreground/70 ring-1 ring-foreground/8"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </FadeIn>
  );
}

export type DepartmentsProps = {
  departments: Department[];
  core: Person[];
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

function PeopleSection({
  title,
  people,
}: {
  title: string;
  people: Person[];
}): ReactNode {
  return (
    <div className="flex flex-col gap-4">
      <FadeIn className="flex flex-col gap-2">
        <h2 className="font-serif text-[1.875rem] font-medium tracking-tight text-foreground sm:text-[2.125rem]">
          {title}
        </h2>
        <span className="h-px w-full bg-foreground/8" />
      </FadeIn>
      <div className="flex flex-col gap-3">
        {people.map((person, index) => (
          <FadeIn key={`${person.name}-${index}`} delay={Math.min(index * 0.03, 0.2)}>
            <PersonRow person={person} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function DepartmentPeople({ department }: { department: Department }): ReactNode {
  if (!hasPeople(department)) return null;

  return (
    <FadeIn className="flex flex-col gap-8 border-t border-foreground/8 pt-12 sm:pt-16">
      <h2 className="font-serif text-[1.875rem] font-medium tracking-tight text-foreground sm:text-[2.125rem]">
        {department.name}
      </h2>
      {PEOPLE_GROUPS.map((group) => {
        const people = department[group.key];
        if (people.length === 0) return null;
        return (
          <div key={group.key} className="flex flex-col gap-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/45">
              {group.label}
            </h3>
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
          </div>
        );
      })}
    </FadeIn>
  );
}

export function Departments({
  departments,
  core,
  withHeadline = false,
  viewMoreVisible = false,
}: DepartmentsProps): ReactNode {
  const items = viewMoreVisible ? departments.slice(0, 4) : departments;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.625rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[3.125rem] lg:text-[3.625rem]">
              Our departments
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Eight teams, one mission. Every event, issue and episode is
              built by students across these crews.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((department, index) => (
            <DepartmentCard
              key={department.id}
              department={department}
              index={index}
            />
          ))}
        </div>
        {!viewMoreVisible ? (
          <div className="mt-14 flex flex-col gap-14 sm:mt-20 sm:gap-20">
            {core.length > 0 ? (
              <PeopleSection title="Core" people={core} />
            ) : null}
            {items.map((department) => (
              <DepartmentPeople key={department.id} department={department} />
            ))}
          </div>
        ) : null}

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/departments"
              className="focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-foreground/8 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              View all departments
              <Icon
                name="arrow_forward"
                className="text-[18px] transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
