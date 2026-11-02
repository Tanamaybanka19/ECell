"use client";

import type { ReactNode } from "react";

import { add, newId, remove, swap, useContent } from "@/lib/content/admin-store";

import {
  Button,
  EditorGrid,
  EmptyNote,
  EventTypeSelectField,
  ItemCard,
  SectionCard,
  TextAreaField,
  TextField,
} from "../components/fields";
import { ImageField } from "../components/image-field";

export function EventsPanel(): ReactNode {
  const content = useContent();

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Events archive"
        actions={
          <Button
            variant="primary"
            onClick={() =>
              add("eventsArchive", { year: "2027", events: [] })
            }
          >
            + Add year
          </Button>
        }
      >
        {content.eventsArchive.length === 0 ? (
          <EmptyNote>No year groups yet.</EmptyNote>
        ) : (
          <div className="flex flex-col gap-4">
            {content.eventsArchive.map((group, g) => (
              <ItemCard
                key={`${group.year}-${g}`}
                onMoveUp={g > 0 ? () => swap("eventsArchive", g, -1) : undefined}
                onMoveDown={
                  g < content.eventsArchive.length - 1
                    ? () => swap("eventsArchive", g, 1)
                    : undefined
                }
                onDelete={() => remove(`eventsArchive.${g}`)}
                footer={
                  <Button
                    onClick={() =>
                      add(`eventsArchive.${g}.events`, {
                        title: "New event",
                        date: "",
                        type: "Talk",
                        summary: "",
                      })
                    }
                  >
                    + Add event
                  </Button>
                }
              >
                <div className="w-full sm:max-w-48">
                  <TextField
                    label="Year"
                    path={`eventsArchive.${g}.year`}
                    value={group.year}
                  />
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
                    Events ({group.events.length})
                  </span>
                  {group.events.length === 0 ? (
                    <EmptyNote>No events in this year.</EmptyNote>
                  ) : (
                    group.events.map((event, e) => (
                      <div
                        key={`${event.title}-${e}`}
                        className="rounded-xl border border-foreground/8 bg-background p-3"
                      >
                        <EditorGrid>
                          <TextField
                            label="Title"
                            path={`eventsArchive.${g}.events.${e}.title`}
                            value={event.title}
                          />
                          <TextField
                            label="Date"
                            path={`eventsArchive.${g}.events.${e}.date`}
                            value={event.date}
                            placeholder="Feb 2026"
                          />
                          <EventTypeSelectField
                            label="Type"
                            path={`eventsArchive.${g}.events.${e}.type`}
                            value={event.type}
                          />
                        </EditorGrid>
                        <div className="mt-3">
                          <TextAreaField
                            label="Summary"
                            path={`eventsArchive.${g}.events.${e}.summary`}
                            value={event.summary}
                            rows={2}
                          />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Button
                            onClick={() =>
                              swap(`eventsArchive.${g}.events`, e, -1)
                            }
                            disabled={e === 0}
                          >
                            ↑
                          </Button>
                          <Button
                            onClick={() =>
                              swap(`eventsArchive.${g}.events`, e, 1)
                            }
                            disabled={e === group.events.length - 1}
                          >
                            ↓
                          </Button>
                          <span className="grow" />
                          <Button
                            variant="danger"
                            onClick={() =>
                              remove(`eventsArchive.${g}.events.${e}`)
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

      <SectionCard
        title="Aftermovies"
        actions={
          <Button
            variant="primary"
            onClick={() =>
              add("aftermovies", {
                id: newId(),
                title: "New aftermovie",
                year: "2026",
                runtime: "0:00",
                thumbnail: "",
              })
            }
          >
            + Add aftermovie
          </Button>
        }
      >
        {content.aftermovies.length === 0 ? (
          <EmptyNote>No aftermovies yet.</EmptyNote>
        ) : (
          <div className="flex flex-col gap-3">
            {content.aftermovies.map((video, i) => (
              <ItemCard
                key={`${video.id}-${i}`}
                onMoveUp={i > 0 ? () => swap("aftermovies", i, -1) : undefined}
                onMoveDown={
                  i < content.aftermovies.length - 1
                    ? () => swap("aftermovies", i, 1)
                    : undefined
                }
                onDelete={() => remove(`aftermovies.${i}`)}
              >
                <EditorGrid>
                  <TextField
                    label="Title"
                    path={`aftermovies.${i}.title`}
                    value={video.title}
                  />
                  <TextField
                    label="Year"
                    path={`aftermovies.${i}.year`}
                    value={video.year}
                  />
                  <TextField
                    label="Runtime"
                    path={`aftermovies.${i}.runtime`}
                    value={video.runtime}
                    placeholder="3:42"
                  />
                  <ImageField
                    label="Thumbnail (optional)"
                    path={`aftermovies.${i}.thumbnail`}
                    value={video.thumbnail}
                  />
                </EditorGrid>
              </ItemCard>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
