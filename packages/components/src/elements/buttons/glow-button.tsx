import React from "react";
import type { ComponentItem } from "../../types";

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Reusable React GlowButton component.
 * Can be imported and used anywhere in React / Next.js apps.
 */
export function GlowButton({
  children = "Get started now",
  icon,
  className = "",
  ...props
}: GlowButtonProps) {
  return (
    <div className="group relative inline-flex items-center justify-center">
      {/* Ambient Diffuse Glow Backdrop */}
      <div
        aria-hidden="true"
        className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#625de8] via-[#a855f7] to-[#c7f36b] opacity-60 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg"
      />

      {/* Core Action Button */}
      <button
        type="button"
        className={`relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#202421] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#625de8] dark:bg-[#111312] dark:hover:bg-[#181b19] ${className}`}
        {...props}
      >
        {icon ?? (
          <svg
            className="size-4 text-(--lime) transition-transform duration-200 group-hover:scale-110"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        )}

        <span>{children}</span>

        {/* Trailing Arrow */}
        <svg
          className="size-4 text-white/70 transition-transform duration-200 group-hover:translate-x-0.5"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export function GlowButtonPreview() {
  return <GlowButton />;
}

export const glowButton: ComponentItem = {
  id: "glow-button",
  title: "Glow Button",
  category: "buttons",
  description:
    "A vibrant action button featuring an ambient gradient glow aura that blooms on hover, creating an electric neon depth effect.",
  tags: ["button", "glow", "neon", "gradient", "action", "cta"],
  component: GlowButtonPreview,
  code: {
    html: `<!-- Glow Button: Copy, paste, and use anywhere (Plain HTML & CSS + Tailwind compatible) -->
<style>
  .glow-btn-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .glow-backdrop {
    position: absolute;
    inset: -2px;
    border-radius: 14px;
    background: linear-gradient(90deg, #625de8, #a855f7, #c7f36b);
    opacity: 0.6;
    filter: blur(8px);
    transition: all 0.3s ease;
    pointer-events: none;
  }
  .glow-btn-wrapper:hover .glow-backdrop {
    opacity: 1;
    filter: blur(14px);
  }
  .glow-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 12px;
    background-color: #171918;
    color: #ffffff;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.12);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .glow-btn:hover {
    background-color: #202421;
    border-color: rgba(255, 255, 255, 0.25);
  }
  .glow-btn:active {
    transform: scale(0.98);
  }
</style>

<div class="glow-btn-wrapper group relative inline-flex items-center justify-center">
  <!-- Ambient Diffuse Glow Backdrop -->
  <div
    aria-hidden="true"
    class="glow-backdrop absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#625de8] via-[#a855f7] to-[#c7f36b] opacity-60 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg"
  ></div>

  <!-- Core Action Button -->
  <button
    type="button"
    class="glow-btn relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#202421] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#625de8] dark:bg-[#111312] dark:hover:bg-[#181b19]"
  >
    <!-- Lightning Bolt Icon -->
    <svg
      class="size-4 text-[#c7f36b] transition-transform duration-200 group-hover:scale-110"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>

    <span>Get started now</span>

    <!-- Trailing Arrow -->
    <svg
      class="size-4 text-white/70 transition-transform duration-200 group-hover:translate-x-0.5"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </button>
</div>`,

    react: `import React from "react";

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function GlowButton({
  children = "Get started now",
  icon,
  className = "",
  ...props
}: GlowButtonProps) {
  return (
    <div className="group relative inline-flex items-center justify-center">
      {/* Ambient Diffuse Glow Backdrop */}
      <div
        aria-hidden="true"
        className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#625de8] via-[#a855f7] to-[#c7f36b] opacity-60 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg"
      />

      {/* Core Action Button */}
      <button
        type="button"
        className={\`relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#202421] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#625de8] dark:bg-[#111312] dark:hover:bg-[#181b19] \${className}\`}
        {...props}
      >
        {icon ?? (
          <svg
            className="size-4 text-[#c7f36b] transition-transform duration-200 group-hover:scale-110"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        )}
        <span>{children}</span>
        <svg
          className="size-4 text-white/70 transition-transform duration-300 group-hover:translate-x-0.5"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}`,
  },
};

