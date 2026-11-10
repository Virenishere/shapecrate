import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { componentsRegistry } from "@shapecrate/components";
import { ComponentDetail } from "@/components/preview/ComponentDetail";
import { JsonLd } from "@/components/seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shapecrate.vercel.app";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  const ids = componentsRegistry.map((component) => ({
    id: component.id,
  }));
  if (!ids.some((c) => c.id === "popup-button")) {
    ids.push({ id: "popup-button" });
  }
  return ids;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const resolvedId = id === "popup-button" ? "popover-button" : id;
  const item = componentsRegistry.find((c) => c.id === resolvedId || c.id === id);

  if (!item) {
    return {
      title: "Component Not Found",
      description: "The requested UI component could not be found in the Shapecrate catalog.",
      robots: { index: false, follow: true },
    };
  }

  const categoryLabel =
    item.category.charAt(0).toUpperCase() + item.category.slice(1);
  const title = `${item.title} — Free CSS & HTML ${categoryLabel} Component`;
  const description = `${item.description} Preview, test in the interactive playground, and copy clean HTML and CSS code instantly with zero dependencies.`;

  return {
    title,
    description,
    keywords: [
      `shapecrate ${item.title.toLowerCase()}`,
      `shapecrate ${item.category}`,
      "shapecrate",
      "shape crate",
      "shapecrate free ui components",
      item.title,
      item.category,
      ...item.tags,
      "copy paste component",
      "CSS UI block",
      "Tailwind component",
      "open source component",
      "zero dependency CSS",
    ],
    alternates: {
      canonical: `/components/${resolvedId}`,
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
      title: `${title} | Shapecrate`,
      description,
      url: `/components/${resolvedId}`,
      type: "article",
      images: [
        {
          url: `${siteUrl}/components/${resolvedId}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${title} — Shapecrate`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Shapecrate`,
      description,
      images: [`${siteUrl}/components/${resolvedId}/twitter-image`],
    },
  };
}

export default async function ComponentPage({ params }: PageProps) {
  const { id } = await params;
  const resolvedId = id === "popup-button" ? "popover-button" : id;
  const item = componentsRegistry.find((c) => c.id === resolvedId || c.id === id);

  if (!item) {
    notFound();
  }

  const jsonLd = {
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
            name: "Components",
            item: `${siteUrl}/components`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.title,
            item: `${siteUrl}/components/${resolvedId}`,
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: item.title,
        description: item.description,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        license: "https://spdx.org/licenses/MIT",
        url: `${siteUrl}/components/${resolvedId}`,
        author: {
          "@type": "Organization",
          name: "Shapecrate",
          url: siteUrl,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ComponentDetail id={resolvedId} />
    </>
  );
}

