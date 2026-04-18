"use client";

import { cn } from "@/lib/cn";

export function CategoryPill({
  icon,
  label,
  active,
  onClick,
}: {
  icon?: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-4 py-1.5 font-hand text-base transition-colors",
        active ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-muted",
      )}
    >
      {icon ? <span aria-hidden>{icon}</span> : null}
      {label}
    </button>
  );
}
