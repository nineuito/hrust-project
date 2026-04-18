import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { HeaderActions } from "./header-actions";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { navLinks } from "./nav-links";

export async function SiteHeader() {
  const t = await getTranslations();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-2xl tracking-tight sm:text-3xl"
          aria-label={t("header.goHome")}
        >
          ХРУМ<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t("nav.menu")}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-hand text-lg text-ink transition-colors hover:text-accent"
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <HeaderActions />
          <HeaderMobileMenu />
        </div>
      </Container>
    </header>
  );
}
