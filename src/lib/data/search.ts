import { l, products, type Product } from "./menu";

export function filterProducts(query: string, locale: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const name = l(p.name, locale).toLowerCase();
    const desc = l(p.description, locale).toLowerCase();
    return name.includes(q) || desc.includes(q);
  });
}
