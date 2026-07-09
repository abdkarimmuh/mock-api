import type { Metadata } from "next";

import { RESOURCES } from "@/lib/resource-info";

export const metadata: Metadata = {
  title: "Guide — Mock API",
  description:
    "How to use the Mock API: resources, routes, filtering, and persistence."
};

const methods: {
  verb: string;
  path: (base: string) => string;
  description: string;
}[] = [
  {
    verb: "GET",
    path: (base) => base,
    description: "List all items. Supports query filtering."
  },
  {
    verb: "GET",
    path: (base) => `${base}/:id`,
    description: "Get a single item by id."
  },
  { verb: "POST", path: (base) => base, description: "Create a new item." },
  {
    verb: "PUT",
    path: (base) => `${base}/:id`,
    description: "Replace an item."
  },
  {
    verb: "PATCH",
    path: (base) => `${base}/:id`,
    description: "Partially update an item."
  },
  {
    verb: "DELETE",
    path: (base) => `${base}/:id`,
    description: "Delete an item."
  }
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border bg-zinc-800 p-4 font-mono text-xs leading-6 text-white dark:border dark:border-white/[.2] dark:bg-white/[.05] dark:text-white">
      {children}
    </pre>
  );
}

export default function GuidePage() {
  const baseUrl = process.env.BASE_URL;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 py-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Guide
        </h1>
        <p className="leading-7 text-zinc-600 dark:text-zinc-400">
          Mock API is a small fake REST API. It exposes six resources with full
          CRUD, one-level nested routes, and query filtering. Writes are real:
          creating, updating, or deleting an item actually changes the in-memory
          data for as long as the server keeps running.
        </p>
        <p className="leading-7 text-zinc-600 dark:text-zinc-400">
          Base URL:{" "}
          <code className="font-mono text-xs text-zinc-950 dark:text-zinc-50">
            {baseUrl}
          </code>
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Resources
        </h2>
        <div className="overflow-x-auto rounded-xl border border-black/[.08] dark:border-white/[.145]">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="border-b border-black/[.08] text-zinc-500 dark:border-white/[.145] dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Resource</th>
                <th className="px-4 py-3 font-medium">Base path</th>
                <th className="px-4 py-3 font-medium">Count</th>
                <th className="px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {RESOURCES.map((resource) => (
                <tr
                  key={resource.name}
                  className="border-b border-black/[.08] last:border-0 dark:border-white/[.145]"
                >
                  <td className="px-4 py-3 font-medium text-zinc-950 dark:text-zinc-50">
                    {resource.label}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                    /api/{resource.name}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {resource.count}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {resource.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Routes
        </h2>
        {RESOURCES.map((resource) => {
          const base = `/api/${resource.name}`;
          return (
            <div key={resource.name} className="flex flex-col gap-3">
              <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
                {resource.label}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {methods.map((method) => (
                  <li
                    key={method.verb + method.path(base)}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-xs"
                  >
                    <span className="w-14 shrink-0 font-semibold text-zinc-950 dark:text-zinc-50">
                      {method.verb}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {method.path(base)}
                    </span>
                    <span className="font-sans text-zinc-400 dark:text-zinc-500">
                      {method.description}
                    </span>
                  </li>
                ))}
                {resource.nested.map((nested) => (
                  <li
                    key={nested.path}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-xs"
                  >
                    <span className="w-14 shrink-0 font-semibold text-zinc-950 dark:text-zinc-50">
                      GET
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {base}/:id/{nested.path}
                    </span>
                    <span className="font-sans text-zinc-400 dark:text-zinc-500">
                      Equivalent to /api/{nested.resource}?{nested.foreignKey}
                      =:id
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Query filtering
        </h2>
        <p className="leading-7 text-zinc-600 dark:text-zinc-400">
          Any top-level field on a resource can be used as a query parameter for
          exact-match filtering, e.g.{" "}
          <code className="font-mono text-xs">?userId=1</code> or{" "}
          <code className="font-mono text-xs">?completed=true</code>. Multiple
          parameters are combined with AND.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Data &amp; persistence
        </h2>
        <p className="leading-7 text-zinc-600 dark:text-zinc-400">
          Data starts from a deterministic seed and lives in memory on the
          server.
          <code className="mx-1 font-mono text-xs">POST</code>,
          <code className="mx-1 font-mono text-xs">PUT</code>,
          <code className="mx-1 font-mono text-xs">PATCH</code>, and
          <code className="mx-1 font-mono text-xs">DELETE</code>
          really mutate that data for the lifetime of the server process —
          restarting the dev server resets everything back to the seed data.
        </p>
      </section>

      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Examples
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            Every operation below is demonstrated against the{" "}
            <code className="font-mono text-xs">posts</code> resource — the same
            patterns apply to any of the six resources.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
            1. Getting a resource
          </h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

// { id: 1, userId: 1, title: "...", body: "..." }`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
            2. Listing all resources
          </h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts")
  .then((response) => response.json())
  .then((json) => console.log(json));

// [{ id: 1, userId: 1, title: "...", body: "..." }, ...] (100 items)`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
            3. Creating a resource
          </h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));

// { title: "foo", body: "bar", userId: 1, id: 101 }
// This really is added to the in-memory store — GET /api/posts/101 will return it.`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
            4. Updating a resource
          </h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts/1", {
  method: "PUT",
  body: JSON.stringify({
    id: 1,
    title: "foo",
    body: "bar",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));

// { id: 1, title: "foo", body: "bar", userId: 1 }`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
            5. Patching a resource
          </h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts/1", {
  method: "PATCH",
  body: JSON.stringify({
    title: "foo",
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));

// { id: 1, title: "foo", body: "...", userId: 1 }
// Only "title" changes — every other field keeps its previous value.`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
            6. Deleting a resource
          </h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts/1", {
  method: "DELETE",
});

// 204 No Content — GET /api/posts/1 will now return 404.`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
            7. Filtering resources
          </h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts?userId=1")
  .then((response) => response.json())
  .then((json) => console.log(json));

// Only posts where userId equals 1.`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-medium text-zinc-950 dark:text-zinc-50">
            8. Listing nested resources
          </h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts/1/comments")
  .then((response) => response.json())
  .then((json) => console.log(json));

// Equivalent to fetch("${baseUrl}/api/comments?postId=1")`}</CodeBlock>
        </div>
      </section>
    </div>
  );
}
