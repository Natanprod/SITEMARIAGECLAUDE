import type { MetadataRoute } from "next";
import { stories } from "@/content/stories";

const BASE = "https://nathanmathieu.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/maison", "/histoires", "/films", "/experience", "/contact"];

  return [
    ...pages.map((p) => ({
      url: `${BASE}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...stories.map((s) => ({
      url: `${BASE}/histoires/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
