import type { MetadataRoute } from "next";

const SITE_URL = "https://khrum.ua";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
