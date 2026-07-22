"use client";

import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsClient();

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
          <Link
            href="/guide"
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              pathname === "/guide" ? "bg-muted" : "hover:text-muted-foreground"
            )}
          >
            Guide
          </Link>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle theme"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && resolvedTheme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </nav>
      </div>
    </header>
  );
}
