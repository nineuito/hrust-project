import { cn } from "@/lib/cn";

type Tone = "muted" | "accent" | "accent2" | "paper";

const tones: Record<Tone, string> = {
  muted: "bg-muted",
  accent: "bg-accent",
  accent2: "bg-accent-2",
  paper: "bg-paper",
};

export function PlaceholderImage({
  label,
  tone = "muted",
  className,
  rounded = false,
}: {
  label?: string;
  tone?: Tone;
  className?: string;
  rounded?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden border border-ink",
        rounded ? "rounded-xl" : "rounded-sm",
        tones[tone],
        className,
      )}
      role="img"
      aria-label={label ?? "placeholder"}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-30"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      {label ? (
        <span className="relative bg-paper px-2 py-0.5 font-hand text-xs text-ink border border-ink">
          {label}
        </span>
      ) : null}
    </div>
  );
}
