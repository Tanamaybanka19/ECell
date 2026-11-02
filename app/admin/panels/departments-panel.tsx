"use client";

import type { ReactNode } from "react";

import { add, newId, remove, swap, useContent } from "@/lib/content/admin-store";

import {
  Button,
  EditorGrid,
  EmptyNote,
  IconSelectField,
  ItemCard,
  SectionCard,
  TagsField,
  TextAreaField,
  TextField,
} from "../components/fields";
import { PeopleListEditor } from "../components/people-list-editor";

export function DepartmentsPanel(): ReactNode {
  const content = useContent();

  return (
    <SectionCard
      title="Departments — the eight teams"
      actions={
        <Button
          variant="primary"
          onClick={() =>
            add("departments", {
              id: newId(),
              icon: "groups",
              name: "New department",
              tagline: "",
              description: "",
              responsibilities: [],
              heads: [],
              subheads: [],
              associates: [],
            })
          }
        >
          + Add department
        </Button>
      }
    >
      {content.departments.length === 0 ? (
        <EmptyNote>No departments yet.</EmptyNote>
      ) : (
        <div className="flex flex-col gap-3">
          {content.departments.map((dept, i) => (
            <ItemCard
              key={`${dept.id}-${i}`}
              onMoveUp={i > 0 ? () => swap("departments", i, -1) : undefined}
              onMoveDown={
                i < content.departments.length - 1
                  ? () => swap("departments", i, 1)
                  : undefined
              }
              onDelete={() => remove(`departments.${i}`)}
            >
              <EditorGrid>
                <TextField
                  label="Name"
                  path={`departments.${i}.name`}
                  value={dept.name}
                />
                <TextField
                  label="Tagline"
                  path={`departments.${i}.tagline`}
                  value={dept.tagline}
                />
                <IconSelectField
                  label="Icon"
                  path={`departments.${i}.icon`}
                  value={dept.icon}
                />
              </EditorGrid>
              <div className="mt-4">
                <TextAreaField
                  label="Description"
                  path={`departments.${i}.description`}
                  value={dept.description}
                  rows={2}
                />
              </div>
              <div className="mt-4">
                <TagsField
                  label="Responsibilities — one per line"
                  path={`departments.${i}.responsibilities`}
                  value={dept.responsibilities}
                />
              </div>
              <div className="mt-4 flex flex-col gap-4 border-t border-foreground/8 pt-4">
                <PeopleListEditor
                  label="Heads"
                  path={`departments.${i}.heads`}
                  people={dept.heads ?? []}
                />
                <PeopleListEditor
                  label="Subheads"
                  path={`departments.${i}.subheads`}
                  people={dept.subheads ?? []}
                />
                <PeopleListEditor
                  label="Associates"
                  path={`departments.${i}.associates`}
                  people={dept.associates ?? []}
                />
              </div>
            </ItemCard>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
