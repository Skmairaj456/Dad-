import type { Metadata } from "next";

export const SITE_URL = "https://www.deutscheautoden.com";
export const SITE_NAME = "Deutsche Auto Den";
export const SITE_DESCRIPTION =
  "Deutsche Auto Den is an independent automotive garage in Hyderabad for maintenance, diagnostics, repair, and considered performance work.";
export const SOCIAL_URLS = [
  "https://www.instagram.com/deutsche_auto_den/",
  "http://www.youtube.com/@DeutscheAutoDen",
];

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: "/brand-logo.jpg", alt: "Deutsche Auto Den logo" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ["/brand-logo.jpg"],
    },
  };
}
