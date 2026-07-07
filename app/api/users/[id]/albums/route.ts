import { createNestedListRoute } from "@/lib/resource-handlers";

export const { GET } = createNestedListRoute("albums", "userId");
