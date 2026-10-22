import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/config";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/signature-sets",
    "/the-vault",
    "/how-we-work",
    "/portfolio",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const projectRoutes = projects.map((p) => `/portfolio/${p.slug}`);
  const routes = [...staticRoutes, ...projectRoutes];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date("2026-09-26"),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
