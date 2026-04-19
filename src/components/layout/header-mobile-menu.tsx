"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Icon } from "@/components/ui/icons";
import { Portal } from "@/components/ui/portal";
import { cn } from "@/lib/cn";
import {
  ADDRESS_SHORT,
  PHONE_DISPLAY,
  PHONE_HREF,
  SCHEDULE_SHORT,
} from "@/lib/constants/contacts";
import { useScrollLock } from "@/lib/hooks/use-scroll-lock";
import { navLinks } from "./nav-links";

export function HeaderMobileMenu() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useScrollLock(open);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function switchLocale(next: "uk" | "en") {
    if (next !== locale) router.replace(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("header.openMenu")}
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink lg:hidden"
      >
        <Icon.Menu size={18} weight="bold" />
      </button>

      <Portal>
        <div
          onClick={() => setOpen(false)}
          aria-hidden
          className={cn(
            "fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
            open ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />

        <aside
          aria-label={t("nav.menu")}
          aria-hidden={!open}
          className={cn(
            "fixed right-0 top-0 z-[65] flex h-full w-[85%] max-w-sm flex-col border-l-2 border-ink bg-paper shadow-[-6px_0_0_var(--color-ink)] transition-transform duration-300 lg:hidden",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
        <div className="flex items-center justify-between border-b-2 border-ink p-6">
          <span className="font-display text-2xl">
            ХРУМ<span className="text-accent">.</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("header.close")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink"
          >
            <Icon.Close size={18} weight="bold" />
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col gap-4 overflow-y-auto p-6"
          aria-label={t("nav.menu")}
        >
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

        <div className="space-y-4 border-t-2 border-ink p-6">
          <div>
            <div className="mb-2 font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
              [ {t("header.langSwitch")} ]
            </div>
            <div
              role="group"
              aria-label={t("header.langSwitch")}
              className="inline-flex h-10 overflow-hidden rounded-full border-2 border-ink"
            >
              {(["uk", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => switchLocale(code)}
                  className={cn(
                    "h-full px-5 font-body text-xs font-bold tracking-wider transition-colors",
                    locale === code
                      ? "bg-ink text-paper"
                      : "bg-paper text-ink hover:bg-muted",
                  )}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 font-body text-sm text-ink-soft">
            <a href={PHONE_HREF} className="flex items-center gap-2 hover:text-accent">
              <Icon.Phone size={16} weight="bold" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <div className="flex items-center gap-2">
              <Icon.Pin size={16} weight="bold" />
              <span>{ADDRESS_SHORT}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon.Clock size={16} weight="bold" />
              <span>{SCHEDULE_SHORT}</span>
            </div>
          </div>
        </div>
      </aside>
      </Portal>
    </>
  );
}
