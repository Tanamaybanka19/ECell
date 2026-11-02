"use client";

import type { ReactNode } from "react";

import { add, remove, swap, useContent } from "@/lib/content/admin-store";

import {
  Button,
  EditorGrid,
  EmptyNote,
  ItemCard,
  SectionCard,
  TextField,
} from "../components/fields";

export function WorkforcePanel(): ReactNode {
  const content = useContent();

  return (
    <SectionCard
      title="Workforce"
      actions={
        <Button
          variant="primary"
          onClick={() =>
            add("workforce", {
              title: "New group",
              note: "",
              members: [],
            })
          }
        >
          + Add group
        </Button>
      }
    >
      {content.workforce.length === 0 ? (
        <EmptyNote>No groups yet.</EmptyNote>
      ) : (
        <div className="flex flex-col gap-4">
          {content.workforce.map((group, g) => (
            <ItemCard
              key={`${group.title}-${g}`}
              onMoveUp={g > 0 ? () => swap("workforce", g, -1) : undefined}
              onMoveDown={
                g < content.workforce.length - 1
                  ? () => swap("workforce", g, 1)
                  : undefined
              }
              onDelete={() => remove(`workforce.${g}`)}
              footer={
                <Button
                  onClick={() =>
                    add(`workforce.${g}.members`, {
                      name: "New member",
                      role: "",
                    })
                  }
                >
                  + Add member
                </Button>
              }
            >
              <EditorGrid>
                <TextField
                  label="Group title"
                  path={`workforce.${g}.title`}
                  value={group.title}
                />
                <TextField
                  label="Group note"
                  path={`workforce.${g}.note`}
                  value={group.note}
                />
              </EditorGrid>
              <div className="mt-4 flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
                  Members ({group.members.length})
                </span>
                {group.members.length === 0 ? (
                  <EmptyNote>No members in this group.</EmptyNote>
                ) : (
                  group.members.map((member, m) => (
                    <div
                      key={`${member.name}-${m}`}
                      className="rounded-xl border border-foreground/8 bg-background p-3"
                    >
                      <EditorGrid>
                        <TextField
                          label="Name"
                          path={`workforce.${g}.members.${m}.name`}
                          value={member.name}
                        />
                        <TextField
                          label="Role"
                          path={`workforce.${g}.members.${m}.role`}
                          value={member.role}
                        />
                      </EditorGrid>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Button
                          onClick={() => swap(`workforce.${g}.members`, m, -1)}
                          disabled={m === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          onClick={() => swap(`workforce.${g}.members`, m, 1)}
                          disabled={m === group.members.length - 1}
                        >
                          ↓
                        </Button>
                        <span className="grow" />
                        <Button
                          variant="danger"
                          onClick={() =>
                            remove(`workforce.${g}.members.${m}`)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ItemCard>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
