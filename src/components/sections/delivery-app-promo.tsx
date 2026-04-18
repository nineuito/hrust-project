import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export async function DeliveryAppPromo() {
  const t = await getTranslations("home");
  const deliveryItems = t.raw("deliveryBlock.items") as string[];

  return (
    <section className="bg-paper py-12 sm:py-16">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="flex flex-col gap-4 rounded-lg border-2 border-ink bg-paper p-6 hand-shadow">
            <div className="font-hand text-sm uppercase tracking-[0.15em] text-ink-soft">
              {t("deliveryBlock.eyebrow")}
            </div>
            <h2 className="font-display text-3xl leading-none tracking-tight">
              {t("deliveryBlock.titleLine1")}
              <br />
              {t("deliveryBlock.titleLine2")}
            </h2>
            <ul className="space-y-1 font-hand text-lg text-ink-soft">
              {deliveryItems.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <div className="mt-auto">
              <Button href="/delivery" variant="outline">
                {t("deliveryBlock.cta")}
              </Button>
            </div>
          </article>

          <article className="flex flex-col gap-4 rounded-lg border-2 border-ink bg-ink p-6 text-paper hand-shadow">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-hand text-sm uppercase tracking-[0.15em] text-accent-2">
                  {t("appBlock.eyebrow")}
                </div>
                <h2 className="mt-1 font-display text-3xl leading-none tracking-tight">
                  {t("appBlock.titleLine1")}
                  <br />
                  {t("appBlock.titleLine2")}
                </h2>
              </div>
              <div className="rotate-3">
                <PlaceholderImage
                  label="app"
                  tone="accent"
                  className="h-24 w-16 shrink-0"
                  rounded
                />
              </div>
            </div>
            <p className="font-hand text-lg text-paper/80">
              {t("appBlock.description")}
              <span className="block text-accent-2">{t("appBlock.soon")}</span>
            </p>
            <div className="mt-auto flex flex-wrap gap-3">
              <Button href="/app" variant="filled">
                {t("appBlock.cta")}
              </Button>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
