"use client";

import { useRef, useState, type ChangeEvent, type ReactNode } from "react";

import { add, newId, remove, set, uploadImage, useContent } from "@/lib/content/admin-store";
import { resizeImageFile } from "@/lib/content/image-resize";

import { Button, EmptyNote, INPUT_CLS, LABEL_CLS } from "../components/fields";

export function MediaPanel(): ReactNode {
  const content = useContent();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;
    setBusy(true);
    setError("");
    try {
      for (const file of files) {
        const resized = await resizeImageFile(file);
        const url = await uploadImage(resized);
        add("media", { id: newId(), name: file.name, url });
      }
    } catch {
      setError("One or more uploads failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-3xl border border-foreground/8 bg-background p-5 sm:p-6">
        <h3 className="font-serif text-[19px] font-medium tracking-tight text-foreground">
          Upload images
        </h3>
        <p className="mt-1 text-[13px] tracking-tight text-foreground/55">
          Images are resized to 1280px wide and uploaded to Supabase Storage
          (the public <span className="font-mono text-[11px]">media</span>{" "}
          bucket).
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
          >
            {busy ? "Uploading…" : "Select images"}
          </Button>
          {error ? (
            <span className="text-[12px] tracking-tight text-red-500">
              {error}
            </span>
          ) : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            void handleFiles(e);
          }}
        />
      </section>

      <section className="rounded-3xl border border-foreground/8 bg-background p-5 sm:p-6">
        <h3 className="font-serif text-[19px] font-medium tracking-tight text-foreground">
          Library ({content.media.length})
        </h3>
        {content.media.length === 0 ? (
          <div className="mt-3">
            <EmptyNote>No images uploaded yet.</EmptyNote>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {content.media.map((item, i) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-2xl border border-foreground/8 bg-foreground/1 p-3 dark:bg-foreground/2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-14 w-20 shrink-0 rounded-lg border border-foreground/10 object-cover"
                />
                <div className="flex min-w-0 grow flex-col gap-1.5">
                  <span className={LABEL_CLS}>Name</span>
                  <input
                    type="text"
                    className={INPUT_CLS}
                    value={item.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      set(`media.${i}.name`, e.target.value)
                    }
                  />
                </div>
                <Button
                  variant="danger"
                  onClick={() => remove(`media.${i}`)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
