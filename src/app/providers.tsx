"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const Toaster = dynamic(
  () => import("sonner").then((m) => ({ default: m.Toaster })),
  { ssr: false },
);

const TOAST_STYLE = {
  border: "2px solid var(--color-ink)",
  borderRadius: "8px",
  background: "var(--color-paper)",
  color: "var(--color-ink)",
  boxShadow: "4px 4px 0 var(--color-ink)",
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{ className: "font-body", style: TOAST_STYLE }}
      />
    </>
  );
}
