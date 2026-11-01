import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem-12rem)] w-full flex-col items-center justify-center px-4 py-16 text-center">
      <span className="font-mono text-sm font-semibold uppercase tracking-widest text-(--accent)">
        404
      </span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-(--ink) sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-(--ink-2) sm:text-base">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-(--ink) px-5 py-2.5 text-sm font-semibold text-(--surface) shadow-sm transition hover:opacity-90 active:scale-[0.98]"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        <span>Back to home</span>
      </Link>
    </div>
  );
}
