"use client";

import { Moon, Sun } from "lucide-react";

function toggleTheme() {
  const root = document.documentElement;
  const next = !root.classList.contains("dark");
  root.classList.toggle("dark", next);
  localStorage.setItem("theme", next ? "dark" : "light");
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-black/[.05] hover:text-zinc-950 dark:border-white/[.145] dark:text-zinc-400 dark:hover:bg-white/[.06] dark:hover:text-zinc-50"
    >
      <Moon className="block h-4.5 w-4.5 dark:hidden" />
      <Sun className="hidden h-4.5 w-4.5 dark:block" />
    </button>
  );
}
