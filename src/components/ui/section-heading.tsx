import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4 border-b-2 border-ink pb-3",
        className,
      )}
    >
      <div>
        {eyebrow ? (
          <div className="font-hand text-sm uppercase tracking-[0.15em] text-ink-soft">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="font-display text-3xl leading-none tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
