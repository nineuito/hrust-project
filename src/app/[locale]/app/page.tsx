import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Tag } from "@/components/ui/tag";
import { Icon } from "@/components/ui/icons";
import { titlePageMetadata } from "@/lib/metadata";
import { NotifyForm } from "./notify-form";

export const generateMetadata = titlePageMetadata("nav", "app");

type Feature = { t: string; d: string };
type Tier = { n: string; cb: string; cond: string };

export default async function AppPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("appPage");
  const features = t.raw("features") as Feature[];
  const tiers = t.raw("tiers") as Tier[];

  return (
    <>
      <section className="relative overflow-hidden border-b-2 border-ink bg-gradient-to-b from-accent-2 to-paper">
        <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:items-center md:py-20">
          <div className="flex flex-col gap-6">
            <Tag tone="accent" rotate>
              {t("soonTag")}
            </Tag>
            <h1 className="font-display text-4xl leading-[0.9] tracking-tight break-words sm:text-6xl md:text-7xl lg:text-8xl">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
              <br />
              <span className="text-accent">{t("titleLine3")}</span>
            </h1>
            <p className="max-w-md font-hand text-xl text-ink-soft">
              {t("description")}
            </p>
            <NotifyForm />
            <div className="flex flex-wrap gap-3">
              <StoreButton label="App Store" sub={t("storeSoon")} />
              <StoreButton label="Google Play" sub={t("storeSoon")} />
            </div>
          </div>

          <div className="flex justify-center gap-4 sm:gap-6">
            <div className="w-40 -rotate-6 rounded-[28px] border-4 border-ink bg-paper p-3 hand-shadow sm:w-48">
              <PlaceholderImage
                tone="accent"
                className="aspect-[3/2] w-full"
                rounded
              />
              <div className="mt-2 font-hand text-xs text-ink-soft">{t("phonePopular")}</div>
              <div className="mt-1 grid grid-cols-2 gap-1.5">
                <PlaceholderImage className="aspect-square w-full" />
                <PlaceholderImage className="aspect-square w-full" />
                <PlaceholderImage className="aspect-square w-full" />
                <PlaceholderImage className="aspect-square w-full" />
              </div>
            </div>
            <div className="w-40 rotate-6 self-end rounded-[28px] border-4 border-ink bg-ink p-3 text-paper shadow-[6px_6px_0_var(--color-accent)] sm:w-48">
              <div className="font-hand text-xs text-accent-2">{t("phoneOrder")}</div>
              <div className="mt-1 font-display text-sm">{t("phoneCourier")}</div>
              <div className="font-hand text-xs opacity-80">{t("phoneEta")}</div>
              <PlaceholderImage
                label={t("phoneMap")}
                tone="paper"
                className="mt-2 aspect-[4/3] w-full"
              />
              <button
                type="button"
                className="mt-2 w-full rounded-md border-2 border-paper bg-accent px-2 py-1.5 font-hand text-sm text-paper"
              >
                {t("phoneCall")}
              </button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-14 sm:py-16">
        <Container>
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            {t("featuresTitle")}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.t}
                className="rounded-lg border-2 border-ink p-5 hand-shadow-sm"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-accent-2 font-display">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-display text-xl">{f.t}</h3>
                <p className="font-hand text-base text-ink-soft">{f.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-14 text-paper sm:py-16">
        <Container>
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            {t("tiersTitle")}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {tiers.map((tier, i) => (
              <div
                key={tier.n}
                className="rounded-lg border-2 border-paper bg-paper p-6 text-ink hand-shadow"
                style={{ transform: `rotate(${(i - 1) * 0.8}deg)` }}
              >
                <div className="flex items-center gap-2">
                  <Icon.Medal
                    size={24}
                    weight="fill"
                    className={
                      i === 0 ? "text-[#cd7f32]" : i === 1 ? "text-[#8a8a8a]" : "text-[#d4af37]"
                    }
                  />
                  <div className="font-display text-xl">{tier.n}</div>
                </div>
                <div className="mt-2 font-display text-3xl text-accent tabular-nums">
                  {tier.cb}
                </div>
                <div className="font-body text-sm text-ink-soft">{tier.cond}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function StoreButton({ label, sub }: { label: string; sub: string }) {
  return (
    <span
      aria-disabled
      className="inline-flex cursor-not-allowed items-center gap-3 rounded-md border-2 border-ink bg-ink/90 px-4 py-2 text-paper opacity-80"
    >
      <span className="font-hand text-xs uppercase tracking-widest text-accent-2">
        {sub}
      </span>
      <span className="font-display text-base">{label}</span>
    </span>
  );
}
