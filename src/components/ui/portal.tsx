"use client";

import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { useHydrated } from "@/lib/hooks/use-hydrated";

export function Portal({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  if (!hydrated) return null;
  return createPortal(children, document.body);
}
