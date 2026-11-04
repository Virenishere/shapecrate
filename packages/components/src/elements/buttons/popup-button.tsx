import type { ComponentItem } from "../../types";

export function PopupButtonPreview() {
  return (
    <div className="group relative inline-flex items-center justify-center">
      {/* Floating Hover Popup */}
      <div
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <div className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#171918] px-3.5 py-1.5 text-xs font-medium text-white shadow-xl shadow-black/20 dark:bg-white dark:text-[#171918]">
          <span className="size-2 rounded-full bg-[#10b981] animate-pulse" />
          <span>Instant preview ready</span>
          <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white/90 dark:bg-black/10 dark:text-black/80">
            ⌘P
          </span>
        </div>
        {/* Downward Caret Arrow */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-0.5 border-4 border-transparent border-t-[#171918] dark:border-t-white" />
      </div>

      {/* Action Button */}
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/15 transition-all hover:bg-[#2b2f2c] hover:shadow-lg active:scale-[0.98] dark:bg-white dark:text-[#171918] dark:hover:bg-[#f3f4f2] dark:shadow-white/5"
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
  );
}

export const popupButton: ComponentItem = {
  id: "popup-button",
  title: "Popup Button",
  category: "buttons",
  description: "An interactive action button featuring an animated floating popup tooltip on hover and keyboard focus.",
  tags: ["button", "tooltip", "popup", "hover", "action"],
  component: PopupButtonPreview,
  code: {
    html: `<!-- HTML + Tailwind CSS (with inline CSS fallback) -->
<div class="group relative inline-flex items-center justify-center">
  <!-- Floating Hover Popup Card -->
  <div
    role="tooltip"
    class="pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
    style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 10px; pointer-events: none; opacity: 0; transition: all 0.2s ease;"
  >
    <div
      class="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#171918] px-3.5 py-1.5 text-xs font-medium text-white shadow-xl shadow-black/20 dark:bg-white dark:text-[#171918]"
      style="display: flex; align-items: center; gap: 8px; white-space: nowrap; border-radius: 12px; background-color: #171918; padding: 6px 14px; font-size: 12px; font-weight: 500; color: #ffffff; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);"
    >
      <span class="size-2 rounded-full bg-[#10b981]" style="width: 8px; height: 8px; border-radius: 9999px; background-color: #10b981;"></span>
      <span>Instant preview ready</span>
      <span class="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white/90" style="border-radius: 4px; background-color: rgba(255, 255, 255, 0.2); padding: 2px 6px; font-size: 10px;">⌘P</span>
    </div>
    <!-- Downward Caret Arrow -->
    <div
      class="absolute left-1/2 top-full -translate-x-1/2 -translate-y-0.5 border-4 border-transparent border-t-[#171918] dark:border-t-white"
      style="position: absolute; left: 50%; top: 100%; transform: translateX(-50%) translateY(-2px); width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid #171918;"
    ></div>
  </div>

  <!-- Action Button -->
  <button
    type="button"
    class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#2b2f2c] hover:shadow-lg active:scale-[0.98] dark:bg-white dark:text-[#171918] dark:hover:bg-[#f3f4f2]"
    style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; background-color: #171918; padding: 10px 20px; font-size: 14px; font-weight: 600; color: #ffffff; border: none; cursor: pointer; box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.2); transition: all 0.2s ease;"
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

    react: `interface PopupButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  popupText?: string;
  badge?: string;
}

export function PopupButton({
  children = "Deploy project",
  popupText = "Instant preview ready",
  badge = "⌘P",
  className = "",
  ...props
}: PopupButtonProps) {
  return (
    <div className="group relative inline-flex items-center justify-center">
      {/* Floating Hover Popup */}
      <div
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <div className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#171918] px-3.5 py-1.5 text-xs font-medium text-white shadow-xl shadow-black/20 dark:bg-white dark:text-[#171918]">
          <span className="size-2 rounded-full bg-[#10b981] animate-pulse" />
          <span>{popupText}</span>
          {badge && (
            <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white/90 dark:bg-black/10 dark:text-black/80">
              {badge}
            </span>
          )}
        </div>
        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-0.5 border-4 border-transparent border-t-[#171918] dark:border-t-white" />
      </div>

      {/* Button */}
      <button
        type="button"
        className={\`inline-flex items-center justify-center gap-2 rounded-xl bg-[#171918] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/15 transition-all hover:bg-[#2b2f2c] hover:shadow-lg active:scale-[0.98] dark:bg-white dark:text-[#171918] dark:hover:bg-[#f3f4f2] \${className}\`}
        {...props}
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
        <span>{children}</span>
      </button>
    </div>
  );
}`,
  },
};

