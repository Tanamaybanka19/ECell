import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes = [
    { path: "/", priority: 1 },
    { path: "/departments", priority: 0.8 },
    { path: "/newsletter", priority: 0.7 },
    { path: "/podcasts", priority: 0.7 },
    { path: "/archives", priority: 0.6 },
    { path: "/archives/workforce", priority: 0.5 },
    { path: "/archives/events", priority: 0.5 },
    { path: "/archives/aftermovie", priority: 0.5 },
    { path: "/contact", priority: 0.8 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
