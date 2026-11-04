import type { ComponentItem } from "../../types";

export function SimpleButtonPreview() {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#625de8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#625de8]/25 transition-all hover:bg-[#524dd4] hover:shadow-lg hover:shadow-[#625de8]/30 active:scale-[0.98]"
    >
      <span>Start building</span>
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
    html: `<button
  type="button"
  class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#625de8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#625de8]/25 transition-all hover:bg-[#524dd4] hover:shadow-lg hover:shadow-[#625de8]/30 active:scale-[0.98]"
  style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; background-color: #625de8; padding: 10px 20px; font-size: 14px; font-weight: 600; color: #ffffff; border: none; cursor: pointer; box-shadow: 0 4px 14px 0 rgba(98, 93, 232, 0.25); transition: all 0.2s ease;"
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
</button>`,

    react: `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function Button({ children = "Start building", className = "", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={\`inline-flex items-center justify-center gap-2 rounded-xl bg-[#625de8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#625de8]/25 transition-all hover:bg-[#524dd4] hover:shadow-lg hover:shadow-[#625de8]/30 active:scale-[0.98] \${className}\`}
      {...props}
    >
      <span>{children}</span>
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
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
      </svg>
    </button>
  );
}`,
  },
};
