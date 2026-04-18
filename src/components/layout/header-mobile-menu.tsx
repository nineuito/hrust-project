"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { navLinks } from "./nav-links";

export function HeaderMobileMenu() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("header.openMenu")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink lg:hidden"
      >
        <span aria-hidden className="text-xl leading-none">☰</span>
      </button>

      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          className="absolute inset-0 bg-ink/50"
          aria-label={t("header.closeMenu")}
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 h-full w-[85%] max-w-sm border-l-2 border-ink bg-paper p-6 shadow-[-6px_0_0_var(--color-ink)] transition-transform",
            open ? "translate-x-0" : "translate-x-full",
          )}
          aria-label={t("nav.menu")}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl">
              ХРУМ<span className="text-accent">.</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("header.close")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink"
            >
              ✕
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-4" aria-label={t("nav.menu")}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/20 pb-3 font-display text-2xl transition-colors hover:text-accent"
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </nav>
          <div className="mt-8 space-y-3 font-hand text-base text-ink-soft">
            <div>📞 0 800 501 501</div>
            <div>📍 Київ, Хрещатик 12</div>
            <div>⏱ 10:00 — 23:00</div>
          </div>
        </aside>
      </div>
    </>
  );
}
