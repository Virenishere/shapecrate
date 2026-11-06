import React from "react";
import type { ComponentItem } from "../../types";

export interface PopoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  popoverText?: string;
  badge?: string;
  icon?: React.ReactNode;
  statusDot?: boolean;
  className?: string;
}

/**
 * Reusable React PopoverButton component.
 * Can be imported and used anywhere in React / Next.js apps.
 */
export function PopoverButton({
  children = "Deploy project",
  popoverText = "Instant preview ready",
  badge = "⌘P",
  icon,
  statusDot = true,
  className = "",
  ...props
}: PopoverButtonProps) {
  return (
    <div className="group relative inline-flex items-center justify-center">
      {/* Floating Hover Popover */}
      <div
        role="tooltip"
        id="popover-tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2.5 -translate-x-1/2 translate-y-1.5 scale-95 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        <div className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#171918] px-3.5 py-1.5 text-xs font-medium text-white shadow-xl shadow-black/20 dark:bg-white dark:text-[#171918]">
          {statusDot && (
            <span className="size-2 rounded-full bg-[#10b981] animate-pulse" />
          )}
          <span>{popoverText}</span>
          {badge && (
            <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white/90 dark:bg-black/10 dark:text-black/80">
              {badge}
            </span>
          )}
        </div>
        {/* Downward Caret Arrow */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-0.5 border-4 border-transparent border-t-[#171918] dark:border-t-white" />
      </div>

      {/* Action Button */}
      <button
        type="button"
        aria-describedby="popover-tooltip"
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/15 transition-all hover:bg-[#2b2f2c] hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171918] dark:bg-white dark:text-[#171918] dark:hover:bg-[#f3f4f2] dark:shadow-white/5 dark:focus-visible:outline-white ${className}`}
        {...props}
      >
        {icon ?? (
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
        )}
        <span>{children}</span>
      </button>
    </div>
  );
}

export function PopoverButtonPreview() {
  return <PopoverButton />;
}

// Backward-compatible alias
export const PopupButtonPreview = PopoverButtonPreview;
export const PopupButton = PopoverButton;

export const popoverButton: ComponentItem = {
  id: "popover-button",
  title: "Popover Button",
  category: "buttons",
  description:
    "An interactive action button featuring an animated floating popover tooltip on hover and keyboard focus.",
  tags: ["button", "popover", "tooltip", "popup", "hover", "action"],
  component: PopoverButtonPreview,
  code: {
    html: `<!-- Popover Button: Copy, paste, and use anywhere (Plain HTML & CSS + Tailwind compatible) -->
<style>
  .popover-btn-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .popover-tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(6px) scale(0.96);
    opacity: 0;
    pointer-events: none;
    z-index: 50;
    white-space: nowrap;
    transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
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
    animation: popover-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
  .popover-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #171918;
    border-radius: 12px;
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
    background-color: #2b2f2c;
    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.24);
  }
  .popover-button:active {
    transform: scale(0.98);
  }
  @keyframes popover-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
</style>

<div class="popover-btn-wrapper group relative inline-flex items-center justify-center">
  <!-- Floating Hover Popover -->
  <div
    role="tooltip"
    id="popover-tooltip"
    class="popover-tooltip pointer-events-none absolute bottom-full left-1/2 z-50 mb-2.5 -translate-x-1/2 translate-y-1.5 scale-95 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
  >
    <div class="popover-card flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#171918] px-3.5 py-1.5 text-xs font-medium text-white shadow-xl shadow-black/20 dark:bg-white dark:text-[#171918]">
      <span class="popover-dot size-2 rounded-full bg-[#10b981] animate-pulse"></span>
      <span>Instant preview ready</span>
      <span class="popover-badge rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white/90 dark:bg-black/10 dark:text-black/80">⌘P</span>
    </div>
    <div class="popover-arrow absolute left-1/2 top-full -translate-x-1/2 -translate-y-0.5 border-4 border-transparent border-t-[#171918] dark:border-t-white"></div>
  </div>

  <!-- Trigger Action Button -->
  <button
    type="button"
    aria-describedby="popover-tooltip"
    class="popover-button inline-flex items-center justify-center gap-2 rounded-xl bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/15 transition-all hover:bg-[#2b2f2c] hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171918] dark:bg-white dark:text-[#171918] dark:hover:bg-[#f3f4f2]"
  >
    <svg
      class="size-4"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
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
</div>`,

    react: `import React from "react";

export interface PopoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  popoverText?: string;
  badge?: string;
  icon?: React.ReactNode;
  statusDot?: boolean;
  className?: string;
}

export function PopoverButton({
  children = "Deploy project",
  popoverText = "Instant preview ready",
  badge = "⌘P",
  icon,
  statusDot = true,
  className = "",
  ...props
}: PopoverButtonProps) {
  return (
    <div className="group relative inline-flex items-center justify-center">
      {/* Floating Hover Popover */}
      <div
        role="tooltip"
        id="popover-tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2.5 -translate-x-1/2 translate-y-1.5 scale-95 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        <div className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#171918] px-3.5 py-1.5 text-xs font-medium text-white shadow-xl shadow-black/20 dark:bg-white dark:text-[#171918]">
          {statusDot && (
            <span className="size-2 rounded-full bg-[#10b981] animate-pulse" />
          )}
          <span>{popoverText}</span>
          {badge && (
            <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white/90 dark:bg-black/10 dark:text-black/80">
              {badge}
            </span>
          )}
        </div>
        {/* Downward Caret Arrow */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-0.5 border-4 border-transparent border-t-[#171918] dark:border-t-white" />
      </div>

      {/* Action Button */}
      <button
        type="button"
        aria-describedby="popover-tooltip"
        className={\`inline-flex items-center justify-center gap-2 rounded-xl bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/15 transition-all hover:bg-[#2b2f2c] hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171918] dark:bg-white dark:text-[#171918] dark:hover:bg-[#f3f4f2] \${className}\`}
        {...props}
      >
        {icon ?? (
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
        )}
        <span>{children}</span>
      </button>
    </div>
  );
}`,
  },
};

// Backward-compatible alias
export const popupButton = popoverButton;
