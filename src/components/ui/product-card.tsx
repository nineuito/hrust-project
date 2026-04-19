"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { PlaceholderImage } from "./placeholder-image";
import { Tag } from "./tag";
import { DIET_ICON, Icon } from "./icons";
import { dietTagsOf, hasOptions, l, type Product } from "@/lib/data/menu";
import { makeLineId, useCartStore } from "@/lib/stores/cart";
import { useHydrated } from "@/lib/hooks/use-hydrated";

const ProductModal = dynamic(
  () => import("./product-modal").then((m) => ({ default: m.ProductModal })),
  { ssr: false },
);

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
  const addLine = useCartStore((s) => s.addLine);
  const defaultLineId = makeLineId(product.id, product.variants?.[0]?.id, []);
  const qty = useCartStore(
    (s) => s.items.find((i) => i.lineId === defaultLineId)?.qty ?? 0,
  );
  const [modalOpen, setModalOpen] = useState(false);

  const name = l(product.name, locale);
  const description = l(product.description, locale);
  const dietTags = dietTagsOf(product);
  const configurable = hasOptions(product);

  function handleAdd() {
    if (configurable) {
      setModalOpen(true);
      return;
    }
    addLine({ productId: product.id, unitPrice: product.price });
    toast.success(tCommon("addedToast", { name }));
  }

  return (
    <>
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
          <h3 className="font-hand text-lg font-bold leading-tight line-clamp-1">
            {name}
          </h3>
          <p className="font-hand text-sm text-ink-soft line-clamp-2 min-h-[2lh]">
            {description}
          </p>
        </div>
        <div className="flex min-h-[26px] flex-wrap gap-1">
          {dietTags.map((tag) => {
            const TagIcon = DIET_ICON[tag];
            return (
              <Tag
                key={tag}
                tone={tag === "hot" ? "accent" : tag === "new" ? "accent2" : "default"}
              >
                <TagIcon size={12} weight="bold" className="mr-1" />
                {t(tag)}
              </Tag>
            );
          })}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="font-display text-xl tabular-nums">
            {configurable ? (
              <span className="mr-1 font-body text-xs font-normal text-ink-soft uppercase tracking-wider">
                {tCommon("priceFrom")}{" "}
              </span>
            ) : null}
            {product.price} {tCommon("currency")}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className="relative inline-flex h-9 items-center justify-center gap-1.5 rounded-full border-2 border-ink bg-accent px-3 text-paper font-bold shadow-[2px_2px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
            aria-label={tCommon("addTo", { name })}
          >
            <Icon.Plus size={16} weight="bold" />
            {hydrated && qty > 0 && !configurable ? (
              <span className="font-body text-sm tabular-nums">{qty}</span>
            ) : null}
          </button>
        </div>
      </article>
      {modalOpen ? (
        <ProductModal product={product} onClose={() => setModalOpen(false)} />
      ) : null}
    </>
  );
}
