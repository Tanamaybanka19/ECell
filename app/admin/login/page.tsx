"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import { Icon } from "@/components/ui/icon";
import {
  login,
  MOCK_CREDENTIALS,
  useIsLoggedIn,
} from "@/lib/content/admin-store";

import { Button, INPUT_CLS, LABEL_CLS } from "../components/fields";

export default function AdminLoginPage(): ReactNode {
  const router = useRouter();
  const loggedIn = useIsLoggedIn();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loggedIn) router.replace("/admin");
  }, [loggedIn, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError("");
    if (await login(username, password)) {
      router.replace("/admin");
      return;
    }
    setError("Incorrect credentials.");
  }

  if (loggedIn) return null;

  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center justify-center px-6 py-44"
    >
      <div className="w-full max-w-96 rounded-4xl border border-foreground/8 bg-background p-8 shadow-sm sm:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">
          Admin
        </p>
        <h1 className="mt-2 font-serif text-[2rem] font-semibold tracking-tight text-foreground">
          Content Manager
        </h1>
        <p className="mt-2 text-[14px] tracking-tight text-foreground/60">
          Sign in to edit site content.
        </p>

        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="mt-7 flex flex-col gap-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLS}>Username</span>
            <input
              type="text"
              className={INPUT_CLS}
              value={username}
              autoComplete="username"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={LABEL_CLS}>Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`${INPUT_CLS} pr-10`}
                value={password}
                autoComplete="current-password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon
                  name={showPassword ? "visibility_off" : "visibility"}
                  className="text-[18px]"
                />
              </button>
            </div>
          </label>
          {error ? (
            <p className="text-[13px] tracking-tight text-red-500">{error}</p>
          ) : null}
          <Button variant="primary" type="submit">
            Sign in
            <Icon name="arrow_forward" className="text-[16px]" />
          </Button>
        </form>

        <p className="mt-6 border-t border-foreground/8 pt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-foreground/40">
          Prototype only — credentials: {MOCK_CREDENTIALS.username} /{" "}
          {MOCK_CREDENTIALS.password}
        </p>
      </div>
    </main>
  );
}
