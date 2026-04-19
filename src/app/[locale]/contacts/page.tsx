import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Icon } from "@/components/ui/icons";
import {
  EMAIL,
  EMAIL_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/constants/contacts";
import { titlePageMetadata } from "@/lib/metadata";

export const generateMetadata = titlePageMetadata("nav", "contacts");

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contacts");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("titleLine1")}
            <br />
            <span className="text-accent">{t("titleLine2")}</span>
            <br />
            {t("titleLine3")}
          </>
        }
        description={t("description")}
      />

      <section className="bg-paper py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6">
            <address className="not-italic rounded-lg border-2 border-ink p-6">
              <div className="flex items-center gap-2 font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                <Icon.Pin size={14} weight="bold" />
                [ {t("addressLabel").toUpperCase()} ]
              </div>
              <p className="mt-1 font-display text-2xl">{t("addressLine1")}</p>
              <p className="font-body text-base text-ink-soft">{t("addressLine2")}</p>
            </address>
            <section
              aria-labelledby="schedule-heading"
              className="rounded-lg border-2 border-ink bg-accent-2 p-6"
            >
              <h2
                id="schedule-heading"
                className="flex items-center gap-2 font-body text-xs font-bold uppercase tracking-[0.2em]"
              >
                <Icon.Clock size={14} weight="bold" />
                [ {t("scheduleLabel").toUpperCase()} ]
              </h2>
              <p className="mt-1 font-display text-2xl tabular-nums">{t("scheduleHours")}</p>
              <p className="font-body text-base">{t("scheduleDays")}</p>
              <p className="font-body text-sm text-ink-soft">{t("scheduleDelivery")}</p>
            </section>
            <section
              aria-labelledby="contact-heading"
              className="rounded-lg border-2 border-ink bg-ink p-6 text-paper"
            >
              <h2
                id="contact-heading"
                className="flex items-center gap-2 font-body text-xs font-bold uppercase tracking-[0.2em] text-accent-2"
              >
                <Icon.Phone size={14} weight="bold" />
                [ {t("communicationLabel").toUpperCase()} ]
              </h2>
              <a
                href={PHONE_HREF}
                className="mt-2 flex items-center gap-2 font-display text-2xl tabular-nums hover:text-accent"
              >
                <Icon.Phone size={22} weight="bold" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={EMAIL_HREF}
                className="block font-body text-base text-paper/80 hover:text-accent"
              >
                {EMAIL}
              </a>
              <ul className="mt-3 flex gap-2">
                {[
                  { href: "#", Ic: Icon.Instagram, label: "Instagram" },
                  { href: "#", Ic: Icon.Telegram, label: "Telegram" },
                  { href: "#", Ic: Icon.Tiktok, label: "TikTok" },
                  { href: "#", Ic: Icon.Facebook, label: "Facebook" },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper transition-colors hover:bg-paper hover:text-ink"
                    >
                      <s.Ic size={16} weight="bold" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <PlaceholderImage
            label={t("mapLabel")}
            tone="muted"
            className="aspect-[4/5] h-full w-full"
            rounded
          />
        </Container>
      </section>
    </>
  );
}
