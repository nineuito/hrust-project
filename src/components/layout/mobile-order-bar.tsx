"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { useCartCount, useCartTotal } from "@/lib/stores/cart";

export function MobileOrderBar() {
  const t = useTranslations();
  const hydrated = useHydrated();
  const count = useCartCount();
  const total = useCartTotal();

  if (!hydrated || count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-ink text-paper md:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-col">
          <span className="font-hand text-xs text-accent-2">
            {t("mobileBar.items", { count })}
          </span>
          <span className="font-display text-lg">
            {total} {t("common.currency")}
          </span>
        </div>
        <Link
          href="/cart"
          className="inline-flex h-11 items-center gap-2 rounded-md border-2 border-paper bg-accent px-4 font-body font-bold text-paper shadow-[3px_3px_0_var(--color-paper)] transition-transform hover:-translate-y-0.5"
        >
          🛒 {t("mobileBar.checkout")}
        </Link>
      </div>
    </div>
  );
}
