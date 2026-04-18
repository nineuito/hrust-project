import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { titlePageMetadata } from "@/lib/metadata";
import { CheckoutForm } from "./checkout-form";
import { CheckoutSummary } from "./checkout-summary";

export const generateMetadata = titlePageMetadata("checkout", "eyebrow");

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("titleLine1")}
            <br />
            <span className="text-accent">{t("titleAccent")}</span>
          </>
        }
        description={t("description")}
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <CheckoutForm />
          <CheckoutSummary />
        </Container>
      </section>
    </>
  );
}
