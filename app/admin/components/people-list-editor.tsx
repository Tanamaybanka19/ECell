"use client";

import type { ReactNode } from "react";

import { add, remove, swap } from "@/lib/content/admin-store";
import type { Person } from "@/lib/content/types";

import { Button, EditorGrid, EmptyNote, TextAreaField, TextField } from "./fields";
import { ImageField } from "./image-field";

export function PeopleListEditor({
  label,
  path,
  people = [],
}: {
  label: string;
  path: string;
  people?: Person[] | undefined;
}): ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
        {label} ({people.length})
      </span>
      {people.length === 0 ? (
        <EmptyNote>No people in {label.toLowerCase()} yet.</EmptyNote>
      ) : (
        people.map((person, p) => (
          <div
            key={`${person.name}-${p}`}
            className="rounded-xl border border-foreground/8 bg-background p-3"
          >
            <EditorGrid>
              <TextField
                label="Name"
                path={`${path}.${p}.name`}
                value={person.name}
              />
              <TextField
                label="Role"
                path={`${path}.${p}.role`}
                value={person.role}
              />
            </EditorGrid>
            <div className="mt-3">
              <ImageField
                label="Photo — optional"
                path={`${path}.${p}.image`}
                value={person.image ?? ""}
              />
            </div>
            <div className="mt-3">
              <TextAreaField
                label="Bio — optional"
                path={`${path}.${p}.bio`}
                value={person.bio ?? ""}
                rows={2}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button
                onClick={() => swap(path, p, -1)}
                disabled={p === 0}
              >
                ↑
              </Button>
              <Button
                onClick={() => swap(path, p, 1)}
                disabled={p === people.length - 1}
              >
                ↓
              </Button>
              <span className="grow" />
              <Button variant="danger" onClick={() => remove(`${path}.${p}`)}>
                Remove
              </Button>
            </div>
          </div>
        ))
      )}
      <div>
        <Button
          onClick={() =>
            add(path, { name: "New person", role: "", image: "", bio: "" })
          }
        >
          + Add person
        </Button>
      </div>
    </div>
  );
}
