import { createResourceItemRoutes } from "@/lib/resource-handlers";

export const { GET, PUT, PATCH, DELETE } = createResourceItemRoutes("comments");
