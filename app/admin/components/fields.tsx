"use client";

import type { ChangeEvent, ReactNode } from "react";

import { Icon, type MaterialSymbolName } from "@/components/ui/icon";
import { set } from "@/lib/content/admin-store";
import { EVENT_TYPES } from "@/lib/content/types";

export const INPUT_CLS =
  "w-full rounded-xl border border-foreground/10 bg-background px-3 py-2 text-[14px] tracking-tight text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-foreground/25";

export const LABEL_CLS =
  "font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50";

const ICON_NAMES: MaterialSymbolName[] = [
  "arrow_forward",
  "arrow_outward",
  "trophy",
  "event",
  "mic",
  "mail",
  "check",
  "location_on",
  "play_arrow",
  "podcasts",
  "movie",
  "groups",
  "menu_book",
  "assignment",
  "handshake",
  "account_balance",
  "lightbulb",
  "campaign",
  "inventory_2",
  "rss_feed",
];

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}): ReactNode {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={LABEL_CLS}>{label}</span>
      {children}
    </label>
  );
}

export function TextField({
  label,
  path,
  value,
  placeholder,
}: {
  label: string;
  path: string;
  value: string;
  placeholder?: string;
}): ReactNode {
  return (
    <Field label={label}>
      <input
        type="text"
        className={INPUT_CLS}
        value={value}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          set(path, e.target.value)
        }
      />
    </Field>
  );
}

export function TextAreaField({
  label,
  path,
  value,
  rows = 3,
  placeholder,
}: {
  label: string;
  path: string;
  value: string;
  rows?: number;
  placeholder?: string;
}): ReactNode {
  return (
    <Field label={label}>
      <textarea
        rows={rows}
        className={`${INPUT_CLS} resize-y leading-relaxed`}
        value={value}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          set(path, e.target.value)
        }
      />
    </Field>
  );
}

export function SelectField({
  label,
  path,
  value,
  options,
}: {
  label: string;
  path: string;
  value: string;
  options: { value: string; label: string }[];
}): ReactNode {
  return (
    <Field label={label}>
      <select
        className={INPUT_CLS}
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          set(path, e.target.value)
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function IconSelectField({
  label,
  path,
  value,
}: {
  label: string;
  path: string;
  value: MaterialSymbolName;
}): ReactNode {
  return (
    <SelectField
      label={label}
      path={path}
      value={value}
      options={ICON_NAMES.map((name) => ({ value: name, label: name }))}
    />
  );
}

export function EventTypeSelectField({
  label,
  path,
  value,
}: {
  label: string;
  path: string;
  value: string;
}): ReactNode {
  return (
    <SelectField
      label={label}
      path={path}
      value={value}
      options={EVENT_TYPES.map((type) => ({ value: type, label: type }))}
    />
  );
}

/** Comma/newline-separated list of short strings, stored as string[]. */
export function TagsField({
  label,
  path,
  value,
  rows = 2,
}: {
  label: string;
  path: string;
  value: string[];
  rows?: number;
}): ReactNode {
  return (
    <Field label={label}>
      <textarea
        rows={rows}
        className={`${INPUT_CLS} resize-y`}
        value={value.join("\n")}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          set(
            path,
            e.target.value
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean),
          )
        }
      />
    </Field>
  );
}

export function Button({
  children,
  onClick,
  variant = "subtle",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "subtle" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
}): ReactNode {
  const base =
    "focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-medium tracking-tight transition-colors disabled:cursor-not-allowed disabled:opacity-50";
  const styles = {
    primary:
      "border border-foreground/8 bg-foreground text-background hover:bg-foreground/90",
    subtle:
      "border border-foreground/10 bg-background text-foreground/80 hover:bg-foreground/5 hover:text-foreground",
    danger:
      "border border-foreground/10 bg-background text-foreground/60 hover:border-red-500/40 hover:text-red-500",
  }[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles}`}
    >
      {children}
    </button>
  );
}

export function SectionCard({
  title,
  children,
  actions,
}: {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
}): ReactNode {
  return (
    <section className="rounded-3xl border border-foreground/8 bg-background p-5 sm:p-6">
      {title ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-serif text-[19px] font-medium tracking-tight text-foreground">
            {title}
          </h3>
          {actions}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function EditorGrid({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3;
}): ReactNode {
  const cls =
    cols === 1
      ? "grid grid-cols-1 gap-4"
      : cols === 3
        ? "grid grid-cols-1 gap-4 sm:grid-cols-3"
        : "grid grid-cols-1 gap-4 sm:grid-cols-2";
  return <div className={cls}>{children}</div>;
}

export function ItemCard({
  children,
  onDelete,
  onMoveUp,
  onMoveDown,
  footer,
}: {
  children: ReactNode;
  onDelete?: (() => void) | undefined;
  onMoveUp?: (() => void) | undefined;
  onMoveDown?: (() => void) | undefined;
  footer?: ReactNode;
}): ReactNode {
  return (
    <div className="rounded-2xl border border-foreground/8 bg-foreground/1 p-4 dark:bg-foreground/2">
      {children}
      {(onDelete || onMoveUp || onMoveDown || footer) && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-foreground/8 pt-3">
          {onMoveUp ? (
            <Button onClick={onMoveUp}>
              <Icon name="arrow_forward" className="text-[16px] rotate-[-90deg]" />
              Up
            </Button>
          ) : null}
          {onMoveDown ? (
            <Button onClick={onMoveDown}>
              <Icon
                name="arrow_forward"
                className="text-[16px] rotate-90"
              />
              Down
            </Button>
          ) : null}
          <span className="grow" />
          {footer}
          {onDelete ? (
            <Button variant="danger" onClick={onDelete}>
              Delete
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function EmptyNote({ children }: { children: ReactNode }): ReactNode {
  return (
    <p className="rounded-2xl border border-dashed border-foreground/12 px-4 py-8 text-center text-[13px] tracking-tight text-foreground/50">
      {children}
    </p>
  );
}
