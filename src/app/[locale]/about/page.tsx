import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { titlePageMetadata } from "@/lib/metadata";

export const generateMetadata = titlePageMetadata("nav", "about");

type Chapter = { no: string; title: string; text: string };

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const chapters = t.raw("chapters") as Chapter[];
  const labels = t.raw("imageLabels") as {
    team: string;
    oven: string;
    chef: string;
  };

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("titleLine1")}
            <br />
            <span className="text-accent">{t("titleLine2")}</span>
          </>
        }
        description={t("description")}
      />

      <section className="bg-paper py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-12">
            {chapters.map((c) => (
              <article key={c.no} className="grid grid-cols-[auto_1fr] gap-4">
                <div className="font-display text-4xl text-accent sm:text-5xl">
                  {c.no}
                </div>
                <div>
                  <h2 className="font-display text-2xl leading-tight sm:text-3xl">
                    {c.title}
                  </h2>
                  <p className="mt-3 font-hand text-lg text-ink-soft">{c.text}</p>
                </div>
              </article>
            ))}
          </div>
          <aside className="space-y-4">
            <PlaceholderImage
              label={labels.team}
              className="aspect-square"
              rounded
            />
            <PlaceholderImage
              label={labels.oven}
              tone="accent"
              className="aspect-[4/3]"
              rounded
            />
            <PlaceholderImage
              label={labels.chef}
              tone="accent2"
              className="aspect-[4/3]"
              rounded
            />
          </aside>
        </Container>
      </section>
    </>
  );
}
