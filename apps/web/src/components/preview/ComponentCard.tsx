"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { ComponentItem, CodeFormat } from "@shapecrate/components";

export function ComponentCard({ item }: { item: ComponentItem }) {
  const [format, setFormat] = useState<CodeFormat>("html");
  const [copied, setCopied] = useState(false);

  const PreviewComponent = item.component;
  const currentCode = item.code[format];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-(--line) bg-(--surface) shadow-sm">
      {/* Card Header: Title & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-(--line) px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-(--ink)">
            {item.title}
          </h2>
          <p className="text-xs text-(--ink-2)">{item.description}</p>
        </div>

        {/* Format Selector + Copy */}
        <div className="flex items-center gap-2">
          {/* HTML / React Tab Switcher */}
          <div className="inline-flex rounded-lg border border-(--line) bg-(--surface-2) p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setFormat("html")}
              className={`rounded-md px-3 py-1 transition-colors ${
                format === "html"
                  ? "bg-(--surface) text-(--ink) shadow-2xs"
                  : "text-(--ink-2) hover:text-(--ink)"
              }`}
            >
              HTML
            </button>
            <button
              type="button"
              onClick={() => setFormat("react")}
              className={`rounded-md px-3 py-1 transition-colors ${
                format === "react"
                  ? "bg-(--surface) text-(--ink) shadow-2xs"
                  : "text-(--ink-2) hover:text-(--ink)"
              }`}
            >
              React
            </button>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-(--line) bg-(--surface) px-3 py-1.5 text-xs font-semibold text-(--ink) shadow-2xs transition-colors hover:bg-(--surface-2)"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-(--accent)" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-(--ink-2)" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Component Preview Canvas */}
      <div className="flex min-h-[180px] items-center justify-center bg-(--surface-2) p-8 transition-colors">
        <PreviewComponent />
      </div>

      {/* Code Snippet Box */}
      <div className="border-t border-(--line) bg-[#161817] p-5">
        <div className="flex items-center justify-between pb-3 text-[11px] font-mono text-neutral-400">
          <span>{format === "html" ? "button.html" : "Button.tsx"}</span>
          <span className="text-neutral-500">Tailwind CSS</span>
        </div>
        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-neutral-200">
          <code>{currentCode}</code>
        </pre>
      </div>
    </article>
  );
}

