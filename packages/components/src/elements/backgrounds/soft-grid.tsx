import type { ComponentItem } from "../../types";

export function SoftGridPreview() {
  return (
    <div
      className="absolute inset-0 bg-[#fbfbfa] dark:bg-[#111312] transition-colors"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(99, 102, 241, 0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.22) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />
  );
}

export const softGrid: ComponentItem = {
  id: "soft-grid",
  title: "Soft grid",
  category: "backgrounds",
  description: "Subtle mathematical square grid pattern for technical dashboards and feature sections.",
  tags: ["grid", "pattern"],
  component: SoftGridPreview,
  code: {
    html: `<!-- HTML + Tailwind CSS -->
<div
  class="min-h-[320px] w-full rounded-3xl bg-[#fbfbfa] dark:bg-[#111312]"
  style="background-image: linear-gradient(to right, rgba(99, 102, 241, 0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.22) 1px, transparent 1px); background-size: 24px 24px;"
></div>`,

    react: `// React + Tailwind CSS
export function SoftGrid({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="relative min-h-[320px] w-full rounded-3xl bg-[#fbfbfa] dark:bg-[#111312]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(99, 102, 241, 0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.22) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}`,
  },
};
