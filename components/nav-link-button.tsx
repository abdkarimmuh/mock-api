"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export function NavLinkButton({
  href,
  children
}: {
  href: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className="bg-foreground text-background flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
    >
      {children}
    </button>
  );
}
