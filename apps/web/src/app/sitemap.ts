import type { MetadataRoute } from "next";
import { componentsRegistry } from "@shapecrate/components";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shapecrate.vercel.app";

// Stable release / update date to ensure Googlebot respects lastModified
const LAST_UPDATED = new Date("2026-11-10T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/components`,
      lastModified: LAST_UPDATED,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/open-source`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const dynamicComponents: MetadataRoute.Sitemap = componentsRegistry.map((item) => ({
    url: `${baseUrl}/components/${item.id}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...dynamicComponents];
}

