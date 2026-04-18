"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function NotifyForm() {
  const t = useTranslations("appPage");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-md border-2 border-ink bg-paper px-4 py-3 font-hand text-base">
        {t("notifySuccess")}
      </div>
    );
  }

  return (
    <form
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        placeholder={t("emailPlaceholder")}
        className="h-12 flex-1 rounded-md border-2 border-ink bg-paper px-4 font-body text-base outline-none placeholder:text-ink-soft"
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-md border-2 border-ink bg-accent px-5 font-body font-bold text-paper shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
      >
        {t("notifyCta")}
      </button>
    </form>
  );
}
