"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Icon } from "@/components/ui/icons";
import { Portal } from "@/components/ui/portal";
import { cn } from "@/lib/cn";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { useCartCount, useCartStore } from "@/lib/stores/cart";
import { l } from "@/lib/data/menu";
import { filterProducts } from "@/lib/data/search";

const SEARCH_LIMIT = 8;

export function HeaderActions() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const hydrated = useHydrated();
  const cartCount = useCartCount();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function switchLocale(next: "uk" | "en") {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        aria-label={t("searchLabel")}
        className="hidden h-10 items-center gap-2 rounded-full border-2 border-ink px-3 font-body text-sm transition-colors hover:bg-muted md:inline-flex"
      >
        <Icon.Search size={18} weight="bold" />
        <span className="text-ink-soft">{t("searchHint")}</span>
        <kbd className="ml-1 rounded border border-ink bg-paper px-1.5 py-0.5 text-[10px] font-bold font-body tracking-wider">
          ⌘K
        </kbd>
      </button>
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        aria-label={t("searchLabel")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink md:hidden"
      >
        <Icon.Search size={18} weight="bold" />
      </button>

      <div
        role="group"
        aria-label={t("langSwitch")}
        className="hidden h-10 items-center rounded-full border-2 border-ink overflow-hidden sm:inline-flex"
      >
        {(["uk", "en"] as const).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => switchLocale(code)}
            className={cn(
              "h-full px-3 font-body text-xs font-bold tracking-wider transition-colors",
              locale === code
                ? "bg-ink text-paper"
                : "bg-paper text-ink hover:bg-muted",
            )}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>

      <Link
        href="/cart"
        className="relative inline-flex h-10 items-center gap-2 rounded-full border-2 border-ink bg-accent px-4 font-body text-sm font-bold text-white shadow-[3px_3px_0_var(--color-ink)] transition-[transform,box-shadow] hover:-translate-y-0.5"
        aria-label={t("cartAria")}
      >
        <Icon.Cart size={18} weight="bold" />
        <span className="tabular-nums">{hydrated ? cartCount : 0}</span>
      </Link>

      {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}
    </>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const t = useTranslations("header");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const addLine = useCartStore((s) => s.addLine);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.classList.add("scroll-locked");
    return () => document.body.classList.remove("scroll-locked");
  }, []);

  const results = filterProducts(query, locale).slice(0, SEARCH_LIMIT);
  const showResults = query.trim().length > 0;

  function handleAdd(product: (typeof results)[number]) {
    addLine({
      productId: product.id,
      variantId: product.variants?.[0]?.id,
      unitPrice: product.price + (product.variants?.[0]?.priceDelta ?? 0),
    });
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
        aria-label={t("searchLabel")}
        className="fixed inset-x-4 top-20 z-[70] mx-auto w-[calc(100%-2rem)] max-w-xl sm:inset-x-0 sm:top-28"
      >
        <div className="rounded-md border-2 border-ink bg-paper shadow-[8px_8px_0_var(--color-ink)]">
          <label className="flex items-center gap-3 border-b-2 border-ink p-4">
            <Icon.Search size={22} weight="bold" />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-transparent font-body text-lg outline-none placeholder:text-ink-soft"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t("close")}
              className="rounded-full border border-ink px-2 py-0.5 font-body text-[10px] font-bold tracking-wider"
            >
              ESC
            </button>
          </label>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {showResults && results.length === 0 ? (
              <div className="p-6 text-center font-body text-sm text-ink-soft">
                {t("noResults")}
              </div>
            ) : null}

            {showResults && results.length > 0 ? (
              <ul className="flex flex-col">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => handleAdd(p)}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-ink bg-muted text-ink">
                        <Icon.Plus size={14} weight="bold" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-body text-sm font-bold truncate">
                          {l(p.name, locale)}
                        </div>
                        <div className="font-body text-xs text-ink-soft truncate">
                          {l(p.description, locale)}
                        </div>
                      </div>
                      <div className="font-display text-base tabular-nums">
                        {p.price} {tCommon("currency")}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            {!showResults ? (
              <div className="flex items-center justify-center p-4 font-body text-xs text-ink-soft">
                <Link
                  href="/menu"
                  onClick={onClose}
                  className="underline decoration-accent decoration-2 underline-offset-4"
                >
                  {t("menuWord")} →
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Portal>
  );
}
