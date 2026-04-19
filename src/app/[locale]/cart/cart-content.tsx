"use client";

import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Icon } from "@/components/ui/icons";
import { l, products, type Addon, type Product } from "@/lib/data/menu";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import {
  useCartStore,
  useCartTotal,
  type CartItem,
} from "@/lib/stores/cart";

export function CartContent() {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const incrementLine = useCartStore((s) => s.incrementLine);
  const decrementLine = useCartStore((s) => s.decrementLine);
  const removeLine = useCartStore((s) => s.removeLine);
  const clear = useCartStore((s) => s.clear);
  const total = useCartTotal();

  const lines = hydrated
    ? items.flatMap((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? [{ item, product }] : [];
      })
    : [];

  const isEmpty = lines.length === 0;

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("titleLine1")}
            <span className="text-accent">{t("titleAccent")}</span>
          </>
        }
        description={isEmpty ? t("descriptionEmpty") : t("descriptionFull")}
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container>
          {!hydrated ? (
            <CartSkeleton />
          ) : isEmpty ? (
            <div className="mx-auto max-w-xl rounded-lg border-2 border-dashed border-ink bg-muted p-10 text-center">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-paper">
                <Icon.Cart size={32} weight="bold" />
              </div>
              <h2 className="mt-4 font-display text-2xl">{t("emptyTitle")}</h2>
              <p className="mt-2 font-body text-base text-ink-soft">{t("emptyText")}</p>
              <div className="mt-6">
                <Button href="/menu" variant="filled" size="lg">
                  {t("emptyCta")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              <ul className="space-y-3">
                {lines.map(({ item, product }) => (
                  <CartLine
                    key={item.lineId}
                    item={item}
                    product={product}
                    onDecrement={() => decrementLine(item.lineId)}
                    onIncrement={() => incrementLine(item.lineId)}
                    onRemove={() => removeLine(item.lineId)}
                  />
                ))}
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={() => clear()}
                    className="font-body text-sm text-ink-soft underline underline-offset-4 hover:text-accent"
                  >
                    {t("clearAll")}
                  </button>
                </li>
              </ul>
              <aside className="sticky top-24 h-fit rounded-lg border-2 border-ink bg-muted p-6">
                <dl className="space-y-2 font-body text-base">
                  <div className="flex justify-between">
                    <dt>{t("summaryLabel")}</dt>
                    <dd className="tabular-nums">
                      {total} {tCommon("currency")}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>{t("delivery")}</dt>
                    <dd className="text-ink-soft">{t("deliveryFree")}</dd>
                  </div>
                  <div className="flex justify-between border-t-2 border-ink pt-2 font-display text-lg">
                    <dt>{t("total")}</dt>
                    <dd className="tabular-nums">
                      {total} {tCommon("currency")}
                    </dd>
                  </div>
                </dl>
                <Button href="/checkout" variant="filled" size="lg" className="mt-4 w-full">
                  {t("checkoutCta")}
                </Button>
              </aside>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

function CartLine({
  item,
  product,
  onDecrement,
  onIncrement,
  onRemove,
}: {
  item: CartItem;
  product: Product;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}) {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const variant = item.variantId
    ? product.variants?.find((v) => v.id === item.variantId)
    : undefined;
  const addons: Addon[] = item.addonIds.flatMap((id) => {
    const addon = product.addons?.find((a) => a.id === id);
    return addon ? [addon] : [];
  });

  return (
    <li className="grid grid-cols-[80px_1fr_auto] items-center gap-3 rounded-md border-2 border-ink bg-paper p-3 sm:grid-cols-[80px_1fr_auto_108px] sm:gap-4 sm:p-4">
      <PlaceholderImage
        tone={product.tags.includes("hot") ? "accent" : "muted"}
        className="h-20 w-20 shrink-0"
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-hand text-lg font-bold line-clamp-1">
            {l(product.name, locale)}
          </span>
          {variant ? (
            <span className="shrink-0 rounded-full border border-ink bg-muted px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider">
              {l(variant.label, locale)}
            </span>
          ) : null}
        </div>
        {addons.length > 0 ? (
          <div className="mt-1 font-body text-xs text-ink-soft">
            + {addons.map((a) => l(a.label, locale)).join(" · ")}
          </div>
        ) : (
          <div className="font-hand text-sm text-ink-soft line-clamp-1">
            {l(product.description, locale)}
          </div>
        )}
        <div className="mt-1 font-display text-base tabular-nums">
          {item.unitPrice} {tCommon("currency")}
        </div>
      </div>
      <div className="inline-flex w-[108px] items-center justify-between gap-1 rounded-full border-2 border-ink bg-paper p-1">
        <QtyButton onClick={onDecrement} label={t("decrease")}>
          <Icon.Minus size={12} weight="bold" />
        </QtyButton>
        <span
          aria-label={t("qty")}
          className="w-6 text-center font-display text-base tabular-nums"
        >
          {item.qty}
        </span>
        <QtyButton onClick={onIncrement} label={t("increase")}>
          <Icon.Plus size={12} weight="bold" />
        </QtyButton>
      </div>
      <div className="hidden text-right sm:block">
        <div className="font-display text-lg tabular-nums">
          {item.unitPrice * item.qty} {tCommon("currency")}
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="mt-1 font-body text-xs text-ink-soft underline underline-offset-4 hover:text-accent"
        >
          {t("remove")}
        </button>
      </div>
    </li>
  );
}

function QtyButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-accent"
    >
      {children}
    </button>
  );
}

function CartSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-md border-2 border-ink bg-paper p-3 sm:p-4"
          >
            <div className="h-20 w-20 shrink-0 animate-pulse rounded-sm bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-2/3 animate-pulse rounded-sm bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded-sm bg-muted" />
              <div className="h-4 w-1/4 animate-pulse rounded-sm bg-muted" />
            </div>
            <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
          </div>
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-lg border-2 border-ink bg-muted" />
    </div>
  );
}
