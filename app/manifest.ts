import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Farrukh Sultan Portfolio",
    short_name: "Farrukh Sultan",
    description: "Senior Shopify Plus and Full Stack Developer portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#07090d",
    theme_color: "#080b11",
    icons: [
      {
        src: "/farrukh-favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
