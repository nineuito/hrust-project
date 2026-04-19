import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { cn } from "@/lib/cn";
import { titlePageMetadata } from "@/lib/metadata";

export const generateMetadata = titlePageMetadata("nav", "about");

type Chapter = { no: string; title: string; text: string };
type Stat = { value: string; label: string };

const CHAPTER_VISUALS = [
  { tone: "muted" as const, aspect: "aspect-[4/3]" },
  { tone: "accent" as const, aspect: "aspect-square" },
  { tone: "accent2" as const, aspect: "aspect-[4/3]" },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const chapters = t.raw("chapters") as Chapter[];
  const stats = t.raw("stats") as Stat[];
  const labels = t.raw("imageLabels") as {
    team: string;
    oven: string;
    chef: string;
  };
  const chapterImageLabels = [labels.team, labels.oven, labels.chef];

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
        <Container className="space-y-16 sm:space-y-24">
          {chapters.map((c, i) => {
            const visual = CHAPTER_VISUALS[i % CHAPTER_VISUALS.length];
            const imageFirstOnDesktop = i % 2 === 0;
            return (
              <article
                key={c.no}
                className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12"
              >
                <figure
                  className={cn(
                    "relative",
                    imageFirstOnDesktop ? "md:order-1" : "md:order-2",
                  )}
                >
                  <PlaceholderImage
                    label={chapterImageLabels[i % chapterImageLabels.length]}
                    tone={visual.tone}
                    className={cn("w-full hand-shadow", visual.aspect)}
                    rounded
                  />
                  <figcaption
                    className={cn(
                      "absolute -top-3 rotate-[-2deg] rounded-md border-2 border-ink bg-paper px-3 py-1 font-display text-4xl tracking-tight text-ink sm:-top-4 sm:text-5xl",
                      imageFirstOnDesktop ? "-left-3" : "-right-3",
                    )}
                  >
                    N°{c.no}
                  </figcaption>
                </figure>
                <div
                  className={cn(
                    "flex flex-col gap-4",
                    imageFirstOnDesktop ? "md:order-2" : "md:order-1",
                  )}
                >
                  <div className="font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                    [ CHAPTER {c.no} ]
                  </div>
                  <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                    {c.title}
                  </h2>
                  <p className="font-body text-base leading-relaxed text-ink-soft sm:text-lg">
                    {c.text}
                  </p>
                </div>
              </article>
            );
          })}
        </Container>
      </section>

      <section className="border-t-2 border-ink bg-muted py-12 sm:py-16">
        <Container>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.value}>
                <dt className="font-display text-4xl leading-none tracking-tight tabular-nums sm:text-5xl">
                  {s.value}
                </dt>
                <dd className="mt-2 font-body text-xs text-ink-soft uppercase tracking-wider">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
