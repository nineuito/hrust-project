"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { cn } from "@/lib/cn";
import { categories, l, products, type DietTag } from "@/lib/data/menu";

const dietFilters: DietTag[] = ["vegan", "hot", "new"];

export function MenuClient() {
  const t = useTranslations("menuPage");
  const tDiets = useTranslations("diets");
  const locale = useLocale();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeDiets, setActiveDiets] = useState<DietTag[]>([]);
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

  function toggleDiet(d: DietTag) {
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
          <div className="font-hand text-base uppercase tracking-[0.2em] text-ink-soft">
            {t("eyebrow")}
          </div>
          <h1 className="mt-2 font-display text-5xl leading-[0.9] tracking-tight sm:text-7xl">
            {t("titleLine1")}
            <br />
            {t("titleLine2")} <span className="text-accent">.</span>
          </h1>
          <p className="mt-4 max-w-xl font-hand text-lg text-ink-soft">
            {t("description")}
          </p>
          <div className="mt-6 flex w-full max-w-xl items-center gap-2 rounded-full border-2 border-ink bg-paper px-4">
            <span aria-hidden>🔍</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-12 w-full bg-transparent font-hand text-lg outline-none placeholder:text-ink-soft"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="font-hand text-sm text-ink-soft"
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
              "shrink-0 rounded-full border-2 border-ink px-4 py-1.5 font-hand text-base transition-colors",
              activeCategory === "all" ? "bg-ink text-paper" : "bg-paper hover:bg-muted",
            )}
          >
            {t("all")}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={cn(
                "shrink-0 inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-4 py-1.5 font-hand text-base transition-colors",
                activeCategory === c.id ? "bg-ink text-paper" : "bg-paper hover:bg-muted",
              )}
            >
              <span aria-hidden>{c.icon}</span>
              {l(c.label, locale)}
            </button>
          ))}
        </Container>
      </div>

      <section className="bg-paper py-8">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-hand text-base text-ink-soft">{t("filtersLabel")}</span>
            {dietFilters.map((d) => {
              const active = activeDiets.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDiet(d)}
                  className={cn(
                    "rounded-full border-2 border-ink px-3 py-1 font-hand text-sm transition-colors",
                    active
                      ? d === "hot"
                        ? "bg-accent text-paper"
                        : d === "new"
                          ? "bg-accent-2 text-ink"
                          : "bg-ink text-paper"
                      : "bg-paper text-ink hover:bg-muted",
                  )}
                >
                  {tDiets(d)}
                </button>
              );
            })}
            {activeDiets.length > 0 ? (
              <button
                type="button"
                onClick={() => setActiveDiets([])}
                className="font-hand text-sm text-ink-soft underline underline-offset-4"
              >
                {t("reset")}
              </button>
            ) : null}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-12 rounded-md border-2 border-dashed border-ink bg-muted p-10 text-center">
              <div className="font-display text-3xl">{t("empty.title")}</div>
              <p className="mt-2 font-hand text-ink-soft">{t("empty.description")}</p>
            </div>
          ) : null}

          <div className="mt-8 space-y-12">
            {categories.map((c) => {
              const list = grouped.get(c.id);
              if (!list || list.length === 0) return null;
              return (
                <div key={c.id} id={c.id} className="scroll-mt-40">
                  <div className="mb-4 flex items-end justify-between border-b-2 border-ink pb-2">
                    <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
                      {c.icon} {l(c.label, locale).toUpperCase()}
                    </h2>
                    <span className="font-hand text-sm text-ink-soft">
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
