# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` / `npm run lint:fix` — ESLint (flat config, `eslint-config-next`)
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier over `**/*.{ts,tsx}` (not currently in `package.json` deps/lock — install or `npx prettier` if the bare script fails)

There is no test suite in this repo. After any change, run `typecheck` and `lint`, and hit the relevant `/api/*` route with `curl` to confirm behavior (the in-memory store makes this cheap — see below).

## Architecture

This app is a mock REST API built entirely on Next.js Route Handlers, plus a small marketing/docs frontend for it.

### Data layer (`lib/`)

- `lib/types.ts` — shape of the six resources (`User`, `Post`, `Comment`, `Album`, `Photo`, `Todo`) and the `ResourceMap`/`ResourceName` mapping that every generic helper below is keyed on.
- `lib/seed.ts` — deterministic, dependency-free seed generators (loops + word lists, no faker) producing: 10 users, 100 posts, 500 comments, 100 albums, 5000 photos, 200 todos.
- `lib/db.ts` — the actual data store: a module-level object seeded once from `lib/seed.ts` and cached on `globalThis` (so it survives Next.js dev-server hot reloads, only resetting on a full process restart). Exposes generic `list`/`getById`/`create`/`update`/`remove` functions parameterized by `ResourceName`. Writes here are **real mutations**.
- `lib/resource-handlers.ts` — factories (`createResourceRoutes`, `createResourceItemRoutes`, `createNestedListRoute`) that produce the actual `GET`/`POST`/`PUT`/`PATCH`/`DELETE` Route Handler functions for a given resource. This is the pattern for the whole API: **every** file under `app/api/**/route.ts` is a one-line wrapper calling one of these factories. Add a new resource or nested route by adding a factory call, not by writing CRUD logic by hand.
- `lib/resource-info.ts` — single source of truth for resource metadata (label, seed count, description, nested routes). Consumed by both `app/page.tsx` and `app/guide/page.tsx` so the docs/UI never drift from what the API actually serves.

### API routes (`app/api/`)

Six resources, each with `route.ts` (list/create) and `[id]/route.ts` (get/replace/patch/delete); resources with children also have a nested `[id]/<child>/route.ts` that's just a filtered list (e.g. `posts/[id]/comments` ≡ `comments?postId=:id`). Query params on list endpoints do exact-match filtering against any top-level field.

Route Handler `params` are async in this Next.js version (`Promise<{ id: string }>`, must be `await`ed) — confirmed against `node_modules/next/dist/docs` per the note in `AGENTS.md`. Re-check that doc tree before changing route signatures; don't rely on training-data Next.js conventions.

### Frontend (`app/`, `components/`)

- `app/layout.tsx` wraps every page with `components/navbar.tsx` and `components/footer.tsx`, and injects a `next/script` (`strategy="beforeInteractive"`) that applies the `dark` class to `<html>` before first paint (reads `localStorage`, falls back to `prefers-color-scheme`).
- Dark mode is Tailwind v4's class strategy, enabled via `@custom-variant dark (&:where(.dark, .dark *));` in `app/globals.css` (not the default media-query strategy). `components/theme-toggle.tsx` is a client component that toggles the `.dark` class and persists the choice to `localStorage`.
- `components/nav-link-button.tsx` renders navigation as a `<button>` (via `useRouter().push()`) instead of `next/link`'s anchor — used where a button element is wanted with client-side navigation; follow this pattern rather than mixing raw anchors and buttons in the nav.
- `app/page.tsx` and `app/guide/page.tsx` are both driven by `lib/resource-info.ts` — extend that file, not these pages directly, when resource metadata changes.

### Environment variables

`.env` (gitignored; `.env.example` documents the shape) provides:

- `BASE_URL` — shown in the guide page's examples as the API's public base URL.
- `PROFILE_URL` — the link target for the author's name in the footer.

Both are read via plain `process.env.X` in Server Components — no `NEXT_PUBLIC_` prefix, since neither is ever needed client-side.
