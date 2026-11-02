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
  TextAreaField,
  TextField,
} from "../components/fields";

export function HomePanel(): ReactNode {
  const content = useContent();

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Hero">
        <EditorGrid>
          <TextField
            label="Heading — line 1"
            path="hero.headingLine1"
            value={content.hero.headingLine1}
          />
          <TextField
            label="Heading — line 2"
            path="hero.headingLine2"
            value={content.hero.headingLine2}
          />
        </EditorGrid>
        <div className="mt-4">
          <TextAreaField
            label="Subhead"
            path="hero.subhead"
            value={content.hero.subhead}
            rows={2}
          />
        </div>
        <div className="mt-4">
          <EditorGrid>
            <TextField
              label="Card top line"
              path="hero.cardTop"
              value={content.hero.cardTop}
            />
            <TextField
              label="Card bottom line"
              path="hero.cardBottom"
              value={content.hero.cardBottom}
            />
          </EditorGrid>
        </div>
      </SectionCard>

      <SectionCard
        title="Stats"
        actions={
          <Button
            variant="primary"
            onClick={() => add("stats", { value: "0", label: "New stat" })}
          >
            + Add stat
          </Button>
        }
      >
        {content.stats.length === 0 ? (
          <EmptyNote>No stats yet.</EmptyNote>
        ) : (
          <div className="flex flex-col gap-3">
            {content.stats.map((stat, i) => (
              <ItemCard
                key={`${stat.label}-${i}`}
                onMoveUp={i > 0 ? () => swap("stats", i, -1) : undefined}
                onMoveDown={
                  i < content.stats.length - 1
                    ? () => swap("stats", i, 1)
                    : undefined
                }
                onDelete={() => remove(`stats.${i}`)}
              >
                <EditorGrid>
                  <TextField
                    label="Value"
                    path={`stats.${i}.value`}
                    value={stat.value}
                  />
                  <TextField
                    label="Label"
                    path={`stats.${i}.label`}
                    value={stat.label}
                  />
                </EditorGrid>
              </ItemCard>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Who we are">
        <TextField
          label="Heading"
          path="whoWeAre.heading"
          value={content.whoWeAre.heading}
        />
        <div className="mt-4 flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
            Paragraphs — wrap words in **double asterisks** to bold them
          </span>
          {content.whoWeAre.paragraphs.map((paragraph, i) => (
            <ItemCard
              key={`p-${i}`}
              onMoveUp={
                i > 0 ? () => swap("whoWeAre.paragraphs", i, -1) : undefined
              }
              onMoveDown={
                i < content.whoWeAre.paragraphs.length - 1
                  ? () => swap("whoWeAre.paragraphs", i, 1)
                  : undefined
              }
              onDelete={() => remove(`whoWeAre.paragraphs.${i}`)}
            >
              <TextAreaField
                label={`Paragraph ${i + 1}`}
                path={`whoWeAre.paragraphs.${i}`}
                value={paragraph}
                rows={3}
              />
            </ItemCard>
          ))}
          <div>
            <Button
              onClick={() =>
                add("whoWeAre.paragraphs", "New paragraph.")
              }
            >
              + Add paragraph
            </Button>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Flagship initiatives"
        actions={
          <Button
            variant="primary"
            onClick={() =>
              add("flagships", {
                id: newId(),
                icon: "event",
                name: "New flagship",
                edition: "",
                date: "",
                description: "",
              })
            }
          >
            + Add flagship
          </Button>
        }
      >
        {content.flagships.length === 0 ? (
          <EmptyNote>No flagships yet.</EmptyNote>
        ) : (
          <div className="flex flex-col gap-3">
            {content.flagships.map((flagship, i) => (
              <ItemCard
                key={`${flagship.id}-${i}`}
                onMoveUp={
                  i > 0 ? () => swap("flagships", i, -1) : undefined
                }
                onMoveDown={
                  i < content.flagships.length - 1
                    ? () => swap("flagships", i, 1)
                    : undefined
                }
                onDelete={() => remove(`flagships.${i}`)}
              >
                <EditorGrid>
                  <TextField
                    label="Name"
                    path={`flagships.${i}.name`}
                    value={flagship.name}
                  />
                  <IconSelectField
                    label="Icon"
                    path={`flagships.${i}.icon`}
                    value={flagship.icon}
                  />
                  <TextField
                    label="Edition"
                    path={`flagships.${i}.edition`}
                    value={flagship.edition}
                  />
                  <TextField
                    label="Date"
                    path={`flagships.${i}.date`}
                    value={flagship.date}
                  />
                </EditorGrid>
                <div className="mt-4">
                  <TextAreaField
                    label="Description"
                    path={`flagships.${i}.description`}
                    value={flagship.description}
                    rows={2}
                  />
                </div>
              </ItemCard>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
