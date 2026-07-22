import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
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
    <pre className="bg-muted text-foreground overflow-x-auto rounded-xl border p-4 font-mono text-xs leading-6">
      {children}
    </pre>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code className="bg-muted text-foreground rounded px-1 py-0.5 font-mono text-xs">
      {children}
    </code>
  );
}

export default function GuidePage() {
  const baseUrl = process.env.BASE_URL;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 py-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-foreground text-3xl font-semibold tracking-tight">
          Guide
        </h1>
        <p className="text-muted-foreground leading-7">
          Mock API is a small fake REST API. It exposes six resources with full
          CRUD, one-level nested routes, and query filtering. Writes are real:
          creating, updating, or deleting an item actually changes the in-memory
          data for as long as the server keeps running.
        </p>
        <p className="text-muted-foreground leading-7">
          Base URL: <InlineCode>{baseUrl ?? ""}</InlineCode>
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">
          Resources
        </h2>
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Base path</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RESOURCES.map((resource) => (
                <TableRow key={resource.name}>
                  <TableCell className="text-foreground font-medium">
                    {resource.label}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    /api/{resource.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {resource.count}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {resource.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">
          Routes
        </h2>
        {RESOURCES.map((resource) => {
          const base = `/api/${resource.name}`;
          return (
            <div key={resource.name} className="flex flex-col gap-3">
              <h3 className="text-foreground font-medium">{resource.label}</h3>
              <ul className="flex flex-col gap-2">
                {methods.map((method) => (
                  <li
                    key={method.verb + method.path(base)}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1"
                  >
                    <Badge variant="secondary" className="w-14 justify-center">
                      {method.verb}
                    </Badge>
                    <span className="text-muted-foreground font-mono text-xs">
                      {method.path(base)}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {method.description}
                    </span>
                  </li>
                ))}
                {resource.nested.map((nested) => (
                  <li
                    key={nested.path}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1"
                  >
                    <Badge variant="secondary" className="w-14 justify-center">
                      GET
                    </Badge>
                    <span className="text-muted-foreground font-mono text-xs">
                      {base}/:id/{nested.path}
                    </span>
                    <span className="text-muted-foreground text-xs">
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
        <h2 className="text-foreground text-xl font-semibold tracking-tight">
          Query filtering
        </h2>
        <p className="text-muted-foreground leading-7">
          Any top-level field on a resource can be used as a query parameter for
          exact-match filtering, e.g. <InlineCode>?userId=1</InlineCode> or{" "}
          <InlineCode>?completed=true</InlineCode>. Multiple parameters are
          combined with AND.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">
          Data &amp; persistence
        </h2>
        <p className="text-muted-foreground leading-7">
          Data starts from a deterministic seed and lives in memory on the
          server. <InlineCode>POST</InlineCode>, <InlineCode>PUT</InlineCode>,{" "}
          <InlineCode>PATCH</InlineCode>, and <InlineCode>DELETE</InlineCode>{" "}
          really mutate that data for the lifetime of the server process —
          restarting the dev server resets everything back to the seed data.
        </p>
      </section>

      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-foreground text-xl font-semibold tracking-tight">
            Examples
          </h2>
          <p className="text-muted-foreground leading-7">
            Every operation below is demonstrated against the{" "}
            <InlineCode>posts</InlineCode> resource — the same patterns apply to
            any of the six resources.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-foreground font-medium">1. Getting a resource</h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

// { id: 1, userId: 1, title: "...", body: "..." }`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-foreground font-medium">
            2. Listing all resources
          </h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts")
  .then((response) => response.json())
  .then((json) => console.log(json));

// [{ id: 1, userId: 1, title: "...", body: "..." }, ...] (100 items)`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-foreground font-medium">
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
          <h3 className="text-foreground font-medium">
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
          <h3 className="text-foreground font-medium">
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
          <h3 className="text-foreground font-medium">
            6. Deleting a resource
          </h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts/1", {
  method: "DELETE",
});

// 204 No Content — GET /api/posts/1 will now return 404.`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-foreground font-medium">
            7. Filtering resources
          </h3>
          <CodeBlock>{`fetch("${baseUrl}/api/posts?userId=1")
  .then((response) => response.json())
  .then((json) => console.log(json));

// Only posts where userId equals 1.`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-foreground font-medium">
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
