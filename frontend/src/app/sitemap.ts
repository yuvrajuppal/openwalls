import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://openwalls.app";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/allwallpapers`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/category`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/signup`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}
