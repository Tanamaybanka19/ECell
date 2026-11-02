"use client";

import type { ReactNode } from "react";

import { add, newId, remove, swap, useContent } from "@/lib/content/admin-store";

import {
  Button,
  EditorGrid,
  EmptyNote,
  ItemCard,
  SectionCard,
  TagsField,
  TextAreaField,
  TextField,
} from "../components/fields";

export function EditorialPanel(): ReactNode {
  const content = useContent();

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Newsletter issues — The Venture Ledger"
        actions={
          <Button
            variant="primary"
            onClick={() =>
              add("newsletterIssues", {
                id: newId(),
                index: "Vol. V · Issue 00",
                title: "New issue",
                date: "",
                tags: [],
                excerpt: "",
              })
            }
          >
            + Add issue
          </Button>
        }
      >
        {content.newsletterIssues.length === 0 ? (
          <EmptyNote>No issues yet.</EmptyNote>
        ) : (
          <div className="flex flex-col gap-3">
            {content.newsletterIssues.map((issue, i) => (
              <ItemCard
                key={`${issue.id}-${i}`}
                onMoveUp={
                  i > 0 ? () => swap("newsletterIssues", i, -1) : undefined
                }
                onMoveDown={
                  i < content.newsletterIssues.length - 1
                    ? () => swap("newsletterIssues", i, 1)
                    : undefined
                }
                onDelete={() => remove(`newsletterIssues.${i}`)}
              >
                <EditorGrid>
                  <TextField
                    label="Index (e.g. Vol. V · Issue 04)"
                    path={`newsletterIssues.${i}.index`}
                    value={issue.index}
                  />
                  <TextField
                    label="Title"
                    path={`newsletterIssues.${i}.title`}
                    value={issue.title}
                  />
                  <TextField
                    label="Date"
                    path={`newsletterIssues.${i}.date`}
                    value={issue.date}
                    placeholder="Aug 2026"
                  />
                  <TagsField
                    label="Tags — one per line"
                    path={`newsletterIssues.${i}.tags`}
                    value={issue.tags}
                  />
                </EditorGrid>
                <div className="mt-4">
                  <TextAreaField
                    label="Excerpt"
                    path={`newsletterIssues.${i}.excerpt`}
                    value={issue.excerpt}
                    rows={2}
                  />
                </div>
              </ItemCard>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Podcast episodes — The Foundry"
        actions={
          <Button
            variant="primary"
            onClick={() =>
              add("podcastEpisodes", {
                id: newId(),
                number: "EP 00",
                title: "New episode",
                guest: "",
                guestRole: "",
                duration: "0 min",
                date: "",
                excerpt: "",
              })
            }
          >
            + Add episode
          </Button>
        }
      >
        {content.podcastEpisodes.length === 0 ? (
          <EmptyNote>No episodes yet.</EmptyNote>
        ) : (
          <div className="flex flex-col gap-3">
            {content.podcastEpisodes.map((episode, i) => (
              <ItemCard
                key={`${episode.id}-${i}`}
                onMoveUp={
                  i > 0 ? () => swap("podcastEpisodes", i, -1) : undefined
                }
                onMoveDown={
                  i < content.podcastEpisodes.length - 1
                    ? () => swap("podcastEpisodes", i, 1)
                    : undefined
                }
                onDelete={() => remove(`podcastEpisodes.${i}`)}
              >
                <EditorGrid>
                  <TextField
                    label="Number"
                    path={`podcastEpisodes.${i}.number`}
                    value={episode.number}
                    placeholder="EP 13"
                  />
                  <TextField
                    label="Title"
                    path={`podcastEpisodes.${i}.title`}
                    value={episode.title}
                  />
                  <TextField
                    label="Guest"
                    path={`podcastEpisodes.${i}.guest`}
                    value={episode.guest}
                  />
                  <TextField
                    label="Guest role"
                    path={`podcastEpisodes.${i}.guestRole`}
                    value={episode.guestRole}
                  />
                  <TextField
                    label="Duration"
                    path={`podcastEpisodes.${i}.duration`}
                    value={episode.duration}
                    placeholder="42 min"
                  />
                  <TextField
                    label="Date"
                    path={`podcastEpisodes.${i}.date`}
                    value={episode.date}
                    placeholder="Aug 2026"
                  />
                </EditorGrid>
                <div className="mt-4">
                  <TextAreaField
                    label="Excerpt"
                    path={`podcastEpisodes.${i}.excerpt`}
                    value={episode.excerpt}
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
