"use client";

import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function Header() {
  const router = useRouter();

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="bg-background/80 sticky top-0 z-10 border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Mock API logo"
            width={32}
            height={32}
            className="rounded-md"
          />
          <span className="text-foreground text-lg font-semibold tracking-tight">
            Mock API
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium">
          <Button type="button" onClick={() => router.push("/guide")}>
            <div className="px-1">Guide</div>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Moon className="block dark:hidden" />
            <Sun className="hidden dark:block" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
