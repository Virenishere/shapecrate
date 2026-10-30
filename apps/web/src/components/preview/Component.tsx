"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, Copy, Check, ArrowRight } from "lucide-react";
import {
  componentsRegistry,
  type ComponentItem,
  type ComponentCategory,
} from "@shapecrate/components";

type FilterCategory = "all" | ComponentCategory;

const CATEGORIES: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "Backgrounds", value: "backgrounds" },
  { label: "Buttons", value: "buttons" },
  { label: "Cards", value: "cards" },
  { label: "Gradients", value: "gradients" },
  { label: "Effects", value: "effects" },
];

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "az">("newest");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter & search logic
  const filteredComponents = useMemo(() => {
    return componentsRegistry
      .filter((item) => {
        const matchesCategory =
          selectedCategory === "all" || item.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q));

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortOrder === "az") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [searchQuery, selectedCategory, sortOrder]);

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
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 transition-colors">
      {/* 1. Header Section */}
      <header className="mb-10 text-left">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-(--accent)">
          THE COLLECTION
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-(--ink)">
          Components
        </h1>
        <p className="mt-3 text-base sm:text-lg text-(--ink-2)">
          Copy-paste building blocks, made with plain HTML and CSS.
        </p>
      </header>

      {/* 2. Search & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        {/* Search input */}
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-(--ink-3)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components..."
            className="w-full rounded-2xl border border-(--line) bg-(--surface) py-2.5 pl-10 pr-4 text-sm text-(--ink) placeholder:text-(--ink-3) shadow-2xs transition-colors focus:border-(--ink-3) focus:outline-none"
          />
        </div>

        {/* Sort Select */}
        <div className="relative inline-flex items-center self-start sm:self-auto">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newest" | "az")}
            className="appearance-none cursor-pointer rounded-2xl border border-(--line) bg-(--surface) py-2.5 pl-4 pr-10 text-xs sm:text-sm font-medium text-(--ink) shadow-2xs transition-colors focus:border-(--ink-3) focus:outline-none"
            aria-label="Sort components"
          >
            <option value="newest">Sort Newest</option>
            <option value="az">Sort A-Z</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 size-4 text-(--ink-3)" />
        </div>
      </div>

      {/* 3. Category Filter Pills & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-(--line) bg-(--surface-2) p-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`rounded-xl px-3.5 py-1.5 text-xs sm:text-sm transition-all ${
                selectedCategory === cat.value
                  ? "bg-(--surface) text-(--ink) font-semibold shadow-2xs"
                  : "text-(--ink-2) font-medium hover:text-(--ink)"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <span className="font-mono text-xs text-(--ink-3)">
          {filteredComponents.length} component{filteredComponents.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* 4. Components Responsive Grid */}
      {filteredComponents.length === 0 ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl border border-(--line) bg-(--surface) p-8 text-center">
          <p className="text-base font-semibold text-(--ink)">No components found</p>
          <p className="mt-1 text-sm text-(--ink-2)">
            Try adjusting your search query or switching categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredComponents.map((item) => {
            const Preview = item.component;
            const isCopied = copiedId === item.id;

            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-(--line) bg-(--surface) shadow-sm transition-all hover:shadow-md hover:border-(--ink-3)/30"
              >
                {/* Visual Preview Box */}
                <Link
                  href={`/components/${item.id}`}
                  aria-label={`View ${item.title}`}
                  className="relative flex h-52 sm:h-56 w-full cursor-pointer flex-col items-center justify-center overflow-hidden border-b border-(--line) bg-(--surface-2) p-6 transition-colors"
                >
                  <Preview />
                </Link>

                {/* Card Content & Action Bar */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <Link
                    href={`/components/${item.id}`}
                    className="cursor-pointer block"
                  >
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-(--accent)">
                      {item.category}
                    </span>
                    <h2 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-(--ink) group-hover:text-(--accent) transition-colors">
                      {item.title}
                    </h2>
                  </Link>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-(--surface-2) px-2 py-0.5 font-mono text-[11px] text-(--ink-2)"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons: Copy + Arrow Right */}
                    <div className="flex items-center gap-1.5">
                      {/* 1. Quick Copy */}
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

                      {/* 2. Arrow Right Button (Navigates to dynamic component detail) */}
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
      )}
    </section>
  );
}
