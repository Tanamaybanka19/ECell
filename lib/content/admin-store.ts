"use client";

import { useSyncExternalStore } from "react";

import { defaultContent } from "./defaults";
import { ADMIN_CREDENTIALS } from "./admin-credentials";
import { reconcileContent } from "./reconcile";
import type { SiteContent } from "./types";

const STORAGE_KEY = "ecell.content.v1";
const SESSION_KEY = "ecell.admin.session";
const CREDS_KEY = "ecell.admin.creds";

let content: SiteContent = cloneDefaults();
let loaded = false;
let hydrateStarted = false;
const listeners = new Set<() => void>();

function cloneDefaults(): SiteContent {
  return JSON.parse(JSON.stringify(defaultContent)) as SiteContent;
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

function loadFromStorage(): void {
  if (loaded) return;
  loaded = true;
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    content = reconcileContent(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    content = cloneDefaults();
  }
}

function persistLocal(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {
    // Storage full — keep editing in memory; server save still applies.
  }
}

function authHeaders(): Record<string, string> {
  const creds = readCreds();
  if (!creds) return {};
  return {
    "x-admin-user": creds.username,
    "x-admin-password": creds.password,
  };
}

function readCreds(): { username: string; password: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(CREDS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      username?: unknown;
      password?: unknown;
    };
    if (
      typeof parsed.username === "string" &&
      typeof parsed.password === "string"
    ) {
      return { username: parsed.username, password: parsed.password };
    }
  } catch {
    // ignore
  }
  return null;
}

// ── Server sync ───────────────────────────────────────────────────────────

type SaveStatus = "idle" | "saving" | "saved" | "error";
let saveStatus: SaveStatus = "idle";
let saveTimer: ReturnType<typeof setTimeout> | null = null;
const saveListeners = new Set<() => void>();

function setSaveStatus(next: SaveStatus): void {
  saveStatus = next;
  saveListeners.forEach((listener) => listener());
}

export type BackendStatus = {
  known: boolean;
  configured: boolean;
  writable: boolean;
};

const UNKNOWN_BACKEND: BackendStatus = {
  known: false,
  configured: false,
  writable: false,
};

let backendStatus: BackendStatus = UNKNOWN_BACKEND;
const backendListeners = new Set<() => void>();

function setBackendStatus(next: BackendStatus): void {
  backendStatus = next;
  backendListeners.forEach((listener) => listener());
}

function scheduleSave(): void {
  if (typeof window === "undefined") return;
  if (!readCreds()) return; // not signed in — local-only
  if (backendStatus.known && !backendStatus.writable) return; // no backend writes
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    void saveToServer();
  }, 700);
}

async function saveToServer(): Promise<void> {
  setSaveStatus("saving");
  try {
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "content-type": "application/json", ...authHeaders() },
      body: JSON.stringify(content),
    });
    setSaveStatus(res.ok ? "saved" : "error");
  } catch {
    setSaveStatus("error");
  }
}

async function hydrate(): Promise<void> {
  if (hydrateStarted || typeof window === "undefined") return;
  hydrateStarted = true;
  try {
    const res = await fetch("/api/content", { cache: "no-store" });
    if (!res.ok) {
      setBackendStatus({ known: true, configured: false, writable: false });
      return;
    }
    const payload = (await res.json()) as {
      configured?: boolean;
      writable?: boolean;
      content?: Partial<SiteContent>;
    };
    setBackendStatus({
      known: true,
      configured: Boolean(payload.configured),
      writable: Boolean(payload.writable),
    });
    if (!payload.configured) return; // local-only mode: keep local cache
    content = reconcileContent(payload.content ?? {});
    persistLocal();
    emit();
  } catch {
    // Offline / no backend — keep local cache.
    setBackendStatus({ known: true, configured: false, writable: false });
  }
}

function commit(next: SiteContent): void {
  content = next;
  persistLocal();
  emit();
  scheduleSave();
}

function subscribe(listener: () => void): () => void {
  loadFromStorage();
  void hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): SiteContent {
  loadFromStorage();
  return content;
}

function getServerSnapshot(): SiteContent {
  return defaultContent;
}

export function useContent(): SiteContent {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useSaveStatus(): SaveStatus {
  return useSyncExternalStore(
    (listener) => {
      saveListeners.add(listener);
      return () => saveListeners.delete(listener);
    },
    () => saveStatus,
    () => "idle",
  );
}

export function useBackendStatus(): BackendStatus {
  return useSyncExternalStore(
    (listener) => {
      backendListeners.add(listener);
      return () => backendListeners.delete(listener);
    },
    () => backendStatus,
    () => UNKNOWN_BACKEND,
  );
}

// ── Path operations (dotted paths traverse objects AND arrays) ─────────────

function isContainer(
  value: unknown,
): value is Record<string, unknown> | unknown[] {
  return typeof value === "object" && value !== null;
}

function resolveParent(
  root: Record<string, unknown>,
  path: string,
): Record<string, unknown> | null {
  const keys = path.split(".");
  let node: Record<string, unknown> | unknown[] = root;
  for (const key of keys) {
    const child: unknown = (node as Record<string, unknown>)[key];
    if (!isContainer(child)) return null;
    node = child;
  }
  return node as Record<string, unknown>;
}

function cloneContent(): Record<string, unknown> {
  return JSON.parse(JSON.stringify(content)) as Record<string, unknown>;
}

/** Set a scalar (or replace any value) at a dotted path. */
export function set(path: string, value: unknown): void {
  loadFromStorage();
  const next = cloneContent();
  const keys = path.split(".");
  const last = keys.pop();
  if (!last) return;
  const parent = keys.length ? resolveParent(next, keys.join(".")) : next;
  if (!parent) return;
  parent[last] = value;
  commit(next as unknown as SiteContent);
}

/** Append an item to the array at `path`. */
export function add(path: string, item: unknown): void {
  loadFromStorage();
  const next = cloneContent();
  const keys = path.split(".");
  const last = keys.pop();
  if (!last) return;
  const parent = keys.length ? resolveParent(next, keys.join(".")) : next;
  if (!parent) return;
  const arr: unknown = parent[last];
  if (!Array.isArray(arr)) return;
  arr.push(item);
  commit(next as unknown as SiteContent);
}

/** Remove the item at "collection.index". */
export function remove(path: string): void {
  loadFromStorage();
  const next = cloneContent();
  const keys = path.split(".");
  const last = keys.pop();
  if (!last) return;
  const parent = keys.length ? resolveParent(next, keys.join(".")) : next;
  if (!parent) return;
  const arr: unknown = parent[last];
  if (!Array.isArray(arr)) return;
  const index = Number(last);
  if (!Number.isInteger(index) || index < 0 || index >= arr.length) return;
  arr.splice(index, 1);
  commit(next as unknown as SiteContent);
}

/** Swap item at `index` with its neighbour in `path`. */
export function swap(path: string, index: number, direction: -1 | 1): void {
  loadFromStorage();
  const next = cloneContent();
  const keys = path.split(".");
  const last = keys.pop();
  if (!last) return;
  const parent = keys.length ? resolveParent(next, keys.join(".")) : next;
  if (!parent) return;
  const target: unknown = parent[last];
  if (!Array.isArray(target)) return;
  const j = index + direction;
  if (index < 0 || index >= target.length || j < 0 || j >= target.length) return;
  const a = target[index];
  const b = target[j];
  target[index] = b;
  target[j] = a;
  commit(next as unknown as SiteContent);
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function resetAll(): void {
  commit(cloneDefaults());
}

// ── Auth ──────────────────────────────────────────────────────────────────

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

const authListeners = new Set<() => void>();

function notifyAuth(): void {
  authListeners.forEach((listener) => listener());
}

function subscribeAuth(listener: () => void): () => void {
  authListeners.add(listener);
  return () => authListeners.delete(listener);
}

/** Hydration-safe auth flag: false on the server, live value after mount. */
export function useIsLoggedIn(): boolean {
  return useSyncExternalStore(subscribeAuth, isLoggedIn, () => false);
}

/** Validate credentials against the backend, then open a local session. */
export async function login(
  username: string,
  password: string,
): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) return false;
    window.sessionStorage.setItem(SESSION_KEY, "1");
    window.sessionStorage.setItem(
      CREDS_KEY,
      JSON.stringify({ username, password }),
    );
  } catch {
    return false;
  }
  notifyAuth();
  return true;
}

export function logout(): void {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(CREDS_KEY);
  } catch {
    // Ignore.
  }
  notifyAuth();
}

/** Upload an image via the backend; falls back to a data URL if unavailable. */
export async function uploadImage(file: File): Promise<string> {
  try {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: authHeaders(),
      body: form,
    });
    if (res.ok) {
      const payload = (await res.json()) as { url?: string };
      if (payload.url) return payload.url;
    }
  } catch {
    // fall through to data URL
  }
  return fileToDataUrl(file);
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.readAsDataURL(file);
  });
}

export const MOCK_CREDENTIALS = ADMIN_CREDENTIALS;
