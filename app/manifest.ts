import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Farrukh Sultan Portfolio",
    short_name: "Farrukh Sultan",
    description: "Senior Shopify Plus and Full Stack Developer portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#07090d",
    theme_color: "#6d5ef5",
    icons: [
      { src: "/fs-monogram.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
