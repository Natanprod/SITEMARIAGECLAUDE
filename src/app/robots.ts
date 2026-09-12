import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/mentions-legales" },
    sitemap: "https://nathanmathieu.com/sitemap.xml",
  };
}
