"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import { componentsRegistry, type ComponentItem } from "@shapecrate/components";

export default function FeatureComponent() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Take the 3 primary featured items from the registry
  const featuredComponents = componentsRegistry.slice(0, 3);

  const handleCopyCode = async (item: ComponentItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.code.html);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section
      id="featured-components"
      aria-labelledby="featured-components-heading"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 transition-colors"
    >
      {/* Header Row: Eyebrow, Title, and 'Browse all components' Link */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-(--accent)">
            FEATURED COMPONENTS
          </p>
          <h2
            id="featured-components-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-(--ink) sm:text-4xl md:text-5xl"
          >
            Small details. Big difference.
          </h2>
        </div>

        <Link
          href="/components"
          className="group inline-flex items-center gap-2 self-start sm:self-end text-sm font-semibold text-(--ink-2) hover:text-(--ink) transition-colors"
        >
          <span>Browse all components</span>
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* 3-Column Featured Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {featuredComponents.map((item) => {
          const Preview = item.component;
          const isCopied = copiedId === item.id;

          return (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-(--line) bg-(--surface) shadow-sm transition-all hover:shadow-md hover:border-(--ink-3)/30"
            >
              {/* Preview Canvas */}
              <Link
                href={`/components/${item.id}`}
                aria-label={`View ${item.title}`}
                className="relative flex h-52 sm:h-56 w-full cursor-pointer flex-col items-center justify-center overflow-hidden border-b border-(--line) bg-(--surface-2) p-6 transition-colors"
              >
                <Preview />
              </Link>

              {/* Card Meta & Action Bar */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <Link href={`/components/${item.id}`}>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-(--accent)">
                    {item.category}
                  </span>
                  <h3 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-(--ink) group-hover:text-(--accent) transition-colors">
                    {item.title}
                  </h3>
                </Link>

                <div className="mt-4 flex items-center justify-between gap-2">
                  {/* Tag Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-(--surface-2) px-2 py-0.5 font-mono text-[11px] text-(--ink-2)"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions: Copy + Arrow Link */}
                  <div className="flex items-center gap-1.5">
                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={(e) => handleCopyCode(item, e)}
                      aria-label={`Copy code for ${item.title}`}
                      title="Copy code"
                      className="flex size-8 sm:size-9 items-center justify-center rounded-xl border border-(--line) bg-(--surface) text-(--ink-2) shadow-2xs transition-colors hover:border-(--ink-3) hover:text-(--ink)"
                    >
                      {isCopied ? (
                        <Check className="size-3.5 sm:size-4 text-(--accent)" />
                      ) : (
                        <Copy className="size-3.5 sm:size-4" />
                      )}
                    </button>

                    {/* Arrow Detail Link */}
                    <Link
                      href={`/components/${item.id}`}
                      aria-label={`View ${item.title} details`}
                      title="View component details"
                      className="flex size-8 sm:size-9 items-center justify-center rounded-xl border border-(--line) bg-(--surface) text-(--ink-2) shadow-2xs transition-colors hover:border-(--ink-3) hover:text-(--ink)"
                    >
                      <ArrowRight className="size-3.5 sm:size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

