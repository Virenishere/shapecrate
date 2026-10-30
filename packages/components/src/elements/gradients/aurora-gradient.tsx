import type { ComponentItem } from "../../types";

export function AuroraGradientPreview() {
  return (
    <div
      className="absolute inset-0 w-full h-full bg-[#fbfbfa] dark:bg-[#111312] transition-colors"
      style={{
        background:
          "radial-gradient(circle at 15% 25%, rgba(52, 211, 153, 0.55) 0%, transparent 48%), radial-gradient(circle at 85% 25%, rgba(96, 165, 250, 0.55) 0%, transparent 48%), radial-gradient(circle at 50% 85%, rgba(167, 139, 250, 0.45) 0%, transparent 55%), #fbfbfa",
      }}
    />
  );
}

export const auroraGradient: ComponentItem = {
  id: "aurora-gradient",
  title: "Aurora gradient",
  category: "gradients",
  description: "Vibrant, organic multi-color aurora gradient for hero banners and featured cards.",
  tags: ["hero", "colorful"],
  component: AuroraGradientPreview,
  code: {
    html: `<!-- HTML + Tailwind CSS -->
<div
  class="relative min-h-[320px] w-full overflow-hidden rounded-3xl bg-[#fbfbfa] dark:bg-[#111312]"
  style="background: radial-gradient(circle at 15% 25%, rgba(52, 211, 153, 0.55) 0%, transparent 48%), radial-gradient(circle at 85% 25%, rgba(96, 165, 250, 0.55) 0%, transparent 48%), radial-gradient(circle at 50% 85%, rgba(167, 139, 250, 0.45) 0%, transparent 55%), #fbfbfa;"
></div>`,

    react: `// React + Tailwind CSS
export function AuroraGradient({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="relative min-h-[320px] w-full overflow-hidden rounded-3xl bg-[#fbfbfa] dark:bg-[#111312]"
      style={{
        background:
          "radial-gradient(circle at 15% 25%, rgba(52, 211, 153, 0.55) 0%, transparent 48%), radial-gradient(circle at 85% 25%, rgba(96, 165, 250, 0.55) 0%, transparent 48%), radial-gradient(circle at 50% 85%, rgba(167, 139, 250, 0.45) 0%, transparent 55%), #fbfbfa",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}`,
  },
};
