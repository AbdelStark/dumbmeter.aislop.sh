import type { MetadataRoute } from "next";
import { models } from "@/lib/mock-data";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date().toISOString();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${base}/methodology`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    }
  ];

  const modelRoutes: MetadataRoute.Sitemap = models.map((model) => ({
    url: `${base}/models/${model.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7
  }));

  return [...coreRoutes, ...modelRoutes];
}
