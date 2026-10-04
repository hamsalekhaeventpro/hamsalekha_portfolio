import type { Metadata } from "next";
import { seoMap } from "@/lib/content";

export function getPageMetadata(pageKey: keyof typeof seoMap, path: string): Metadata {
  const meta = seoMap[pageKey];
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      images: [{ url: meta.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: path,
    },
  };
}
