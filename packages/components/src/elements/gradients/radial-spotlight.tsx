import type { ComponentItem } from "../../types";

export function RadialSpotlightPreview() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[#fbfbfa] dark:bg-[#111312] transition-colors"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(147, 130, 245, 0.65) 0%, rgba(167, 139, 250, 0.4) 30%, rgba(98, 93, 232, 0.15) 50%, transparent 70%), #fbfbfa",
      }}
    />
  );
}

export const radialSpotlight: ComponentItem = {
  id: "radial-spotlight",
  title: "Radial spotlight",
  category: "gradients",
  description: "Focused circular gradient spotlight for card backdrops and hero callouts.",
  tags: ["radial", "hero"],
  component: RadialSpotlightPreview,
  code: {
    html: `<!-- HTML + Tailwind CSS -->
<div
  class="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-3xl bg-[#fbfbfa] dark:bg-[#111312]"
  style="background: radial-gradient(circle at 50% 50%, rgba(147, 130, 245, 0.65) 0%, rgba(167, 139, 250, 0.4) 30%, rgba(98, 93, 232, 0.15) 50%, transparent 70%), #fbfbfa;"
></div>`,

    react: `// React + Tailwind CSS
export function RadialSpotlight({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-3xl bg-[#fbfbfa] dark:bg-[#111312]"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(147, 130, 245, 0.65) 0%, rgba(167, 139, 250, 0.4) 30%, rgba(98, 93, 232, 0.15) 50%, transparent 70%), #fbfbfa",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}`,
  },
};
