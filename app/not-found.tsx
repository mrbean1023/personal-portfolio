import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="lowercase text-sm text-accent">
        <span className="select-none" aria-hidden="true">
          ~${" "}
        </span>
        cd /404
      </p>

      <h1 className="mt-6 text-6xl tracking-tight text-foreground sm:text-8xl">
        404
        <span className="text-accent"> ✦</span>
      </h1>

      <p className="mt-6 max-w-md lowercase text-sm leading-relaxed text-muted sm:text-base">
        error: the page you&apos;re looking for doesn&apos;t exist — it may have
        been moved, renamed, or never deployed.
      </p>

      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2 lowercase text-sm text-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        back home
      </Link>
    </main>
  );
}
