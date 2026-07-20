import Image from "next/image";
import Link from "next/link";

import { RESOURCES } from "@/lib/resource-info";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 dark:bg-black">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <Image
          src="/logo.png"
          alt="Mock API logo"
          width={72}
          height={72}
          className="rounded-2xl"
          priority
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Mock API
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A fake REST API for testing and prototyping — full CRUD, nested
            routes, and query filtering, backed by real in-memory data.
          </p>
        </div>
        <Link
          href="/guide"
          className="bg-foreground text-background flex h-12 items-center justify-center rounded-full px-6 font-medium transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Read the guide
        </Link>
        <div className="grid w-full grid-cols-2 gap-3 text-left sm:grid-cols-3">
          {RESOURCES.map((resource) => (
            <a
              key={resource.name}
              href={`/api/${resource.name}`}
              className="flex flex-col gap-1 rounded-xl border border-black/[.08] p-4 transition-colors hover:border-black/[.2] dark:border-white/[.145] dark:hover:border-white/[.3]"
            >
              <span className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                {resource.label}
              </span>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                /api/{resource.name}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {resource.count} items
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
