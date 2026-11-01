import type { Metadata } from "next";
import OpenSource from "@/components/open-source/OpenSource";

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
  return <OpenSource />;
}
