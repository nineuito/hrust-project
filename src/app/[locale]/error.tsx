"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-paper py-16 sm:py-24">
      <Container className="mx-auto max-w-lg text-center">
        <div className="font-display text-[5rem] leading-none tracking-tight text-accent sm:text-[8rem]">
          !
        </div>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl">{t("title")}</h1>
        <p className="mt-2 font-body text-base text-ink-soft">
          {t("description")}
        </p>
        {error.digest ? (
          <p className="mt-2 font-body text-xs text-ink-soft/70 tabular-nums">
            ref: {error.digest}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={() => reset()} variant="filled" size="lg">
            {t("retry")}
          </Button>
          <Button href="/" variant="outline" size="lg">
            {t("home")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
