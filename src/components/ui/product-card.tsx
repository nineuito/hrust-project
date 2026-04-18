"use client";

import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { PlaceholderImage } from "./placeholder-image";
import { Tag } from "./tag";
import { l, type Product } from "@/lib/data/menu";
import { useCartStore } from "@/lib/stores/cart";
import { useHydrated } from "@/lib/hooks/use-hydrated";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("diets");
  const tCommon = useTranslations("common");
  const hydrated = useHydrated();
  const add = useCartStore((s) => s.add);
  const qty = useCartStore(
    (s) => s.items.find((i) => i.productId === product.id)?.qty ?? 0,
  );

  const name = l(product.name, locale);
  const description = l(product.description, locale);

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 rounded-md border-2 border-ink bg-paper p-3 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-ink)]",
        className,
      )}
    >
      {product.isHit ? (
        <div className="absolute -top-2 -right-2 rotate-6 z-10">
          <Tag tone="accent">{t("hit")}</Tag>
        </div>
      ) : null}
      <PlaceholderImage
        tone={product.tags.includes("hot") ? "accent" : "muted"}
        className="aspect-[4/3] w-full"
      />
      <div className="flex flex-col gap-1">
        <h3 className="font-hand text-lg font-bold leading-tight">{name}</h3>
        <p className="font-hand text-sm text-ink-soft line-clamp-2">
          {description}
        </p>
      </div>
      {product.tags.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {product.tags
            .filter((x) => x !== "hit")
            .map((tag) => (
              <Tag
                key={tag}
                tone={tag === "hot" ? "accent" : tag === "new" ? "accent2" : "default"}
              >
                {t(tag)}
              </Tag>
            ))}
        </div>
      ) : null}
      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <span className="font-display text-xl">
          {product.price} {tCommon("currency")}
        </span>
        <button
          type="button"
          onClick={() => add(product.id)}
          className="relative inline-flex h-9 items-center justify-center gap-1.5 rounded-full border-2 border-ink bg-accent px-3 text-paper font-bold shadow-[2px_2px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
          aria-label={tCommon("addTo", { name })}
        >
          <span aria-hidden className="text-xl leading-none">+</span>
          {hydrated && qty > 0 ? (
            <span className="font-body text-sm">{qty}</span>
          ) : null}
        </button>
      </div>
    </article>
  );
}
