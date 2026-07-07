import { createNestedListRoute } from "@/lib/resource-handlers";

export const { GET } = createNestedListRoute("todos", "userId");
