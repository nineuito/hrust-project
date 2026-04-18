"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { useCartCount } from "@/lib/stores/cart";

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
        className="hidden h-10 items-center gap-2 rounded-full border-2 border-ink px-3 font-hand text-base transition-colors hover:bg-muted md:inline-flex"
      >
        <span aria-hidden>🔍</span>
        <span className="text-sm text-ink-soft">{t("searchHint")}</span>
        <kbd className="ml-1 rounded border border-ink bg-paper px-1 text-xs font-body">⌘K</kbd>
      </button>
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        aria-label={t("searchLabel")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink md:hidden"
      >
        🔍
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
              "h-full px-3 font-hand text-sm transition-colors",
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
        className="relative inline-flex h-10 items-center gap-2 rounded-full border-2 border-ink bg-accent px-4 font-hand text-base text-white shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
        aria-label={t("cartAria")}
      >
        <span aria-hidden>🛒</span>
        <span className="font-bold tabular-nums">{hydrated ? cartCount : 0}</span>
      </Link>

      {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}
    </>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const t = useTranslations("header");
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 backdrop-blur-sm px-4 pt-24 sm:pt-32">
      <button
        type="button"
        aria-label={t("close")}
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-xl rounded-md border-2 border-ink bg-paper p-4 shadow-[8px_8px_0_var(--color-ink)]">
        <label className="flex items-center gap-3">
          <span aria-hidden className="text-2xl">🔍</span>
          <input
            type="search"
            autoFocus
            placeholder={t("searchPlaceholder")}
            className="w-full bg-transparent font-hand text-2xl outline-none placeholder:text-ink-soft"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-ink px-2 py-0.5 font-body text-xs"
          >
            ESC
          </button>
        </label>
        <p className="mt-4 font-hand text-sm text-ink-soft">
          {t("searchSoonNote")}{" "}
          <Link href="/menu" className="underline decoration-accent decoration-2 underline-offset-4">
            {t("menuWord")}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
