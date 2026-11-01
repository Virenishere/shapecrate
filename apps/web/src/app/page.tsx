import type { Metadata } from "next";
import Landing from "@/components/landing/Landing";

export const metadata: Metadata = {
  title: {
    absolute:
      "Shapecrate — Free HTML, CSS & Tailwind UI Components | Copy & Paste",
  },
  description:
    "Free, open-source UI building blocks crafted with plain HTML, modern CSS, and Tailwind. Zero dependencies, no npm installs, 100% customizable.",
  keywords: [
    "copy paste UI components",
    "Tailwind CSS components",
    "HTML CSS building blocks",
    "open source UI library",
    "modern web components",
    "free CSS buttons",
    "CSS gradient generator",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shapecrate — Free HTML, CSS & Tailwind UI Components",
    description:
      "Free, open-source UI building blocks crafted with plain HTML, modern CSS, and Tailwind. Zero dependencies, no npm installs, 100% customizable.",
    url: "/",
  },
};

export default function Home() {
  return <Landing />;
}
