import type { Metadata } from "next";
import Component from "@/components/preview/Component";

export const metadata: Metadata = {
  title: "Explore UI Components — Free HTML & CSS Building Blocks",
  description:
    "Browse modern, lightweight UI components including action buttons, aurora gradients, background patterns, and cards. Copy clean HTML and CSS instantly.",
  keywords: [
    "shapecrate",
    "shape crate",
    "shapecrate components",
    "shapecrate ui library",
    "shapecrate free ui components",
    "UI components catalog",
    "CSS buttons",
    "copy paste UI components",
    "Tailwind CSS components",
    "zero dependency UI library",
    "free frontend blocks",
    "open source web components",
    "CSS button playground",
  ],
  alternates: {
    canonical: "/components",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Explore UI Components — Free HTML & CSS Building Blocks | Shapecrate",
    description:
      "Browse modern, lightweight UI components including action buttons, aurora gradients, background patterns, and cards. Copy clean HTML and CSS instantly.",
    url: "/components",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore UI Components — Free HTML & CSS Building Blocks | Shapecrate",
    description:
      "Browse modern, lightweight UI components including action buttons, aurora gradients, background patterns, and cards.",
  },
};

export default function ComponentsPage() {
  return <Component />;
}
