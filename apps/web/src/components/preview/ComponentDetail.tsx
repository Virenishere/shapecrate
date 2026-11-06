"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Code,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sun,
  Moon,
} from "lucide-react";
import {
  componentsRegistry,
  type ComponentItem,
} from "@shapecrate/components";

interface ComponentDetailProps {
  id?: string;
  item?: ComponentItem;
  onBack?: () => void;
  onSelectRelated?: (item: ComponentItem) => void;
}

export function ComponentDetail({ id, item: propItem, onBack }: ComponentDetailProps) {
  const item =
    propItem ||
    componentsRegistry.find((c) => c.id === id) ||
    (id === "popup-button"
      ? componentsRegistry.find((c) => c.id === "popover-button")
      : undefined);

  const isButton = item?.category === "buttons";
  const isPopover = item?.id === "popover-button" || item?.id === "popup-button";
  const defaultColor =
    isPopover
      ? "#171918"
      : isButton
      ? "#625de8"
      : item?.id === "radial-spotlight"
      ? "rgba(147, 130, 245, 0.75)"
      : item?.category === "backgrounds"
      ? "#dfe2de"
      : "#a7f3d0";
  const defaultRadius = isButton ? 12 : 19;

  const [accentColor, setAccentColor] = useState(defaultColor);
  const [cornerRadius, setCornerRadius] = useState(defaultRadius);
  const [codeTab, setCodeTab] = useState<"css" | "html">("css");
  const [codePreviewDark, setCodePreviewDark] = useState(false);
  const [copiedGeneral, setCopiedGeneral] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCustomCss, setCopiedCustomCss] = useState(false);

  if (!item) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-(--ink)">Component not found</p>
        <Link
          href="/components"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-(--accent) px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-(--accent)/90"
        >
          <ArrowLeft className="size-4" />
          <span>Back to components</span>
        </Link>
      </div>
    );
  }

  const resetDefaults = () => {
    setAccentColor(defaultColor);
    setCornerRadius(defaultRadius);
  };

  // Generate dynamic customized CSS based on component type and playground controls
  const customizedCss =
    isPopover
      ? `/* Wrapper */
.popover-btn-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Floating Tooltip Card */
.popover-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(6px) scale(0.96);
  opacity: 0;
  pointer-events: none;
  z-index: 50;
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.popover-btn-wrapper:hover .popover-tooltip,
.popover-btn-wrapper:focus-within .popover-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
}

.popover-card {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #171918;
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
}

.popover-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: #10b981;
}

.popover-badge {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.9);
}

.popover-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-2px);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #171918;
}

/* Button */
.popover-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${accentColor};
  border-radius: ${cornerRadius}px;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.18);
  transition: all 0.2s ease;
}

.popover-button:hover {
  filter: brightness(1.08);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.24);
}

.popover-button:active {
  transform: scale(0.98);
}`
      : isButton
      ? `.${item.id} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${accentColor};
  border-radius: ${cornerRadius}px;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 14px 0 rgba(98, 93, 232, 0.25);
  transition: all 0.2s ease;
}

.${item.id}:hover {
  filter: brightness(1.08);
  box-shadow: 0 10px 20px 0 rgba(98, 93, 232, 0.30);
}

.${item.id}:active {
  transform: scale(0.98);
}`
    : item.category === "backgrounds"
    ? `.${item.id} {
  min-height: 320px;
  background-image:
    linear-gradient(to right, ${accentColor} 1px, transparent 1px),
    linear-gradient(to bottom, ${accentColor} 1px, transparent 1px);
  background-size: 24px 24px;
  border-radius: ${cornerRadius}px;
}`
    : item.id === "radial-spotlight"
    ? `.${item.id} {
  min-height: 320px;
  background:
    radial-gradient(circle at 50% 50%, ${accentColor} 0%, rgba(167, 139, 250, 0.4) 30%, rgba(98, 93, 232, 0.15) 50%, transparent 70%),
    #fbfbfa;
  border-radius: ${cornerRadius}px;
}`
    : `.${item.id} {
  min-height: 320px;
  background:
    radial-gradient(circle at 20% 20%, ${accentColor} 0, transparent 38%),
    radial-gradient(circle at 80% 10%, #bfdbfe 0, transparent 38%),
    linear-gradient(135deg, #f8fafc, #eef2ff);
  border-radius: ${cornerRadius}px;
}`;

  const customizedHtml =
    isPopover
      ? `<!-- HTML + Tailwind CSS (with clean CSS fallback) -->
<div class="popover-btn-wrapper group relative inline-flex items-center justify-center">
  <!-- Floating Hover Popover -->
  <div
    role="tooltip"
    id="popover-tooltip"
    class="popover-tooltip pointer-events-none absolute bottom-full left-1/2 z-50 mb-2.5 -translate-x-1/2 translate-y-1.5 scale-95 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
  >
    <div
      class="popover-card flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#171918] px-3.5 py-1.5 text-xs font-medium text-white shadow-xl shadow-black/20 dark:bg-white dark:text-[#171918]"
    >
      <span class="popover-dot size-2 rounded-full bg-[#10b981] animate-pulse"></span>
      <span>Instant preview ready</span>
      <span class="popover-badge rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white/90 dark:bg-black/10 dark:text-black/80">⌘P</span>
    </div>
    <div
      class="popover-arrow absolute left-1/2 top-full -translate-x-1/2 -translate-y-0.5 border-4 border-transparent border-t-[#171918] dark:border-t-white"
    ></div>
  </div>

  <!-- Action Button -->
  <button
    type="button"
    aria-describedby="popover-tooltip"
    class="popover-button inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:brightness-105 hover:shadow-lg active:scale-[0.98]"
    style="border-radius: ${cornerRadius}px; background-color: ${accentColor}; box-shadow: 0 4px 14px 0 color-mix(in srgb, ${accentColor} 25%, transparent);"
  >
    <svg
      class="size-4"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
    <span>Deploy project</span>
  </button>
</div>`
      : isButton
      ? `<button
  type="button"
  class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#625de8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#625de8]/25 transition-all hover:bg-[#524dd4] hover:shadow-lg hover:shadow-[#625de8]/30 active:scale-[0.98]"
  style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: ${cornerRadius}px; background-color: ${accentColor}; padding: 10px 20px; font-size: 14px; font-weight: 600; color: #ffffff; border: none; cursor: pointer; box-shadow: 0 4px 14px 0 color-mix(in srgb, ${accentColor} 25%, transparent); transition: all 0.2s ease;"
>
  <span>Start building</span>
  <svg
    class="size-4"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
</button>`
    : item.category === "backgrounds"
    ? `<!-- HTML + Tailwind CSS -->
<div
  class="relative min-h-[320px] w-full overflow-hidden"
  style="border-radius: ${cornerRadius}px; background-image: linear-gradient(to right, ${accentColor} 1px, transparent 1px), linear-gradient(to bottom, ${accentColor} 1px, transparent 1px); background-size: 24px 24px;"
>
  <!-- Content goes here -->
</div>`
    : item.id === "radial-spotlight"
    ? `<!-- HTML + Tailwind CSS -->
<div
  class="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden"
  style="border-radius: ${cornerRadius}px; background: radial-gradient(circle at 50% 50%, ${accentColor} 0%, rgba(167, 139, 250, 0.4) 30%, rgba(98, 93, 232, 0.15) 50%, transparent 70%), #fbfbfa;"
>
  <!-- Content goes here -->
</div>`
    : `<!-- HTML + Tailwind CSS -->
<div
  class="relative min-h-[320px] w-full overflow-hidden"
  style="border-radius: ${cornerRadius}px; background: radial-gradient(circle at 20% 20%, ${accentColor} 0, transparent 38%), radial-gradient(circle at 80% 10%, #bfdbfe 0, transparent 38%), linear-gradient(135deg, #f8fafc, #eef2ff);"
>
  <!-- Content goes here -->
</div>`;

  const displayedCode = codeTab === "css" ? customizedCss : customizedHtml;

  const handleCopyGeneral = async () => {
    try {
      await navigator.clipboard.writeText(customizedHtml);
      setCopiedGeneral(true);
      setTimeout(() => setCopiedGeneral(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyCodeBox = async () => {
    try {
      await navigator.clipboard.writeText(displayedCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyCustomCss = async () => {
    try {
      await navigator.clipboard.writeText(customizedCss);
      setCopiedCustomCss(true);
      setTimeout(() => setCopiedCustomCss(false), 2000);
    } catch {
      // fallback
    }
  };

  // Related components (exclude current item)
  const relatedComponents = componentsRegistry.filter((c) => c.id !== item.id);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 transition-colors">
      {/* Back to components navigation */}
      <div className="mb-6">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-(--line) bg-(--surface) px-4 py-2 text-xs sm:text-sm font-semibold text-(--ink-2) shadow-2xs transition-colors hover:border-(--ink-3) hover:text-(--ink)"
          >
            <ArrowLeft className="size-4" />
            <span>Back to components</span>
          </button>
        ) : (
          <Link
            href="/components"
            className="inline-flex items-center gap-2 rounded-xl border border-(--line) bg-(--surface) px-4 py-2 text-xs sm:text-sm font-semibold text-(--ink-2) shadow-2xs transition-colors hover:border-(--ink-3) hover:text-(--ink)"
          >
            <ArrowLeft className="size-4" />
            <span>Back to components</span>
          </Link>
        )}
      </div>

      {/* 1. Top Section: Header, Description, Tags, Copy Button */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-(--accent)">
            {item.category}
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-(--ink)">
            {item.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base sm:text-lg text-(--ink-2)">
            {item.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-(--line) bg-(--surface) px-2.5 py-1 font-mono text-xs text-(--ink-2)"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyGeneral}
          className="inline-flex items-center gap-2 self-start rounded-xl bg-(--ink) px-5 py-3 text-sm font-semibold text-(--surface) shadow-sm transition hover:opacity-90 active:scale-[0.98]"
        >
          {copiedGeneral ? (
            <>
              <Check className="size-4 text-(--lime)" />
              <span>Copied component</span>
            </>
          ) : (
            <>
              <Copy className="size-4" />
              <span>Copy component</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Full Live Interactive Canvas */}
      <div
        className="relative mt-8 flex min-h-[380px] sm:min-h-[460px] w-full items-center justify-center overflow-hidden border border-(--line) bg-(--surface-2) transition-all shadow-sm"
        style={{
          borderRadius: `${cornerRadius}px`,
        }}
      >
        {isPopover ? (
          <div className="group relative inline-flex items-center justify-center">
            {/* Floating Hover Popover */}
            <div
              role="tooltip"
              id="popover-tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2.5 -translate-x-1/2 translate-y-1.5 scale-95 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
            >
              <div className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#171918] px-3.5 py-1.5 text-xs font-medium text-white shadow-xl shadow-black/20 dark:bg-white dark:text-[#171918]">
                <span className="size-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>Instant preview ready</span>
                <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white/90 dark:bg-black/10 dark:text-black/80">
                  ⌘P
                </span>
              </div>
              <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-0.5 border-4 border-transparent border-t-[#171918] dark:border-t-white" />
            </div>

            {/* Action Button */}
            <button
              type="button"
              aria-describedby="popover-tooltip"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:brightness-105 hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: accentColor,
                borderRadius: `${cornerRadius}px`,
                boxShadow: `0 4px 14px 0 color-mix(in srgb, ${accentColor} 25%, transparent)`,
              }}
            >
              <svg
                className="size-4"
                width={16}
                height={16}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Deploy project</span>
            </button>
          </div>
        ) : isButton ? (
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#625de8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#625de8]/25 transition-all hover:brightness-105 hover:shadow-lg hover:shadow-[#625de8]/30 active:scale-[0.98]"
            style={{
              backgroundColor: accentColor,
              borderRadius: `${cornerRadius}px`,
              boxShadow: `0 4px 14px 0 color-mix(in srgb, ${accentColor} 25%, transparent)`,
            }}
          >
            <span>Start building</span>
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        ) : item.category === "backgrounds" ? (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, ${accentColor} 1px, transparent 1px), linear-gradient(to bottom, ${accentColor} 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        ) : item.id === "radial-spotlight" ? (
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#fbfbfa]"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, rgba(167, 139, 250, 0.4) 30%, rgba(98, 93, 232, 0.15) 50%, transparent 70%), #fbfbfa`,
            }}
          />
        ) : (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `radial-gradient(circle at 20% 20%, ${accentColor} 0, transparent 40%), radial-gradient(circle at 80% 15%, #bfdbfe 0, transparent 42%), linear-gradient(135deg, #f8fafc, #eef2ff)`,
            }}
          />
        )}
      </div>

      {/* 3. Middle Section: Code Viewer (Left) & Playground (Right) */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Code Box */}
        <div className="lg:col-span-8 overflow-hidden rounded-3xl border border-(--line) bg-(--surface) shadow-sm">
          {/* Header tabs + tools */}
          <div className="flex items-center justify-between border-b border-(--line) px-6 py-4">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setCodeTab("css")}
                className={`relative pb-1 text-sm font-bold transition-colors ${
                  codeTab === "css"
                    ? "text-(--ink) after:absolute after:bottom-[-16px] after:left-0 after:h-0.5 after:w-full after:bg-(--accent)"
                    : "text-(--ink-3) hover:text-(--ink)"
                }`}
              >
                CSS
              </button>
              <button
                type="button"
                onClick={() => setCodeTab("html")}
                className={`relative pb-1 text-sm font-bold transition-colors ${
                  codeTab === "html"
                    ? "text-(--ink) after:absolute after:bottom-[-16px] after:left-0 after:h-0.5 after:w-full after:bg-(--accent)"
                    : "text-(--ink-3) hover:text-(--ink)"
                }`}
              >
                HTML
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCodePreviewDark(!codePreviewDark)}
                aria-label="Toggle code viewer theme"
                className="flex size-9 items-center justify-center rounded-xl border border-(--line) bg-(--surface) text-(--ink-2) hover:text-(--ink) shadow-2xs transition-colors"
              >
                {codePreviewDark ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </button>
              <button
                type="button"
                onClick={handleCopyCodeBox}
                aria-label="Copy snippet"
                className="flex size-9 items-center justify-center rounded-xl border border-(--line) bg-(--surface) text-(--ink-2) hover:text-(--ink) shadow-2xs transition-colors"
              >
                {copiedCode ? (
                  <Check className="size-4 text-(--accent)" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Code display */}
          <div
            className={`p-6 transition-colors ${
              codePreviewDark ? "bg-[#161817] text-neutral-200" : "bg-(--surface) text-(--ink)"
            }`}
          >
            <pre className="overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed">
              <code>{displayedCode}</code>
            </pre>
          </div>
        </div>

        {/* Right Column: Playground Customize Box */}
        <div className="lg:col-span-4 rounded-3xl border border-(--line) bg-(--surface) p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-(--accent)">
              PLAYGROUND
            </span>
            <button
              type="button"
              onClick={resetDefaults}
              className="inline-flex items-center gap-1 text-xs text-(--ink-2) hover:text-(--ink) transition-colors"
            >
              <RotateCcw className="size-3" />
              <span>Reset defaults</span>
            </button>
          </div>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-(--ink)">
            Customize
          </h2>

          <div className="mt-6 flex flex-col gap-6">
            {/* Accent color control */}
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium text-(--ink)">
                  {isButton ? "Button color" : "Accent color"}
                </span>
                <span className="font-mono text-xs text-(--ink-3)">{accentColor}</span>
              </div>
              <div className="relative mt-2 h-9 w-full overflow-hidden rounded-xl border border-(--line) shadow-2xs">
                <div
                  className="h-full w-full"
                  style={{ backgroundColor: accentColor }}
                />
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                  aria-label="Pick color"
                />
              </div>
            </div>

            {/* Corner radius control */}
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium text-(--ink)">Corner radius</span>
                <span className="font-mono text-xs text-(--ink-3)">{cornerRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="36"
                value={cornerRadius}
                onChange={(e) => setCornerRadius(Number(e.target.value))}
                className="mt-3 w-full accent-(--accent) cursor-pointer"
                aria-label="Corner radius slider"
              />
            </div>

            {/* Copy customized CSS button */}
            <button
              type="button"
              onClick={handleCopyCustomCss}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-(--ink) py-3.5 px-4 text-sm font-semibold text-(--surface) shadow-sm transition hover:opacity-90 active:scale-[0.98]"
            >
              {copiedCustomCss ? (
                <>
                  <Check className="size-4 text-(--lime)" />
                  <span>Copied customized CSS</span>
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  <span>Copy customized CSS</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Three Feature Information Cards */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1: Accessibility */}
        <div className="flex flex-col rounded-3xl border border-(--line) bg-(--surface) p-6 sm:p-7 shadow-sm">
          <div className="flex size-10 items-center justify-center rounded-xl bg-(--accent-2) text-(--accent)">
            <Check className="size-5" />
          </div>
          <span className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-wider text-(--accent)">
            ACCESSIBILITY
          </span>
          <h3 className="mt-1 text-lg font-bold text-(--ink)">
            Built for real interfaces
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-(--ink-2)">
            Decorative elements should not be the only way important information is communicated.
          </p>
        </div>

        {/* Card 2: Responsive Usage */}
        <div className="flex flex-col rounded-3xl border border-(--line) bg-(--surface) p-6 sm:p-7 shadow-sm">
          <div className="flex size-10 items-center justify-center rounded-xl bg-(--accent-2) text-(--accent)">
            <Code className="size-5" />
          </div>
          <span className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-wider text-(--accent)">
            RESPONSIVE USAGE
          </span>
          <h3 className="mt-1 text-lg font-bold text-(--ink)">
            Works at every width
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-(--ink-2)">
            Use flexible sizing and sensible boundaries so components adapt smoothly across screens.
          </p>
        </div>

        {/* Card 3: Quick Start */}
        <div className="flex flex-col justify-between rounded-3xl border border-(--line) bg-(--surface) p-6 sm:p-7 shadow-sm">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-(--accent)">
              QUICK START
            </span>
            <ol className="mt-3 space-y-2 text-xs sm:text-sm text-(--ink-2)">
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-(--ink-3)">1</span>
                <span>Copy the HTML into your page.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-(--ink-3)">2</span>
                <span>Add the CSS to your stylesheet.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-(--ink-3)">3</span>
                <span>Adjust the values to match your design.</span>
              </li>
            </ol>
          </div>
          <span className="mt-5 font-mono text-xs text-(--ink-3)">
            No dependencies required.
          </span>
        </div>
      </div>

      {/* 5. Related Components Section */}
      {relatedComponents.length > 0 && (
        <div className="mt-20">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-(--accent)">
            KEEP EXPLORING
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-(--ink)">
            Related components
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
            {relatedComponents.map((rel) => {
              const RelPreview = rel.component;
              return (
                <article
                  key={rel.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-(--line) bg-(--surface) shadow-sm transition-all hover:shadow-md hover:border-(--ink-3)/30"
                >
                  <Link
                    href={`/components/${rel.id}`}
                    className="relative flex h-52 w-full cursor-pointer flex-col items-center justify-center overflow-hidden border-b border-(--line) bg-(--surface-2) p-6 transition-colors"
                  >
                    <RelPreview />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <Link href={`/components/${rel.id}`}>
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-(--accent)">
                        {rel.category}
                      </span>
                      <h3 className="mt-1 text-base font-bold text-(--ink) group-hover:text-(--accent) transition-colors">
                        {rel.title}
                      </h3>
                    </Link>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {rel.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-(--surface-2) px-2 py-0.5 font-mono text-[11px] text-(--ink-2)"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/components/${rel.id}`}
                          aria-label={`View ${rel.title} details`}
                          className="flex size-8 items-center justify-center rounded-xl border border-(--line) bg-(--surface) text-(--ink-2) shadow-2xs hover:border-(--ink-3) hover:text-(--ink) transition-colors"
                        >
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
