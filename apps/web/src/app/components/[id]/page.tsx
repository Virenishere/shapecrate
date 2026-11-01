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
  return componentsRegistry.map((component) => ({
    id: component.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = componentsRegistry.find((c) => c.id === id);

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
      item.title,
      item.category,
      ...item.tags,
      "copy paste component",
      "CSS UI block",
      "Tailwind component",
      "open source component",
    ],
    alternates: {
      canonical: `/components/${id}`,
    },
    openGraph: {
      title: `${title} | Shapecrate`,
      description,
      url: `/components/${id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Shapecrate`,
      description,
    },
  };
}

export default async function ComponentPage({ params }: PageProps) {
  const { id } = await params;
  const item = componentsRegistry.find((c) => c.id === id);

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
            item: `${siteUrl}/components/${id}`,
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
        url: `${siteUrl}/components/${id}`,
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
      <ComponentDetail id={id} />
    </>
  );
}

