import type { ResourceName } from "./types";

export interface NestedRouteInfo {
  path: string;
  resource: ResourceName;
  foreignKey: string;
}

export interface ResourceInfo {
  name: ResourceName;
  label: string;
  count: number;
  description: string;
  nested: NestedRouteInfo[];
}

export const RESOURCES: ResourceInfo[] = [
  {
    name: "posts",
    label: "Posts",
    count: 100,
    description: "Blog posts, each owned by a user.",
    nested: [{ path: "comments", resource: "comments", foreignKey: "postId" }]
  },
  {
    name: "comments",
    label: "Comments",
    count: 500,
    description: "Comments left on a post.",
    nested: []
  },
  {
    name: "albums",
    label: "Albums",
    count: 100,
    description: "Photo albums, each owned by a user.",
    nested: [{ path: "photos", resource: "photos", foreignKey: "albumId" }]
  },
  {
    name: "photos",
    label: "Photos",
    count: 5000,
    description: "Photos belonging to an album.",
    nested: []
  },
  {
    name: "todos",
    label: "Todos",
    count: 200,
    description: "Todo items, each owned by a user.",
    nested: []
  },
  {
    name: "users",
    label: "Users",
    count: 10,
    description: "Users of the system.",
    nested: [
      { path: "posts", resource: "posts", foreignKey: "userId" },
      { path: "albums", resource: "albums", foreignKey: "userId" },
      { path: "todos", resource: "todos", foreignKey: "userId" }
    ]
  }
];
