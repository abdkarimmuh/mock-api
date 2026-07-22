import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { RESOURCES } from "@/lib/resource-info";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <Image
          src="/logo.png"
          alt="Mock API logo"
          width={72}
          height={72}
          className="rounded-2xl"
          priority
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-foreground text-4xl font-semibold tracking-tight">
            Mock API
          </h1>
          <p className="text-muted-foreground text-lg leading-8">
            A fake REST API for testing and prototyping — full CRUD, nested
            routes, and query filtering, backed by real in-memory data.
          </p>
        </div>
        <Link href="/guide" className={buttonVariants({ size: "lg" })}>
          Read the guide
        </Link>
        <div className="grid w-full grid-cols-2 gap-3 text-left sm:grid-cols-3">
          {RESOURCES.map((resource) => (
            <a key={resource.name} href={`/api/${resource.name}`}>
              <Card
                size="sm"
                className="hover:ring-foreground/20 h-full transition-colors"
              >
                <CardHeader>
                  <CardTitle>{resource.label}</CardTitle>
                  <CardDescription className="font-mono text-xs">
                    /api/{resource.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-xs">
                  {resource.count} items
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
