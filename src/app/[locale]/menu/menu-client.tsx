"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { CategoryIcon, DIET_ICON, Icon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import {
  categories,
  l,
  products,
  type FilterableDietTag,
} from "@/lib/data/menu";

const DIET_FILTERS: FilterableDietTag[] = ["vegan", "hot", "new"];

export function MenuClient() {
  const t = useTranslations("menuPage");
  const tDiets = useTranslations("diets");
  const locale = useLocale();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeDiets, setActiveDiets] = useState<FilterableDietTag[]>([]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (activeCategory !== "all" && p.categoryId !== activeCategory) return false;
      if (activeDiets.length > 0 && !activeDiets.every((d) => p.tags.includes(d))) {
        return false;
      }
      if (q) {
        const name = l(p.name, locale).toLowerCase();
        const desc = l(p.description, locale).toLowerCase();
        if (!name.includes(q) && !desc.includes(q)) return false;
      }
      return true;
    });
  }, [activeCategory, activeDiets, query, locale]);

  function toggleDiet(d: FilterableDietTag) {
    setActiveDiets((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );
  }

  const grouped = useMemo(() => {
    const map = new Map<string, typeof products>();
    for (const p of filtered) {
      const list = map.get(p.categoryId) ?? [];
      list.push(p);
      map.set(p.categoryId, list);
    }
    return map;
  }, [filtered]);

  return (
    <>
      <section className="border-b-2 border-ink bg-accent-2">
        <Container className="py-10 sm:py-14">
          <div className="font-body text-xs uppercase tracking-[0.25em] text-ink-soft">
            [ {t("eyebrow").toUpperCase()} ]
          </div>
          <h1 className="mt-2 font-display text-4xl leading-[0.9] tracking-tight break-words sm:text-6xl md:text-7xl">
            {t("titleLine1")}
            <br />
            {t("titleLine2")} <span className="text-accent">.</span>
          </h1>
          <p className="mt-4 max-w-xl font-body text-base text-ink-soft">
            {t("description")}
          </p>
          <div className="mt-6 flex w-full max-w-xl items-center gap-2 rounded-full border-2 border-ink bg-paper px-4">
            <Icon.Search size={18} weight="bold" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-12 w-full bg-transparent font-body text-base outline-none placeholder:text-ink-soft"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="font-body text-xs font-bold text-ink-soft uppercase tracking-wider"
              >
                {t("clear")}
              </button>
            ) : null}
          </div>
        </Container>
      </section>

      <div className="sticky top-16 z-20 border-b-2 border-ink bg-paper/95 backdrop-blur">
        <Container className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={cn(
              "shrink-0 rounded-full border-2 border-ink px-4 py-1.5 font-body text-sm font-bold transition-colors",
              activeCategory === "all" ? "bg-ink text-paper" : "bg-paper hover:bg-muted",
            )}
          >
            {t("all")}
          </button>
          {categories.map((c) => {
            const IconComp = CategoryIcon[c.id];
            const active = activeCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={cn(
                  "shrink-0 inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 font-body text-sm font-bold transition-colors",
                  active ? "bg-ink text-paper" : "bg-paper hover:bg-muted",
                )}
              >
                <IconComp size={16} weight="bold" />
                {l(c.label, locale)}
              </button>
            );
          })}
        </Container>
      </div>

      <section className="bg-paper py-8">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-body text-xs font-bold text-ink-soft uppercase tracking-[0.15em]">
              {t("filtersLabel")}
            </span>
            {DIET_FILTERS.map((d) => {
              const IconComp = DIET_ICON[d];
              const active = activeDiets.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDiet(d)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 font-body text-xs font-bold uppercase tracking-wider transition-colors",
                    active
                      ? d === "hot"
                        ? "bg-accent text-paper"
                        : d === "new"
                          ? "bg-accent-2 text-ink"
                          : "bg-ink text-paper"
                      : "bg-paper text-ink hover:bg-muted",
                  )}
                >
                  <IconComp size={14} weight="bold" />
                  {tDiets(d)}
                </button>
              );
            })}
            {activeDiets.length > 0 ? (
              <button
                type="button"
                onClick={() => setActiveDiets([])}
                className="font-body text-xs text-ink-soft underline underline-offset-4"
              >
                {t("reset")}
              </button>
            ) : null}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-12 rounded-md border-2 border-dashed border-ink bg-muted p-10 text-center">
              <div className="font-display text-3xl">{t("empty.title")}</div>
              <p className="mt-2 font-body text-ink-soft">{t("empty.description")}</p>
            </div>
          ) : null}

          <div className="mt-8 space-y-12">
            {categories.map((c) => {
              const list = grouped.get(c.id);
              if (!list || list.length === 0) return null;
              const IconComp = CategoryIcon[c.id];
              return (
                <div key={c.id} id={c.id} className="scroll-mt-40">
                  <div className="mb-4 flex items-end justify-between border-b-2 border-ink pb-2">
                    <h2 className="flex items-center gap-3 font-display text-2xl tracking-tight sm:text-3xl">
                      <IconComp size={28} weight="bold" />
                      {l(c.label, locale).toUpperCase()}
                    </h2>
                    <span className="font-body text-xs font-bold text-ink-soft uppercase tracking-wider tabular-nums">
                      {t("positions", { count: list.length })}
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
