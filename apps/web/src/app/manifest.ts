import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shapecrate — UI Building Blocks",
    short_name: "Shapecrate",
    description:
      "Free, copy-paste building blocks made with plain HTML and CSS for modern web apps.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbfa",
    theme_color: "#171918",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

