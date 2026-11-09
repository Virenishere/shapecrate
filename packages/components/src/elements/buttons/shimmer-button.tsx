import React from "react";
import type { ComponentItem } from "../../types";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Reusable React ShimmerButton component.
 * Can be imported and used anywhere in React / Next.js apps.
 */
export function ShimmerButton({
  children = "Explore features",
  icon,
  className = "",
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      type="button"
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/15 bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:border-white/30 hover:bg-[#202421] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171918] dark:border-white/20 dark:bg-[#181b19] dark:hover:bg-[#232724] dark:focus-visible:outline-white ${className}`}
      {...props}
    >
      {/* Animated Sweeping Shimmer Sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          animation: "shimmer-sweep 3s infinite ease-in-out",
        }}
      />

      {/* Leading Sparkle Icon */}
      {icon ?? (
        <svg
          className="size-4 text-(--lime) transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
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
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
        </svg>
      )}

      <span>{children}</span>

      {/* Trailing Arrow */}
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
  );
}

export function ShimmerButtonPreview() {
  return <ShimmerButton />;
}

export const shimmerButton: ComponentItem = {
  id: "shimmer-button",
  title: "Shimmer Button",
  category: "buttons",
  description:
    "A sleek action button featuring an animated sweeping light shimmer, subtle gradient border glow, and interactive hover elevation.",
  tags: ["button", "shimmer", "glow", "gradient", "action", "cta"],
  component: ShimmerButtonPreview,
  code: {
    html: `<!-- Shimmer Button: Copy, paste, and use anywhere (Plain HTML & CSS + Tailwind compatible) -->
<style>
  .shimmer-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    overflow: hidden;
    border-radius: 12px;
    background-color: #171918;
    color: #ffffff;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .shimmer-btn:hover {
    background-color: #202421;
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 24px -2px rgba(0, 0, 0, 0.35);
    transform: translateY(-1px);
  }
  .shimmer-btn:active {
    transform: translateY(0) scale(0.98);
  }
  .shimmer-sweep {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transform: translateX(-100%);
    background: linear-gradient(
      110deg,
      transparent 20%,
      rgba(255, 255, 255, 0.22) 50%,
      transparent 80%
    );
    animation: shimmer-sweep 3s infinite ease-in-out;
  }
  @keyframes shimmer-sweep {
    0% {
      transform: translateX(-100%);
    }
    50%, 100% {
      transform: translateX(100%);
    }
  }
</style>

<button
  type="button"
  class="shimmer-btn group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/15 bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:border-white/30 hover:bg-[#202421] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171918] dark:border-white/20 dark:bg-[#181b19] dark:hover:bg-[#232724]"
>
  <!-- Animated Sweeping Shimmer Sheen -->
  <span
    aria-hidden="true"
    class="shimmer-sweep pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
  ></span>

  <!-- Sparkle Icon -->
  <svg
    class="size-4 text-[#c7f36b] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
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
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
  </svg>

  <span>Explore features</span>

  <!-- Trailing Arrow -->
  <svg
    class="size-4 text-white/70 transition-transform duration-300 group-hover:translate-x-0.5"
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
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</button>`,

    react: `import React from "react";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function ShimmerButton({
  children = "Explore features",
  icon,
  className = "",
  ...props
}: ShimmerButtonProps) {
  return (
    <>
      <style>{\`
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(100%); }
        }
      \`}</style>
      <button
        type="button"
        className={\`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/15 bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:border-white/30 hover:bg-[#202421] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171918] dark:border-white/20 dark:bg-[#181b19] dark:hover:bg-[#232724] \${className}\`}
        {...props}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ animation: "shimmer-sweep 3s infinite ease-in-out" }}
        />
        {icon ?? (
          <svg
            className="size-4 text-[#c7f36b] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
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
            <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
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
    </>
  );
}`,
  },
};

