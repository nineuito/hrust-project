import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="bg-paper py-16 sm:py-24">
      <Container className="mx-auto max-w-lg text-center">
        <div className="font-display text-[8rem] leading-none tracking-tight text-accent">
          404
        </div>
        <h1 className="mt-2 font-display text-3xl">{t("title")}</h1>
        <p className="mt-2 font-hand text-lg text-ink-soft">{t("description")}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="filled">{t("ctaHome")}</Button>
          <Button href="/menu" variant="outline">{t("ctaMenu")}</Button>
        </div>
      </Container>
    </section>
  );
}
