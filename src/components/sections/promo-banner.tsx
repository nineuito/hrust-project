import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export async function PromoBanner() {
  const t = await getTranslations("home.promo");

  return (
    <section className="bg-paper py-10">
      <Container>
        <div className="relative overflow-hidden rounded-lg border-2 border-ink bg-accent text-white hand-shadow">
          <div className="absolute inset-0 opacity-20" aria-hidden>
            <div className="absolute -left-10 top-10 font-display text-[12rem] leading-none tracking-tight">
              -30%
            </div>
          </div>
          <div className="relative grid gap-6 p-6 md:grid-cols-[1.3fr_1fr] md:items-center md:p-10">
            <div>
              <div className="font-hand text-base text-accent-2">{t("code")}</div>
              <div className="font-display text-5xl leading-none tracking-tight sm:text-6xl">
                {t("codeValue")}
              </div>
              <p className="mt-3 max-w-md font-hand text-lg text-white/90">
                {t("description")}
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Button href="/menu" variant="dark" size="lg" className="border-paper">
                {t("cta")}
              </Button>
              <span className="font-hand text-sm text-white/80">
                {t("deliveryHint")}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
