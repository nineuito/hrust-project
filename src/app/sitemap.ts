import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://khrum.ua";

const paths = [
  "/",
  "/menu",
  "/about",
  "/delivery",
  "/contacts",
  "/app",
  "/cart",
  "/checkout",
  "/booking",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => {
        const url =
          locale === routing.defaultLocale
            ? `${SITE_URL}${path}`
            : `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
        return [locale, url];
      }),
    );
    return {
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages },
    };
  });
}
