import { setRequestLocale } from "next-intl/server";
import { titlePageMetadata } from "@/lib/metadata";
import { CartContent } from "./cart-content";

export const generateMetadata = titlePageMetadata("nav", "cart");

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CartContent />;
}
