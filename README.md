# Mock API

A fake REST API for testing and prototyping, built with Next.js Route Handlers. Six resources, full CRUD, one-level nested routes, and query filtering — backed by real in-memory data instead of faked writes.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or [http://localhost:3000/guide](http://localhost:3000/guide) for full API documentation and examples.

## Scripts

| Command                             | Description                   |
| ----------------------------------- | ----------------------------- |
| `npm run dev`                       | Start the dev server          |
| `npm run build` / `npm run start`   | Production build / serve      |
| `npm run lint` / `npm run lint:fix` | ESLint                        |
| `npm run typecheck`                 | `tsc --noEmit`                |
| `npm run format`                    | Prettier over `**/*.{ts,tsx}` |

## Resources

| Resource | Base path       | Items |
| -------- | --------------- | ----- |
| Posts    | `/api/posts`    | 100   |
| Comments | `/api/comments` | 500   |
| Albums   | `/api/albums`   | 100   |
| Photos   | `/api/photos`   | 5000  |
| Todos    | `/api/todos`    | 200   |
| Users    | `/api/users`    | 10    |

Each resource supports `GET` (list, with query filtering), `GET /:id`, `POST`, `PUT /:id`, `PATCH /:id`, and `DELETE /:id`. Related resources also expose one-level nested routes, e.g. `/api/posts/1/comments` is equivalent to `/api/comments?postId=1`.

See [`/guide`](http://localhost:3000/guide) for the full route reference and `fetch()` examples.

## Data & persistence

Data starts from a deterministic seed and lives in memory on the server. Writes are real: `POST`, `PUT`, `PATCH`, and `DELETE` actually mutate the data for as long as the server process is running. Restarting the dev server resets everything back to the seed data.

## Environment variables

Copy `.env.example` to `.env` and adjust as needed:

| Variable      | Used for                                        |
| ------------- | ----------------------------------------------- |
| `BASE_URL`    | The base URL shown in the guide page's examples |
| `PROFILE_URL` | Link target for the author's name in the footer |

## Tech stack

Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript, [lucide-react](https://lucide.dev/) for icons.
