import type { MetadataRoute } from "next";
import { siteConfig } from "./seo-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/admin/chatbot`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0,
    },
  ];
}
