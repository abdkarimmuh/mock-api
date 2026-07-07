import { createNestedListRoute } from "@/lib/resource-handlers";

export const { GET } = createNestedListRoute("posts", "userId");
