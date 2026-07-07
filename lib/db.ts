import {
  generateAlbums,
  generateComments,
  generatePhotos,
  generatePosts,
  generateTodos,
  generateUsers
} from "./seed";
import type { ResourceMap, ResourceName } from "./types";

type Store = { [K in ResourceName]: ResourceMap[K][] };

function createStore(): Store {
  return {
    users: generateUsers(),
    posts: generatePosts(),
    comments: generateComments(),
    albums: generateAlbums(),
    photos: generatePhotos(),
    todos: generateTodos()
  };
}

// Survives Next.js dev-server hot reloads (which re-evaluate this module),
// so writes don't reset until the process actually restarts.
const globalForStore = globalThis as unknown as { __mockApiStore?: Store };
const store =
  globalForStore.__mockApiStore ??
  (globalForStore.__mockApiStore = createStore());

export function list<K extends ResourceName>(
  resource: K,
  filters: Record<string, string> = {}
): ResourceMap[K][] {
  const items = store[resource];
  const entries = Object.entries(filters);
  if (entries.length === 0) return items;
  return items.filter((item) =>
    entries.every(
      ([key, value]) =>
        String((item as unknown as Record<string, unknown>)[key]) === value
    )
  );
}

export function getById<K extends ResourceName>(
  resource: K,
  id: number
): ResourceMap[K] | undefined {
  return store[resource].find((item) => item.id === id);
}

export function create<K extends ResourceName>(
  resource: K,
  data: Omit<ResourceMap[K], "id">
): ResourceMap[K] {
  const items = store[resource];
  const nextId = items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  const newItem = { ...data, id: nextId } as ResourceMap[K];
  items.push(newItem);
  return newItem;
}

export function update<K extends ResourceName>(
  resource: K,
  id: number,
  data: Partial<ResourceMap[K]>
): ResourceMap[K] | undefined {
  const items = store[resource];
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  const updated = { ...items[index], ...data, id } as ResourceMap[K];
  items[index] = updated;
  return updated;
}

export function remove<K extends ResourceName>(
  resource: K,
  id: number
): boolean {
  const items = store[resource];
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}
