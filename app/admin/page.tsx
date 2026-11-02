"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import {
  logout,
  resetAll,
  useBackendStatus,
  useContent,
  useIsLoggedIn,
  useSaveStatus,
  type BackendStatus,
} from "@/lib/content/admin-store";
import {
  CONTENT_TABS,
  type AdminTab,
  type ContentTab,
} from "@/lib/content/types";

import { Button } from "./components/fields";
import { CorePanel } from "./panels/core-panel";
import { DepartmentsPanel } from "./panels/departments-panel";
import { EditorialPanel } from "./panels/editorial-panel";
import { EventsPanel } from "./panels/events-panel";
import { HomePanel } from "./panels/home-panel";
import { MediaPanel } from "./panels/media-panel";
import { SitePanel } from "./panels/site-panel";
import { WorkforcePanel } from "./panels/workforce-panel";

const TAB_LABELS: Record<AdminTab, string> = {
  content: "Content",
  media: "Media",
  site: "Site",
};

const CONTENT_LABELS: Record<ContentTab, string> = {
  home: "Home",
  core: "Core",
  departments: "Departments",
  workforce: "Workforce",
  events: "Events",
  editorial: "Newsletter & Podcast",
};

export default function AdminPage(): ReactNode {
  const router = useRouter();
  const content = useContent();
  const loggedIn = useIsLoggedIn();
  const saveStatus = useSaveStatus();
  const backendStatus = useBackendStatus();
  const [tab, setTab] = useState<AdminTab>("content");
  const [contentTab, setContentTab] = useState<ContentTab>("home");

  useEffect(() => {
    if (!loggedIn) router.replace("/admin/login");
  }, [loggedIn, router]);

  function handleReset(): void {
    if (
      window.confirm(
        "Reset all content back to the built-in defaults? This cannot be undone.",
      )
    ) {
      resetAll();
    }
  }

  function handleLogout(): void {
    logout();
    router.replace("/admin/login");
  }

  if (!loggedIn) return null;

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-275 flex-1 flex-col gap-8 px-6 pt-44 pb-16 sm:px-10 sm:pt-56"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-foreground/8 pb-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
            Admin
          </p>
          <h1 className="mt-1 font-serif text-[2.25rem] font-semibold tracking-tight text-foreground sm:text-[2.625rem]">
            Content Manager
          </h1>
          <p className="mt-2 max-w-[52ch] text-[13px] tracking-tight text-foreground/55">
            Edits save automatically to Supabase and appear on the public site.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <BackendBadge status={backendStatus} />
          <SaveStatus status={saveStatus} />
          <Button onClick={handleReset}>Reset to defaults</Button>
          <Button variant="danger" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <aside className="flex shrink-0 flex-col gap-4 lg:sticky lg:top-28 lg:w-52">
          <nav
            aria-label="Admin sections"
            className="flex flex-row flex-wrap gap-1.5 rounded-2xl border border-foreground/8 bg-background p-1.5 lg:flex-col"
          >
            {(Object.keys(TAB_LABELS) as AdminTab[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={[
                  "focus-ring cursor-pointer rounded-xl px-3.5 py-2 text-left text-[13px] font-medium tracking-tight transition-colors",
                  tab === id
                    ? "bg-foreground text-background"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
                ].join(" ")}
              >
                {TAB_LABELS[id]}
              </button>
            ))}
          </nav>

          {tab === "content" ? (
            <nav
              aria-label="Content sections"
              className="flex flex-row flex-wrap gap-1.5 rounded-2xl border border-foreground/8 bg-background p-1.5 lg:flex-col"
            >
              {CONTENT_TABS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setContentTab(id)}
                  className={[
                    "focus-ring cursor-pointer rounded-xl px-3.5 py-2 text-left text-[13px] tracking-tight transition-colors",
                    contentTab === id
                      ? "bg-foreground/5 text-foreground ring-1 ring-foreground/10"
                      : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground",
                  ].join(" ")}
                >
                  {CONTENT_LABELS[id]}
                </button>
              ))}
            </nav>
          ) : null}

          <p className="hidden px-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-foreground/35 lg:block">
            {content.stats.length} stats · {content.departments.length} teams ·{" "}
            {content.media.length} images
          </p>
        </aside>

        <div className="min-w-0 grow">
          {tab === "content" ? (
            <>
              {contentTab === "home" ? <HomePanel /> : null}
              {contentTab === "core" ? <CorePanel /> : null}
              {contentTab === "departments" ? <DepartmentsPanel /> : null}
              {contentTab === "workforce" ? <WorkforcePanel /> : null}
              {contentTab === "events" ? <EventsPanel /> : null}
              {contentTab === "editorial" ? <EditorialPanel /> : null}
            </>
          ) : null}
          {tab === "media" ? <MediaPanel /> : null}
          {tab === "site" ? <SitePanel /> : null}
        </div>
      </div>

      <footer className="flex items-center gap-2 border-t border-foreground/8 pt-6 text-foreground/40">
        <Icon name="check" className="text-[16px]" />
        <p className="font-mono text-[10px] uppercase tracking-[0.14em]">
          Content syncs to Supabase when configured; otherwise cached locally
        </p>
      </footer>
    </main>
  );
}

function BackendBadge({ status }: { status: BackendStatus }): ReactNode {
  const map = !status.known
    ? { text: "Checking backend…", cls: "text-foreground/40" }
    : status.configured && status.writable
      ? { text: "Supabase connected", cls: "text-emerald-600 dark:text-emerald-400" }
      : status.configured
        ? { text: "Supabase read-only", cls: "text-amber-600 dark:text-amber-400" }
        : { text: "Local only", cls: "text-foreground/50" };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-1 font-mono text-[10px] uppercase tracking-[0.14em] ${map.cls}`}
      title={
        status.known && status.configured && !status.writable
          ? "Add SUPABASE_SERVICE_ROLE_KEY to enable saving and uploads."
          : undefined
      }
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current"
      />
      {map.text}
    </span>
  );
}

function SaveStatus({
  status,
}: {
  status: "idle" | "saving" | "saved" | "error";
}): ReactNode {
  if (status === "idle") return null;
  const map = {
    saving: { text: "Saving…", cls: "text-foreground/50" },
    saved: { text: "Saved", cls: "text-emerald-600 dark:text-emerald-400" },
    error: { text: "Save failed", cls: "text-red-500" },
  }[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-1 font-mono text-[10px] uppercase tracking-[0.14em] ${map.cls}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current"
      />
      {map.text}
    </span>
  );
}
