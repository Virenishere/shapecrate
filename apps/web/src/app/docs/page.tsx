import type { Metadata } from "next";
import Documentation from "@/components/docs/Documentation";
import { JsonLd } from "@/components/seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shapecrate.vercel.app";

const docsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Documentation",
          item: `${siteUrl}/docs`,
        },
      ],
    },
    {
      "@type": "TechArticle",
      headline: "Shapecrate Documentation & Integration Guide",
      description:
        "Learn how to integrate Shapecrate components into React, Next.js, Vue, or static HTML.",
      url: `${siteUrl}/docs`,
      author: {
        "@type": "Organization",
        name: "Shapecrate",
        url: siteUrl,
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Documentation & Usage Guide",
  description:
    "Learn how to integrate Shapecrate components into React, Next.js, Vue, or static HTML. Zero build step, responsive mobile-first styling, and pure web standards.",
  keywords: [
    "Shapecrate documentation",
    "how to use CSS components",
    "Tailwind integration guide",
    "HTML UI components guide",
    "copy paste UI guide",
    "web development guide",
  ],
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "Documentation & Usage Guide | Shapecrate",
    description:
      "Learn how to integrate Shapecrate components into React, Next.js, Vue, or static HTML. Zero build step, responsive mobile-first styling, and pure web standards.",
    url: "/docs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation & Usage Guide | Shapecrate",
    description:
      "Learn how to integrate Shapecrate components into React, Next.js, Vue, or static HTML.",
  },
};

export default function DocumentationPage() {
  return (
    <>
      <JsonLd data={docsJsonLd} />
      <Documentation />
    </>
  );
}
