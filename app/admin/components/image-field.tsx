"use client";

import { useRef, useState, type ChangeEvent, type ReactNode } from "react";

import { set, uploadImage } from "@/lib/content/admin-store";
import { resizeImageFile } from "@/lib/content/image-resize";

import { Button, LABEL_CLS } from "./fields";

export function ImageField({
  label,
  path,
  value,
}: {
  label: string;
  path: string;
  value: string;
}): ReactNode {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const resized = await resizeImageFile(file);
      const url = await uploadImage(resized);
      set(path, url);
    } catch {
      setError("Upload failed — try a different image.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className={LABEL_CLS}>{label}</span>
      {value ? (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="h-14 w-20 shrink-0 rounded-lg border border-foreground/10 object-cover"
          />
          <div className="flex flex-col gap-1.5">
            <Button onClick={() => inputRef.current?.click()} disabled={busy}>
              {busy ? "Uploading…" : "Replace"}
            </Button>
            <Button variant="danger" onClick={() => set(path, "")}>
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? "Uploading…" : "Choose image"}
        </Button>
      )}
      {error ? (
        <span className="text-[12px] tracking-tight text-red-500">{error}</span>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          void handleChange(e);
        }}
      />
    </div>
  );
}
