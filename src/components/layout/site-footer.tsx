import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";

const socials = [
  { label: "IG", href: "#" },
  { label: "TG", href: "#" },
  { label: "TT", href: "#" },
  { label: "FB", href: "#" },
];

const secondaryLinks = [
  { href: "/menu", key: "menu" },
  { href: "/delivery", key: "delivery" },
  { href: "/about", key: "about" },
  { href: "/contacts", key: "contacts" },
  { href: "/app", key: "app" },
  { href: "/booking", key: "booking" },
] as const;

export async function SiteFooter() {
  const t = await getTranslations();

  const columns = [
    { title: t("footer.columns.address"), items: t.raw("footer.address") as string[] },
    { title: t("footer.columns.schedule"), items: t.raw("footer.schedule") as string[] },
    { title: t("footer.columns.contacts"), items: t.raw("footer.contacts") as string[] },
  ];

  return (
    <footer className="border-t-2 border-ink bg-paper text-ink">
      <Container className="py-12 sm:py-16">
        <div className="font-display text-6xl leading-none tracking-[-0.04em] sm:text-8xl">
          ХРУМ<span className="text-accent">.</span>
        </div>
        <div className="mt-8 grid gap-8 border-t-2 border-ink pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <div className="font-display text-sm uppercase tracking-[0.2em]">
                {col.title}
              </div>
              <ul className="mt-3 space-y-1 font-hand text-lg text-ink-soft">
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="font-display text-sm uppercase tracking-[0.2em]">
              {t("footer.columns.socials")}
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink font-display text-sm transition-colors hover:bg-ink hover:text-paper"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <nav
          aria-label={t("footer.secondary")}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/20 pt-6 font-hand text-base text-ink-soft"
        >
          {secondaryLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-accent">
              {t(`nav.${l.key}`)}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-hand text-sm text-ink-soft">
          <span>{t("footer.copyright")}</span>
          <span>{t("footer.madeIn")}</span>
        </div>
      </Container>
    </footer>
  );
}
