import type { Metadata } from "next";
import OpenSource from "@/components/open-source/OpenSource";
import { JsonLd } from "@/components/seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shapecrate.vercel.app";

const openSourceJsonLd = {
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
          name: "Open Source",
          item: `${siteUrl}/open-source`,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Open Source UI Library & Contribution Guide",
  description:
    "Shapecrate is 100% open source under the MIT license. Read our roadmap, propose features, and contribute your own components on GitHub.",
  keywords: [
    "open source UI",
    "MIT license UI library",
    "contribute to open source",
    "GitHub UI components",
    "Shapecrate roadmap",
    "open source frontend",
  ],
  alternates: {
    canonical: "/open-source",
  },
  openGraph: {
    title: "Open Source UI Library & Contribution Guide | Shapecrate",
    description:
      "Shapecrate is 100% open source under the MIT license. Read our roadmap, propose features, and contribute your own components on GitHub.",
    url: "/open-source",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source UI Library & Contribution Guide | Shapecrate",
    description:
      "Shapecrate is 100% open source under the MIT license. Read our roadmap and contribute components on GitHub.",
  },
};

export default function OpenSourcePage() {
  return (
    <>
      <JsonLd data={openSourceJsonLd} />
      <OpenSource />
    </>
  );
}
