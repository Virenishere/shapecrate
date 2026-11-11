import React from "react";
import type { ComponentItem } from "../../types";

export interface HoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  fillColor?: string;
}

/**
 * Reusable React HoverButton component.
 * Can be imported and used anywhere in React / Next.js apps.
 * Features a fluid slide-up liquid fill effect, icon translation, and tactile press response.
 */
export function HoverButton({
  children = "Explore components",
  icon,
  className = "",
  fillColor,
  ...props
}: HoverButtonProps) {
  return (
    <button
      type="button"
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-white/15 bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/25 transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:shadow-black/35 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#625de8] dark:border-white/20 dark:bg-[#111312] ${className}`}
      {...props}
    >
      {/* Sliding Fill Backdrop (slides up smoothly on hover) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-y-full rounded-xl bg-gradient-to-r from-[#625de8] to-[#8584c2] transition-transform duration-300 ease-out group-hover:translate-y-0"
        style={fillColor ? { background: fillColor } : undefined}
      />

      {/* Leading Sparkle / Cursor Icon */}
      <span className="relative z-10 flex items-center transition-transform duration-300 group-hover:scale-110">
        {icon ?? (
          <svg
            className="size-4 text-[#c7f36b] transition-colors duration-300 group-hover:text-white"
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
            <path d="M15 15l6 6m-6-6v4.5m0-4.5h4.5M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
          </svg>
        )}
      </span>

      {/* Button Text */}
      <span className="relative z-10 transition-colors duration-200">
        {children}
      </span>

      {/* Trailing Arrow Icon (slides right on hover) */}
      <svg
        className="relative z-10 size-4 text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
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

export function HoverButtonPreview() {
  return <HoverButton />;
}

export const hoverButton: ComponentItem = {
  id: "hover-button",
  title: "Hover Button",
  category: "buttons",
  description:
    "An interactive action button featuring a fluid slide-up liquid fill effect on hover, magnetic arrow animation, and tactile click feedback.",
  tags: ["button", "hover", "interactive", "animation", "action", "cta"],
  component: HoverButtonPreview,
  code: {
    html: `<!-- Hover Button: Copy, paste, and use anywhere (Plain HTML & CSS + Tailwind compatible) -->
<style>
  .hover-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
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
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hover-btn:hover {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 24px -2px rgba(98, 93, 232, 0.35);
  }

  .hover-btn:active {
    transform: scale(0.98);
  }

  .hover-btn-fill {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #625de8, #8584c2);
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
    border-radius: 12px;
  }

  .hover-btn:hover .hover-btn-fill {
    transform: translateY(0);
  }

  .hover-btn-content {
    position: relative;
    z-index: 10;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .hover-btn-icon-leading {
    transition: transform 0.3s ease;
  }

  .hover-btn:hover .hover-btn-icon-leading {
    transform: scale(1.1);
  }

  .hover-btn-icon-trailing {
    transition: transform 0.3s ease, color 0.3s ease;
    color: rgba(255, 255, 255, 0.7);
  }

  .hover-btn:hover .hover-btn-icon-trailing {
    transform: translateX(4px);
    color: #ffffff;
  }
</style>

<button type="button" class="hover-btn">
  <span class="hover-btn-fill" aria-hidden="true"></span>
  <span class="hover-btn-content">
    <!-- Leading Compass / Target Icon -->
    <svg
      class="hover-btn-icon-leading"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c7f36b"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M15 15l6 6m-6-6v4.5m0-4.5h4.5" />
    </svg>

    <span>Explore components</span>

    <!-- Trailing Arrow Icon -->
    <svg
      class="hover-btn-icon-trailing"
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
  </span>
</button>`,
    react: `import React from "react";

export function HoverButton({
  children = "Explore components",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={\`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-white/15 bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:border-white/30 hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#625de8] \${className}\`}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-y-full rounded-xl bg-gradient-to-r from-[#625de8] to-[#8584c2] transition-transform duration-300 ease-out group-hover:translate-y-0"
      />
      <span className="relative z-10 flex items-center gap-2.5">
        <svg
          className="size-4 text-[#c7f36b] transition-transform duration-300 group-hover:scale-110 group-hover:text-white"
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
          <circle cx="12" cy="12" r="9" />
          <path d="M15 15l6 6m-6-6v4.5m0-4.5h4.5" />
        </svg>
        <span>{children}</span>
        <svg
          className="size-4 text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
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
      </span>
    </button>
  );
}`,
  },
};

