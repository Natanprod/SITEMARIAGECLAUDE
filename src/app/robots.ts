import type { MetadataRoute } from "next";
import { maison } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/mentions-legales" },
    sitemap: `${maison.url}/sitemap.xml`,
  };
}
