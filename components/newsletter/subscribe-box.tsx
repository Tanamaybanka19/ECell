"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { Icon } from "@/components/ui/icon";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SubscribeBox(): ReactNode {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-foreground/8 bg-background px-5 py-3 text-sm font-medium text-foreground">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
          <Icon name="check" className="text-[13px]" />
        </span>
        You&rsquo;re on the list. See you in the next issue.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="relative grow">
        <Icon
          name="mail"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-foreground/40"
        />
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="focus-ring h-11 w-full rounded-xl border border-foreground/10 bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-foreground/35"
        />
      </div>
      <button
        type="submit"
        className="focus-ring group inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Subscribe
        <Icon
          name="arrow_forward"
          className="text-[18px] transition-transform duration-300 group-hover:translate-x-0.5"
          style={{ transitionTimingFunction: `cubic-bezier(${EASE.join(",")})` }}
        />
      </button>
    </form>
  );
}
