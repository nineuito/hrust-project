import type { Metadata } from "next";
import { Unbounded, Caveat, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { Providers } from "../providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileOrderBar } from "@/components/layout/mobile-order-bar";
import { routing } from "@/i18n/routing";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    metadataBase: new URL("https://khrum.ua"),
    alternates: {
      canonical: "/",
      languages: {
        uk: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      siteName: "ХРУМ.",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${display.variable} ${hand.variable} ${body.variable} h-full bg-canvas text-ink antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <Providers>
            <SiteHeader />
            <main className="flex-1 pb-24 md:pb-0">{children}</main>
            <SiteFooter />
            <MobileOrderBar />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
