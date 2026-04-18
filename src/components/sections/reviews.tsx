import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { reviews, l } from "@/lib/data/menu";
import { cn } from "@/lib/cn";

export async function Reviews() {
  const t = await getTranslations("home.reviews");
  const locale = await getLocale();

  return (
    <section className="bg-muted py-12 sm:py-16">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <figure
              key={r.id}
              className={cn(
                "flex flex-col gap-3 rounded-md border-2 border-ink bg-paper p-5 hand-shadow-sm",
                i % 2 === 0 ? "sm:-rotate-1" : "sm:rotate-1",
              )}
            >
              <div className="font-display text-5xl leading-none text-accent">&ldquo;</div>
              <blockquote className="font-hand text-lg leading-snug text-ink">
                {l(r.text, locale)}
              </blockquote>
              <figcaption className="mt-auto flex items-center justify-between font-hand text-sm text-ink-soft">
                <span>— {l(r.author, locale)}</span>
                <span className="text-accent">{"★".repeat(r.rating)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
