import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Icon } from "@/components/ui/icons";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants/contacts";
import { titlePageMetadata } from "@/lib/metadata";

export const generateMetadata = titlePageMetadata("nav", "booking");

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  const items = t.raw("comingBoxItems") as string[];

  return (
    <section className="bg-paper py-16 sm:py-24">
      <Container className="mx-auto max-w-2xl text-center">
        <Tag tone="accent2" rotate>
          {t("tag")}
        </Tag>
        <h1 className="mt-4 font-display text-4xl leading-[0.9] tracking-tight break-words sm:text-6xl md:text-7xl">
          {t("titleLine1")}
          <br />
          <span className="text-accent">{t("titleAccent")}</span>
        </h1>
        <p className="mt-4 font-hand text-lg text-ink-soft">{t("description")}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={PHONE_HREF} variant="filled" size="lg">
            <Icon.Phone size={18} weight="bold" />
            {PHONE_DISPLAY}
          </Button>
          <Button href="/contacts" variant="outline" size="lg">
            {t("ctaContacts")}
          </Button>
        </div>
        <div className="mt-12 rounded-lg border-2 border-dashed border-ink bg-muted p-6 text-left font-hand text-base text-ink-soft">
          <div className="font-display text-base text-ink">{t("comingBoxTitle")}</div>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
