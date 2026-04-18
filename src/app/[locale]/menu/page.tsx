import { setRequestLocale } from "next-intl/server";
import { titlePageMetadata } from "@/lib/metadata";
import { MenuClient } from "./menu-client";

export const generateMetadata = titlePageMetadata("nav", "menu");

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MenuClient />;
}
