"use client";

import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { l, products } from "@/lib/data/menu";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { useCartStore, useCartTotal } from "@/lib/stores/cart";

export function CartContent() {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const add = useCartStore((s) => s.add);
  const decrement = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);
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
          {!hydrated ? null : isEmpty ? (
            <div className="mx-auto max-w-xl rounded-lg border-2 border-dashed border-ink bg-muted p-10 text-center">
              <div className="font-display text-4xl">🛒</div>
              <h2 className="mt-2 font-display text-2xl">{t("emptyTitle")}</h2>
              <p className="mt-2 font-hand text-lg text-ink-soft">{t("emptyText")}</p>
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
                  <li
                    key={product.id}
                    className="flex items-center gap-4 rounded-md border-2 border-ink bg-paper p-3 sm:p-4"
                  >
                    <PlaceholderImage
                      tone={product.tags.includes("hot") ? "accent" : "muted"}
                      className="h-20 w-20 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-hand text-lg font-bold">
                        {l(product.name, locale)}
                      </div>
                      <div className="font-hand text-sm text-ink-soft line-clamp-1">
                        {l(product.description, locale)}
                      </div>
                      <div className="mt-1 font-display text-base">
                        {product.price} {tCommon("currency")}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <QtyButton onClick={() => decrement(product.id)} label={t("decrease")}>
                        −
                      </QtyButton>
                      <span
                        aria-label={t("qty")}
                        className="min-w-7 text-center font-display text-lg tabular-nums"
                      >
                        {item.qty}
                      </span>
                      <QtyButton onClick={() => add(product.id)} label={t("increase")}>
                        +
                      </QtyButton>
                    </div>
                    <div className="hidden shrink-0 text-right sm:block">
                      <div className="font-display text-lg">
                        {product.price * item.qty} {tCommon("currency")}
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="mt-1 font-hand text-xs text-ink-soft underline underline-offset-4 hover:text-accent"
                      >
                        {t("remove")}
                      </button>
                    </div>
                  </li>
                ))}
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={() => clear()}
                    className="font-hand text-sm text-ink-soft underline underline-offset-4 hover:text-accent"
                  >
                    {t("clearAll")}
                  </button>
                </li>
              </ul>
              <aside className="sticky top-24 h-fit rounded-lg border-2 border-ink bg-muted p-6">
                <dl className="space-y-2 font-hand text-lg">
                  <div className="flex justify-between">
                    <dt>{t("summaryLabel")}</dt>
                    <dd>
                      {total} {tCommon("currency")}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>{t("delivery")}</dt>
                    <dd className="text-ink-soft">{t("deliveryFree")}</dd>
                  </div>
                  <div className="flex justify-between border-t-2 border-ink pt-2 font-display text-lg">
                    <dt>{t("total")}</dt>
                    <dd>
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
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-paper font-display text-lg transition-colors hover:bg-accent hover:text-paper"
    >
      {children}
    </button>
  );
}
