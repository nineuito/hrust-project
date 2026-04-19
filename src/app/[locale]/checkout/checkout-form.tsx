"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/lib/stores/cart";

const inputClass =
  "h-12 w-full rounded-md border-2 border-ink bg-paper px-3 font-body text-base outline-none transition-colors focus:border-accent";

const inputErrorClass = "border-accent";

const NAME_MIN_LENGTH = 2;
const ADDRESS_MIN_LENGTH = 4;
const COMMENT_MAX_LENGTH = 200;
const PHONE_REGEX = /^\+?\d[\d\s()-]{9,14}$/;
const SUBMIT_DELAY_MS = 600;

type CheckoutFormValues = z.infer<typeof schema>;

const schema = z.object({
  name: z.string().min(NAME_MIN_LENGTH),
  phone: z.string().regex(PHONE_REGEX, ""),
  address: z.string().min(ADDRESS_MIN_LENGTH),
  apt: z.string().optional(),
  floor: z.string().optional(),
  comment: z.string().max(COMMENT_MAX_LENGTH).optional(),
  payment: z.enum(["cash", "apple", "google", "online"]),
});

const paymentKeys = ["cash", "apple", "google", "online"] as const;

export function CheckoutForm() {
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");
  const clear = useCartStore((s) => s.clear);
  const isCartEmpty = useCartStore((s) => s.items.length === 0);
  const [submitted, setSubmitted] = useState(false);
  const methods = t.raw("methods") as string[];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { payment: "cash" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, SUBMIT_DELAY_MS));
    clear();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border-2 border-ink bg-accent-2 p-8 text-center hand-shadow">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-paper">
          <span className="font-display text-3xl">✓</span>
        </div>
        <p className="mt-4 font-display text-2xl uppercase">{t("success")}</p>
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
      onSubmit={handleSubmit(() => {
        if (isCartEmpty) {
          toast.error(tCart("empty"));
          return;
        }
        return onSubmit();
      })}
      noValidate
    >
      <fieldset className="space-y-4 rounded-lg border-2 border-ink p-6">
        <legend className="px-2 font-display text-xl">{t("sections.contact")}</legend>
        <Field
          label={t("fields.name")}
          error={isSubmitted && errors.name && t("errors.nameMin")}
        >
          <input
            type="text"
            autoComplete="name"
            className={cn(inputClass, isSubmitted && errors.name && inputErrorClass)}
            {...register("name")}
          />
        </Field>
        <Field
          label={t("fields.phone")}
          error={isSubmitted && errors.phone && t("errors.phoneFormat")}
        >
          <input
            type="tel"
            autoComplete="tel"
            placeholder={t("fields.phonePlaceholder")}
            className={cn(inputClass, isSubmitted && errors.phone && inputErrorClass)}
            {...register("phone")}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border-2 border-ink p-6">
        <legend className="px-2 font-display text-xl">{t("sections.delivery")}</legend>
        <Field
          label={t("fields.address")}
          error={isSubmitted && errors.address && t("errors.addressMin")}
        >
          <input
            type="text"
            autoComplete="street-address"
            className={cn(inputClass, isSubmitted && errors.address && inputErrorClass)}
            {...register("address")}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t("fields.apt")}>
            <input type="text" className={inputClass} {...register("apt")} />
          </Field>
          <Field label={t("fields.floor")}>
            <input type="text" className={inputClass} {...register("floor")} />
          </Field>
        </div>
        <Field label={t("fields.comment")}>
          <textarea
            rows={2}
            className={`${inputClass} h-auto py-2`}
            {...register("comment")}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-3 rounded-lg border-2 border-ink p-6">
        <legend className="px-2 font-display text-xl">{t("sections.payment")}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {methods.map((method, i) => (
            <label
              key={method}
              className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-ink bg-paper px-4 py-3 font-body text-base transition-colors has-[:checked]:bg-accent-2"
            >
              <input
                type="radio"
                value={paymentKeys[i]}
                {...register("payment")}
                className="accent-accent"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <Button type="submit" variant="filled" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t("confirming") : t("confirm")}
      </Button>
      <p className="text-center font-body text-xs text-ink-soft">{t("terms")}</p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | false;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 inline-block font-body text-xs font-bold uppercase tracking-wider text-ink-soft">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block font-body text-xs text-accent">{error}</span>
      ) : null}
    </label>
  );
}
