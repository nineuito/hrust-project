"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "@/lib/data/menu";

export type CartItem = {
  productId: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (productId: string) => void;
  decrement: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (productId) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId ? { ...i, qty: i.qty + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { productId, qty: 1 }] };
        }),
      decrement: (productId) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (!existing) return state;
          if (existing.qty <= 1) {
            return { items: state.items.filter((i) => i.productId !== productId) };
          }
          return {
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, qty: i.qty - 1 } : i,
            ),
          };
        }),
      setQty: (productId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) =>
                  i.productId === productId ? { ...i, qty } : i,
                ),
        })),
      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "khrum-cart-v1",
      version: 1,
    },
  ),
);

export function useCartCount(): number {
  return useCartStore((s) => s.items.reduce((a, b) => a + b.qty, 0));
}

export function useCartTotal(): number {
  return useCartStore((s) =>
    s.items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.qty : 0);
    }, 0),
  );
}
