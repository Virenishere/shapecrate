import type { ComponentItem } from "../../types";

export function SimpleButtonPreview() {
  return (
    <button
      type="button"
      style={{ backgroundColor: "var(--accent, #625de8)" }}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#625de8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#625de8]/25 transition-all hover:bg-[#524dd4] hover:shadow-lg hover:shadow-[#625de8]/30 active:scale-[0.98]"
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
  );
}

export const simpleButton: ComponentItem = {
  id: "simple-button",
  title: "Simple Button",
  category: "buttons",
  description: "A clean, responsive action button with Shapecrate accent styling, hover elevation, and click feedback.",
  tags: ["button", "action", "cta"],
  component: SimpleButtonPreview,
  code: {
    html: `<!-- HTML + Tailwind CSS -->
<button
  type="button"
  class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#625de8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#625de8]/25 transition-all hover:bg-[#524dd4] active:scale-[0.98]"
>
  <span>Start building</span>
  <svg
    class="size-4"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
    />
  </svg>
</button>`,

    react: `// React + Tailwind CSS
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function Button({ children = "Start building", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#625de8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#625de8]/25 transition-all hover:bg-[#524dd4] active:scale-[0.98]"
      {...props}
    >
      <span>{children}</span>
      <ArrowRight className="size-4" aria-hidden="true" />
    </button>
  );
}`,
  },
};
