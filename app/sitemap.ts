import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hamsalekha.com";
  const routes = [
    "",
    "/about",
    "/services",
    "/signature-sets",
    "/the-vault",
    "/how-we-work",
    "/portfolio",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date("2026-09-26"),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
