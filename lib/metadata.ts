import type { Metadata } from "next";
import { seoMap } from "@/lib/content";
import { SITE_URL } from "@/lib/config";

export function getPageMetadata(pageKey: keyof typeof seoMap, path: string): Metadata {
  const meta = seoMap[pageKey];
  const fullUrl = `${SITE_URL}${path}`;
  const imageUrl = meta.ogImage.startsWith("http") ? meta.ogImage : `${SITE_URL}${meta.ogImage}`;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: fullUrl,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: meta.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}
