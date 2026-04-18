import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { titlePageMetadata } from "@/lib/metadata";

export const generateMetadata = titlePageMetadata("nav", "contacts");

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contacts");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("titleLine1")}
            <br />
            <span className="text-accent">{t("titleLine2")}</span>
            <br />
            {t("titleLine3")}
          </>
        }
        description={t("description")}
      />

      <section className="bg-paper py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6">
            <div className="rounded-lg border-2 border-ink p-6">
              <div className="font-hand text-sm uppercase tracking-[0.2em] text-ink-soft">
                {t("addressLabel")}
              </div>
              <div className="mt-1 font-display text-2xl">{t("addressLine1")}</div>
              <div className="font-hand text-lg text-ink-soft">{t("addressLine2")}</div>
            </div>
            <div className="rounded-lg border-2 border-ink bg-accent-2 p-6">
              <div className="font-hand text-sm uppercase tracking-[0.2em]">
                {t("scheduleLabel")}
              </div>
              <div className="mt-1 font-display text-2xl">{t("scheduleHours")}</div>
              <div className="font-hand text-lg">{t("scheduleDays")}</div>
              <div className="font-hand text-sm text-ink-soft">{t("scheduleDelivery")}</div>
            </div>
            <div className="rounded-lg border-2 border-ink bg-ink p-6 text-paper">
              <div className="font-hand text-sm uppercase tracking-[0.2em] text-accent-2">
                {t("communicationLabel")}
              </div>
              <a
                href="tel:+380800501501"
                className="mt-1 block font-display text-2xl hover:text-accent"
              >
                0 800 501 501
              </a>
              <a
                href="mailto:hello@khrum.ua"
                className="block font-hand text-lg text-paper/80 hover:text-accent"
              >
                hello@khrum.ua
              </a>
              <div className="mt-3 flex gap-2 font-hand">
                {["IG", "TG", "TT", "FB"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper text-sm transition-colors hover:bg-paper hover:text-ink"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <PlaceholderImage
              label={t("mapLabel")}
              tone="muted"
              className="aspect-[4/5] h-full w-full"
              rounded
            />
          </div>
        </Container>
      </section>
    </>
  );
}
