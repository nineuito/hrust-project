"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  lineId: string;
  productId: string;
  variantId?: string;
  addonIds: string[];
  qty: number;
  unitPrice: number;
};

export type AddLineInput = {
  productId: string;
  variantId?: string;
  addonIds?: string[];
  unitPrice: number;
  qty?: number;
};

export function makeLineId(
  productId: string,
  variantId: string | undefined,
  addonIds: string[],
): string {
  const v = variantId ?? "_";
  const a = [...addonIds].sort().join(",");
  return `${productId}|${v}|${a}`;
}

type CartState = {
  items: CartItem[];
  addLine: (input: AddLineInput) => void;
  incrementLine: (lineId: string) => void;
  decrementLine: (lineId: string) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addLine: ({ productId, variantId, addonIds = [], unitPrice, qty = 1 }) =>
        set((state) => {
          const lineId = makeLineId(productId, variantId, addonIds);
          const existing = state.items.find((i) => i.lineId === lineId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.lineId === lineId ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { lineId, productId, variantId, addonIds, unitPrice, qty },
            ],
          };
        }),
      incrementLine: (lineId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.lineId === lineId ? { ...i, qty: i.qty + 1 } : i,
          ),
        })),
      decrementLine: (lineId) =>
        set((state) => {
          const existing = state.items.find((i) => i.lineId === lineId);
          if (!existing) return state;
          if (existing.qty <= 1) {
            return { items: state.items.filter((i) => i.lineId !== lineId) };
          }
          return {
            items: state.items.map((i) =>
              i.lineId === lineId ? { ...i, qty: i.qty - 1 } : i,
            ),
          };
        }),
      removeLine: (lineId) =>
        set((state) => ({
          items: state.items.filter((i) => i.lineId !== lineId),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "khrum-cart-v2",
      version: 2,
    },
  ),
);

export function useCartCount(): number {
  return useCartStore((s) => s.items.reduce((a, b) => a + b.qty, 0));
}

export function useCartTotal(): number {
  return useCartStore((s) =>
    s.items.reduce((a, b) => a + b.unitPrice * b.qty, 0),
  );
}
