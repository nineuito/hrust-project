"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function CategoryPill({
  icon,
  label,
  active,
  onClick,
}: {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 font-body text-sm font-bold transition-colors",
        active ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-muted",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
