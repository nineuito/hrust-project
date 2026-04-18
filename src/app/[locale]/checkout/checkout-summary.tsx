"use client";

import { useTranslations } from "next-intl";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { useCartCount, useCartTotal } from "@/lib/stores/cart";

export function CheckoutSummary() {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const hydrated = useHydrated();
  const total = useCartTotal();
  const count = useCartCount();

  const display = hydrated ? total : 0;
  const countDisplay = hydrated ? count : 0;

  return (
    <aside className="h-fit space-y-3 rounded-lg border-2 border-ink bg-muted p-6 lg:sticky lg:top-24">
      <h2 className="font-display text-xl">{t("summary")}</h2>
      <dl className="space-y-2 font-hand text-base">
        <div className="flex justify-between">
          <dt>{t("sum")}</dt>
          <dd>
            {display} {tCommon("currency")}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>{t("delivery")}</dt>
          <dd className="text-ink-soft">{t("deliveryFree")}</dd>
        </div>
        <div className="flex justify-between border-t-2 border-ink pt-2 font-display text-lg">
          <dt>{t("total")}</dt>
          <dd>
            {display} {tCommon("currency")}
          </dd>
        </div>
      </dl>
      <div className="font-hand text-sm text-ink-soft">
        {hydrated ? `${countDisplay} × ${tCommon("currency")}` : null}
      </div>
    </aside>
  );
}
