import type { MetadataRoute } from "next";
import { PUBLIC_SEO_PATHS, SITE_URL } from "@/lib/seo";

const routeMetadata: Record<string, { priority: number; changeFrequency: "weekly" | "monthly" }> = {
  "/": { priority: 1, changeFrequency: "weekly" },
  "/services": { priority: 0.9, changeFrequency: "monthly" },
  "/booking": { priority: 0.8, changeFrequency: "monthly" },
  "/about": { priority: 0.7, changeFrequency: "monthly" },
  "/vision": { priority: 0.6, changeFrequency: "monthly" },
  "/why-choose-dad": { priority: 0.7, changeFrequency: "monthly" },
  "/technology": { priority: 0.8, changeFrequency: "monthly" },
  "/performance": { priority: 0.8, changeFrequency: "monthly" },
  "/founders": { priority: 0.6, changeFrequency: "monthly" },
  "/contact": { priority: 0.6, changeFrequency: "monthly" },
  "/campaign": { priority: 0.8, changeFrequency: "weekly" },
  "/rsa": { priority: 0.6, changeFrequency: "monthly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_SEO_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    ...routeMetadata[path],
  }));
}
