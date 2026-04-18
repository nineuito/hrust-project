import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "accent" | "accent2" | "dark";

const tones: Record<Tone, string> = {
  default: "bg-paper text-ink",
  accent: "bg-accent text-white",
  accent2: "bg-accent-2 text-ink",
  dark: "bg-ink text-paper",
};

export function Tag({
  children,
  tone = "default",
  rotate = false,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  rotate?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-ink px-3 py-1 font-hand text-sm",
        tones[tone],
        rotate && "hand-rotate-neg",
        className,
      )}
    >
      {children}
    </span>
  );
}
