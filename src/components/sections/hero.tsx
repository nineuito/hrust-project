import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section className="border-b-2 border-ink bg-paper">
      <Container className="grid gap-10 py-10 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20">
        <div className="flex flex-col gap-6">
          <Tag tone="accent2" rotate>
            {t("eyebrow")}
          </Tag>
          <h1 className="font-display text-[clamp(2.5rem,13vw,4.5rem)] leading-[0.9] tracking-[-0.04em] break-words sm:text-7xl md:text-8xl">
            {t("titleLine1")}
            <br />
            <span className="text-accent">{t("titleLine2")}</span>
          </h1>
          <p className="max-w-md whitespace-pre-line font-hand text-lg text-ink-soft sm:text-xl">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/menu" variant="filled" size="lg">
              {t("ctaMenu")}
            </Button>
            <Button href="/delivery" variant="outline" size="lg">
              {t("ctaDelivery")}
            </Button>
          </div>
          <dl className="mt-2 grid grid-cols-3 gap-x-4 gap-y-2 font-hand sm:flex sm:flex-wrap sm:gap-x-8">
            <div>
              <dt className="text-xs text-ink-soft sm:text-sm">{t("stats.delivery")}</dt>
              <dd className="font-display text-xl sm:text-2xl">{t("stats.deliveryValue")}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-soft sm:text-sm">{t("stats.rating")}</dt>
              <dd className="font-display text-xl sm:text-2xl">{t("stats.ratingValue")}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-soft sm:text-sm">{t("stats.orders")}</dt>
              <dd className="font-display text-xl sm:text-2xl">{t("stats.ordersValue")}</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-2 sm:mx-0">
          <div className="absolute left-2 top-2 z-10 hand-rotate-neg sm:-left-4 sm:-top-4">
            <Tag tone="accent">{t("hotTag")}</Tag>
          </div>
          <PlaceholderImage
            label={t("heroPhoto")}
            tone="accent2"
            className="aspect-[4/5] w-full hand-shadow"
            rounded
          />
          <div className="absolute bottom-2 right-2 rotate-3 rounded-md border-2 border-ink bg-ink p-3 text-paper hand-shadow-sm sm:-bottom-4 sm:-right-4 sm:p-5">
            <div className="font-display text-xl sm:text-3xl">{t("promoAmount")}</div>
            <div className="font-hand text-xs sm:text-sm">{t("promoFirst")}</div>
            <div className="mt-1 font-hand text-[10px] text-accent-2 sm:text-xs">
              {t("promoCode")}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
