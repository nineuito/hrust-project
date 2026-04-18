import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type LocaleParams = { params: Promise<{ locale: string }> };

export function titlePageMetadata(namespace: string, key: string) {
  return async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace });
    return { title: t(key) };
  };
}
