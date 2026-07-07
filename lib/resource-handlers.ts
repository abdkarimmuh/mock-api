import { NextRequest, NextResponse } from "next/server";

import { create, getById, list, remove, update } from "./db";
import type { ResourceMap, ResourceName } from "./types";

type IdParams = { params: Promise<{ id: string }> };

function parseFilters(searchParams: URLSearchParams): Record<string, string> {
  const filters: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    filters[key] = value;
  });
  return filters;
}

export function createResourceRoutes<K extends ResourceName>(resource: K) {
  async function GET(request: NextRequest) {
    const filters = parseFilters(request.nextUrl.searchParams);
    return NextResponse.json(list(resource, filters));
  }

  async function POST(request: NextRequest) {
    const body = (await request.json()) as Omit<ResourceMap[K], "id">;
    const created = create(resource, body);
    return NextResponse.json(created, { status: 201 });
  }

  return { GET, POST };
}

export function createResourceItemRoutes<K extends ResourceName>(resource: K) {
  async function GET(_request: NextRequest, { params }: IdParams) {
    const { id } = await params;
    const item = getById(resource, Number(id));
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  }

  async function PUT(request: NextRequest, { params }: IdParams) {
    const { id } = await params;
    const body = (await request.json()) as Partial<ResourceMap[K]>;
    const updated = update(resource, Number(id), body);
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  }

  async function PATCH(request: NextRequest, context: IdParams) {
    return PUT(request, context);
  }

  async function DELETE(_request: NextRequest, { params }: IdParams) {
    const { id } = await params;
    const removed = remove(resource, Number(id));
    if (!removed) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  }

  return { GET, PUT, PATCH, DELETE };
}

export function createNestedListRoute<K extends ResourceName>(
  resource: K,
  foreignKey: string
) {
  async function GET(_request: NextRequest, { params }: IdParams) {
    const { id } = await params;
    return NextResponse.json(list(resource, { [foreignKey]: id }));
  }

  return { GET };
}
