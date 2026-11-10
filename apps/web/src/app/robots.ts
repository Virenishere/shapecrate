import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shapecrate.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/manifest.webmanifest",
          "/*?*",
          "/opengraph-image*",
          "/twitter-image*",
          "/*/opengraph-image*",
          "/*/twitter-image*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

