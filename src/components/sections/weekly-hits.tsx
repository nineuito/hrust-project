import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/ui/product-card";
import { weeklyHits } from "@/lib/data/menu";

export async function WeeklyHits() {
  if (weeklyHits.length === 0) return null;
  const t = await getTranslations("home.hits");

  return (
    <section className="bg-muted py-12 sm:py-16">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {weeklyHits.map((p) => (
            <div key={p.id} className="w-64 flex-shrink-0 sm:w-auto">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
