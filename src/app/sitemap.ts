import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const publicRoutes = [
  ["/", 1, "weekly"],
  ["/services", 0.9, "monthly"],
  ["/booking", 0.8, "monthly"],
  ["/about", 0.7, "monthly"],
  ["/vision", 0.6, "monthly"],
  ["/why-choose-dad", 0.7, "monthly"],
  ["/technology", 0.8, "monthly"],
  ["/performance", 0.8, "monthly"],
  ["/founders", 0.6, "monthly"],
  ["/contact", 0.6, "monthly"],
  ["/campaign", 0.8, "weekly"],
  ["/rsa", 0.6, "monthly"],
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map(([path, priority, changeFrequency]) => ({
    url: `${SITE_URL}${path}`,
    priority,
    changeFrequency,
  }));
}
