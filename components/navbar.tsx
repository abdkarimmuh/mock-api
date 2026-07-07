import Image from "next/image";
import Link from "next/link";

import { NavLinkButton } from "@/components/nav-link-button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/[.08] bg-white/80 backdrop-blur dark:border-white/[.145] dark:bg-black/80">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Mock API logo"
            width={32}
            height={32}
            className="rounded-md"
          />
          <span className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Mock API
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <NavLinkButton href="/guide">Guide</NavLinkButton>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
