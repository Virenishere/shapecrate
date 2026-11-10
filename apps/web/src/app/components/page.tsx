import type { Metadata } from "next";
import Component from "@/components/preview/Component";

export const metadata: Metadata = {
  title: "Explore UI Components — Free HTML & CSS Building Blocks",
  description:
    "Browse modern, lightweight UI components including action buttons, aurora gradients, background patterns, and cards. Copy clean HTML and CSS instantly.",
  keywords: [
    "UI components",
    "CSS buttons",
    "Tailwind gradients",
    "background patterns",
    "copy paste components",
    "web components catalog",
    "free frontend blocks",
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
