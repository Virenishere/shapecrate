import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@shapecrate/components"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
