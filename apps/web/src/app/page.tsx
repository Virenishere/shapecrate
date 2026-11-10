import type { Metadata } from "next";
import Landing from "@/components/landing/Landing";

export const metadata: Metadata = {
  title: {
    absolute:
      "Shapecrate — Free Copy-Paste HTML, CSS & Tailwind UI Components",
  },
  description:
    "Shapecrate is a free, open-source library of modern HTML, CSS, and Tailwind UI components. Zero dependencies, no npm installs, 100% copy-paste ready.",
  keywords: [
    "shapecrate",
    "shape crate",
    "shapecrate ui",
    "shapecrate components",
    "shapecrate github",
    "shapecrate free ui components",
    "shapecrate ui library",
    "copy paste UI components",
    "Tailwind CSS components",
    "free HTML CSS buttons",
    "zero dependency UI library",
    "no npm UI components",
    "open source UI library",
    "modern web components",
    "CSS button playground",
    "vanilla CSS components",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shapecrate — Free Copy-Paste HTML, CSS & Tailwind UI Components",
    description:
      "Shapecrate is a free, open-source library of modern HTML, CSS, and Tailwind UI components. Zero dependencies, no npm installs, 100% copy-paste ready.",
    url: "/",
  },
};

export default function Home() {
  return <Landing />;
}
