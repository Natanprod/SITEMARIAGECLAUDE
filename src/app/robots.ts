import type { MetadataRoute } from "next";
import { maison } from "@/content/site";

/** Le site est entièrement statique : ces deux routes le sont aussi. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/mentions-legales" },
    sitemap: `${maison.url}/sitemap.xml`,
  };
}
