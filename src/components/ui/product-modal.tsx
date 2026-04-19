"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { DIET_ICON, Icon } from "./icons";
import { PlaceholderImage } from "./placeholder-image";
import { Portal } from "./portal";
import { Tag } from "./tag";
import {
  computeUnitPrice,
  dietTagsOf,
  l,
  type Product,
} from "@/lib/data/menu";
import { useScrollLock } from "@/lib/hooks/use-scroll-lock";
import { useCartStore } from "@/lib/stores/cart";

export function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const locale = useLocale();
  const t = useTranslations("modal");
  const tDiets = useTranslations("diets");
  const tCommon = useTranslations("common");
  const addLine = useCartStore((s) => s.addLine);

  const [variantId, setVariantId] = useState<string | undefined>(
    product.variants?.[0]?.id,
  );
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  useScrollLock(true);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const unitPrice = useMemo(
    () => computeUnitPrice(product, variantId, addonIds),
    [product, variantId, addonIds],
  );

  const totalPrice = unitPrice * qty;
  const dietTags = dietTagsOf(product);

  function toggleAddon(id: string) {
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function handleAdd() {
    addLine({ productId: product.id, variantId, addonIds, unitPrice, qty });
    toast.success(tCommon("addedToast", { name: l(product.name, locale) }));
    onClose();
  }

  return (
    <Portal>
      <div
        onClick={onClose}
        aria-hidden
        className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal
        aria-label={l(product.name, locale)}
        className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[92vh] flex-col rounded-t-3xl border-t-2 border-x-2 border-ink bg-paper shadow-[0_-8px_0_var(--color-ink)] sm:inset-0 sm:m-auto sm:h-fit sm:max-h-[90vh] sm:max-w-xl sm:rounded-3xl sm:border-2 sm:shadow-[8px_8px_0_var(--color-ink)]"
      >
        <div className="flex items-center justify-end p-3 sm:hidden">
          <div className="absolute left-1/2 top-2 h-1 w-12 -translate-x-1/2 rounded-full bg-ink/20" />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-paper"
          >
            <Icon.Close size={18} weight="bold" />
          </button>
        </div>

        <div className="relative shrink-0 sm:p-4 sm:pb-0">
          <PlaceholderImage
            label={l(product.name, locale)}
            tone={product.tags.includes("hot") ? "accent" : "accent2"}
            className="aspect-[16/9] w-full sm:rounded-xl"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="absolute right-3 top-3 hidden h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-paper sm:right-6 sm:top-6 sm:inline-flex"
          >
            <Icon.Close size={18} weight="bold" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-5 sm:px-6">
          <header className="flex flex-col gap-2">
            <h2 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">
              {l(product.name, locale)}
            </h2>
            <p className="font-body text-sm text-ink-soft sm:text-base">
              {l(product.description, locale)}
            </p>
            {dietTags.length > 0 ? (
              <div className="flex flex-wrap gap-1 pt-1">
                {dietTags.map((tag) => {
                  const TagIcon = DIET_ICON[tag];
                  return (
                    <Tag
                      key={tag}
                      tone={
                        tag === "hot"
                          ? "accent"
                          : tag === "new"
                            ? "accent2"
                            : "default"
                      }
                    >
                      <TagIcon size={12} weight="bold" className="mr-1" />
                      {tDiets(tag)}
                    </Tag>
                  );
                })}
              </div>
            ) : null}
          </header>

          {product.variants && product.variants.length > 0 ? (
            <fieldset>
              {product.variantGroupLabel ? (
                <legend className="mb-2 font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                  [ {l(product.variantGroupLabel, locale)} ]
                </legend>
              ) : null}
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((v) => {
                  const selected = v.id === variantId;
                  return (
                    <label
                      key={v.id}
                      className={cn(
                        "flex cursor-pointer flex-col items-center gap-1 rounded-md border-2 border-ink px-3 py-3 text-center transition-colors",
                        selected ? "bg-ink text-paper" : "bg-paper hover:bg-muted",
                      )}
                    >
                      <input
                        type="radio"
                        name={`variant-${product.id}`}
                        value={v.id}
                        checked={selected}
                        onChange={() => setVariantId(v.id)}
                        className="sr-only"
                      />
                      <span className="font-body text-sm font-bold">
                        {l(v.label, locale)}
                      </span>
                      <span
                        className={cn(
                          "font-body text-xs tabular-nums",
                          selected ? "text-accent-2" : "text-ink-soft",
                        )}
                      >
                        {v.priceDelta > 0
                          ? `+${v.priceDelta} ${tCommon("currency")}`
                          : `${product.price} ${tCommon("currency")}`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ) : null}

          {product.addons && product.addons.length > 0 ? (
            <fieldset>
              {product.addonGroupLabel ? (
                <legend className="mb-2 font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                  [ {l(product.addonGroupLabel, locale)} ]
                </legend>
              ) : null}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.addons.map((a) => {
                  const checked = addonIds.includes(a.id);
                  return (
                    <label
                      key={a.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-2 rounded-md border-2 border-ink px-3 py-2 transition-colors",
                        checked ? "bg-accent-2" : "bg-paper hover:bg-muted",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddon(a.id)}
                          className="h-4 w-4 accent-accent"
                        />
                        <span className="font-body text-sm">
                          {l(a.label, locale)}
                        </span>
                      </div>
                      <span className="font-body text-xs font-bold tabular-nums text-ink-soft">
                        +{a.priceDelta} {tCommon("currency")}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ) : null}
        </div>

        <footer className="flex items-center gap-3 border-t-2 border-ink bg-paper p-4 sm:p-5">
          <div
            className="inline-flex w-[120px] shrink-0 items-center justify-between rounded-full border-2 border-ink p-1"
            aria-label={t("qty")}
          >
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label={t("decrease")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper"
              disabled={qty <= 1}
            >
              <Icon.Minus size={14} weight="bold" />
            </button>
            <span className="w-6 text-center font-display text-base tabular-nums">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              aria-label={t("increase")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper"
            >
              <Icon.Plus size={14} weight="bold" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-12 flex-1 items-center justify-between gap-2 rounded-md border-2 border-ink bg-accent px-4 text-paper shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
          >
            <span className="font-body font-bold uppercase tracking-wide">
              {t("addToCart")}
            </span>
            <span className="font-display text-lg tabular-nums">
              {totalPrice} {tCommon("currency")}
            </span>
          </button>
        </footer>
      </div>
    </Portal>
  );
}
