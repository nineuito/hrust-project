import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { UspStrip } from "@/components/sections/usp-strip";
import { Ticker } from "@/components/sections/ticker";
import { MenuTeaser } from "@/components/sections/menu-teaser";
import { WeeklyHits } from "@/components/sections/weekly-hits";
import { PromoBanner } from "@/components/sections/promo-banner";
import { Gallery } from "@/components/sections/gallery";
import { Reviews } from "@/components/sections/reviews";
import { DeliveryAppPromo } from "@/components/sections/delivery-app-promo";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <UspStrip />
      <Ticker />
      <MenuTeaser />
      <WeeklyHits />
      <PromoBanner />
      <Gallery />
      <Reviews />
      <DeliveryAppPromo />
    </>
  );
}
