import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Icon } from "@/components/ui/icons";
import { titlePageMetadata } from "@/lib/metadata";

export const generateMetadata = titlePageMetadata("nav", "delivery");

type Step = { n: string; t: string; d: string };
type Zone = { name: string; price: string };

export default async function DeliveryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("delivery");
  const steps = t.raw("steps") as Step[];
  const zones = t.raw("zones") as Zone[];
  const payments = t.raw("payments") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        tone="paper"
        title={
          <>
            {t("titleLine1")}
            <span className="text-accent">{t("titleLine1Accent")}</span>
            <br />
            {t("titleLine2")}
          </>
        }
        description={t("description")}
      />

      <section className="bg-muted py-12 sm:py-16">
        <Container>
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            {t("stepsTitle")}
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li
                key={s.n}
                className="rounded-lg border-2 border-ink bg-paper p-5 hand-shadow-sm"
              >
                <div className="font-display text-4xl text-accent">{s.n}</div>
                <div className="mt-2 font-display text-xl">{s.t}</div>
                <div className="font-hand text-base text-ink-soft">{s.d}</div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-label="Map" className="bg-paper py-12 sm:py-16">
        <Container>
          <div
            role="img"
            aria-label="Delivery coverage map placeholder"
            className="relative overflow-hidden rounded-lg border-2 border-ink bg-muted hand-shadow"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative flex aspect-[16/9] w-full items-center justify-center sm:aspect-[21/9]">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-paper">
                  <Icon.Pin size={26} weight="bold" />
                </div>
                <div className="font-display text-2xl uppercase tracking-tight sm:text-3xl">
                  Google Maps
                </div>
                <div className="font-body text-sm text-ink-soft">{t("description")}</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper pb-12 sm:pb-16">
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border-2 border-ink p-6">
            <h2 className="font-display text-2xl">{t("zonesTitle")}</h2>
            <ul className="mt-4 space-y-2 font-hand text-lg">
              {zones.map((z) => (
                <li key={z.name} className="flex justify-between border-b border-ink/20 py-2">
                  <span>{z.name}</span>
                  <span className="font-display text-accent">{z.price}</span>
                </li>
              ))}
              <li className="flex justify-between py-2 text-ink-soft">
                <span>{t("freeFromLabel")}</span>
                <span>{t("freeFromValue")}</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border-2 border-ink bg-accent-2 p-6">
            <h2 className="font-display text-2xl">{t("paymentTitle")}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 font-hand text-lg">
              {payments.map((p) => (
                <li key={p} className="rounded-md border-2 border-ink bg-paper px-3 py-2">
                  ✓ {p}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
