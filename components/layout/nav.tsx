"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { Icon } from "@/components/ui/icon";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Departments", href: "/departments" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Podcasts", href: "/podcasts" },
  { label: "Archives", href: "/archives" },
  { label: "Contact", href: "/contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function NavThemeToggle(): ReactNode {
  const mounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const next = isDark ? "light" : "dark";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const supportsViewTransitions =
      typeof document !== "undefined" &&
      typeof document.startViewTransition === "function";

    if (!supportsViewTransitions || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    const root = document.documentElement;
    root.style.setProperty("--theme-cx", `${cx}px`);
    root.style.setProperty("--theme-cy", `${cy}px`);
    root.style.setProperty("--theme-r", `${radius}px`);
    root.dataset.themeAnim = "1";

    const transition = document.startViewTransition(() => {
      setTheme(next);
    });

    transition.finished.finally(() => {
      delete root.dataset.themeAnim;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      aria-pressed={mounted ? isDark : undefined}
      className="focus-ring relative inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-background ring-1 ring-foreground/8 transition-colors"
    >
      <span aria-hidden="true" className="relative h-4 w-4">
        <Icon
          name="light_mode"
          className={`absolute inset-0 flex items-center justify-center text-[16px] text-foreground transition-all duration-300 ${
            mounted && isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        <Icon
          name="dark_mode"
          className={`absolute inset-0 flex items-center justify-center text-[16px] text-foreground transition-all duration-300 ${
            mounted && !isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}

export function Nav(): ReactNode {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [pillRect, setPillRect] = useState<{
    x: number;
    width: number;
  } | null>(null);
  const [hasMeasured, setHasMeasured] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewportTick, setViewportTick] = useState(0);

  const activeIndex = NAV_ITEMS.findIndex((item) =>
    isActivePath(pathname, item.href)
  );
  const activeItem =
    activeIndex >= 0 ? NAV_ITEMS[activeIndex] : null;

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = (): void => {
      setViewportTick((tick) => tick + 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  useLayoutEffect(() => {
    void viewportTick;
    const list = listRef.current;
    const activeEl =
      activeIndex >= 0 ? itemRefs.current[activeIndex] : null;
    if (!list || !activeEl) {
      setPillRect(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    if (itemRect.width === 0) {
      setPillRect(null);
      return;
    }
    setPillRect({
      x: itemRect.left - listRect.left,
      width: itemRect.width,
    });
  }, [activeIndex, pathname, viewportTick]);

  useEffect(() => {
    if (!pillRect) return;
    const id = requestAnimationFrame(() => setHasMeasured(true));
    return () => cancelAnimationFrame(id);
  }, [pillRect]);

  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full bg-background p-1.5 shadow-sm border border-foreground/8">
        <ul
          ref={listRef}
          className="relative hidden items-center gap-1 md:flex"
        >
          {pillRect && (
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={{ x: pillRect.x, width: pillRect.width }}
              transition={
                hasMeasured
                  ? { type: "spring", stiffness: 380, damping: 32 }
                  : { duration: 0 }
              }
              style={{ left: 0, top: 0, bottom: 0 }}
              className="absolute rounded-full bg-foreground/5 ring-1 ring-foreground/8"
            />
          )}
          {NAV_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={item.href}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="relative"
              >
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className="focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300"
                >
                  <span
                    className={
                      isActive
                        ? "relative z-10 text-foreground"
                        : "relative z-10 text-foreground/60 hover:text-foreground"
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <span className="px-1.5 text-sm font-medium tracking-tight text-foreground/80 md:hidden">
          {activeItem ? activeItem.label : "Menu"}
        </span>

        <NavThemeToggle />

        <button
          type="button"
          onClick={() =>
            setMenuOpen((open) => !open)
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="focus-ring relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background ring-1 ring-foreground/8 transition-colors md:hidden"
        >
          {menuOpen ? (
            <Icon name="close" className="text-[18px] text-foreground" />
          ) : (
            <Icon name="menu" className="text-[18px] text-foreground" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <div className="pointer-events-none absolute left-0 right-0 top-full mt-2 flex justify-center md:hidden">
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="pointer-events-auto w-[min(20rem,calc(100vw-2.5rem))] rounded-3xl border border-foreground/10 bg-background p-2 shadow-xl"
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={closeMenu}
                        className={`focus-ring inline-flex w-full cursor-pointer items-center justify-between rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-foreground/5 text-foreground ring-1 ring-foreground/8"
                            : "text-foreground/60 hover:bg-foreground/3 hover:text-foreground"
                        }`}
                      >
                        {item.label}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-foreground"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
