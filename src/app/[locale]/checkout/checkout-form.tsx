"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart";

const inputClass =
  "h-12 w-full rounded-md border-2 border-ink bg-paper px-3 font-body text-base outline-none focus:border-accent";

export function CheckoutForm() {
  const t = useTranslations("checkout");
  const clear = useCartStore((s) => s.clear);
  const [submitted, setSubmitted] = useState(false);
  const methods = t.raw("methods") as string[];

  if (submitted) {
    return (
      <div className="rounded-lg border-2 border-ink bg-accent-2 p-8 text-center hand-shadow">
        <div className="font-display text-4xl">🎉</div>
        <p className="mt-3 font-display text-2xl">{t("success")}</p>
        <div className="mt-6">
          <Button href="/" variant="filled" size="lg">
            {t("successCta")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        clear();
        setSubmitted(true);
      }}
    >
      <fieldset className="space-y-4 rounded-lg border-2 border-ink p-6">
        <legend className="px-2 font-display text-xl">{t("sections.contact")}</legend>
        <label className="block">
          <span className="font-hand text-sm text-ink-soft">{t("fields.name")}</span>
          <input type="text" required className={inputClass} />
        </label>
        <label className="block">
          <span className="font-hand text-sm text-ink-soft">{t("fields.phone")}</span>
          <input
            type="tel"
            required
            placeholder={t("fields.phonePlaceholder")}
            className={inputClass}
          />
        </label>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border-2 border-ink p-6">
        <legend className="px-2 font-display text-xl">{t("sections.delivery")}</legend>
        <label className="block">
          <span className="font-hand text-sm text-ink-soft">{t("fields.address")}</span>
          <input type="text" required className={inputClass} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="font-hand text-sm text-ink-soft">{t("fields.apt")}</span>
            <input type="text" className={inputClass} />
          </label>
          <label className="block">
            <span className="font-hand text-sm text-ink-soft">{t("fields.floor")}</span>
            <input type="text" className={inputClass} />
          </label>
        </div>
        <label className="block">
          <span className="font-hand text-sm text-ink-soft">{t("fields.comment")}</span>
          <textarea rows={2} className={`${inputClass} h-auto py-2`} />
        </label>
      </fieldset>

      <fieldset className="space-y-3 rounded-lg border-2 border-ink p-6">
        <legend className="px-2 font-display text-xl">{t("sections.payment")}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {methods.map((method, i) => (
            <label
              key={method}
              className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-ink bg-paper px-4 py-3 font-hand text-lg has-[:checked]:bg-accent-2"
            >
              <input
                type="radio"
                name="payment"
                defaultChecked={i === 0}
                className="accent-accent"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <Button type="submit" variant="filled" size="lg" className="w-full">
        {t("confirm")}
      </Button>
      <p className="text-center font-hand text-xs text-ink-soft">{t("terms")}</p>
    </form>
  );
}
