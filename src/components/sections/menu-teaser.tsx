"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CategoryPill } from "@/components/ui/category-pill";
import { ProductCard } from "@/components/ui/product-card";
import { CategoryIcon } from "@/components/ui/icons";
import { categories, l, products } from "@/lib/data/menu";

export function MenuTeaser() {
  const t = useTranslations("home.menu");
  const locale = useLocale();
  const [activeId, setActiveId] = useState(categories[0].id);
  const items = useMemo(
    () => products.filter((p) => p.categoryId === activeId).slice(0, 6),
    [activeId],
  );

  return (
    <section className="bg-paper py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          action={
            <Link
              href="/menu"
              className="font-body text-sm font-bold text-ink-soft transition-colors hover:text-accent"
            >
              {t("seeAll")} →
            </Link>
          }
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => {
            const IconComp = CategoryIcon[c.id];
            return (
              <CategoryPill
                key={c.id}
                icon={<IconComp size={16} weight="bold" />}
                label={l(c.label, locale)}
                active={c.id === activeId}
                onClick={() => setActiveId(c.id)}
              />
            );
          })}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
