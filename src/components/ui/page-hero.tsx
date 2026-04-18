import type { ReactNode } from "react";
import { Container } from "./container";
import { cn } from "@/lib/cn";

type Tone = "paper" | "accent2" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  accent2: "bg-accent-2 text-ink",
  ink: "bg-ink text-paper",
};

export function PageHero({
  eyebrow,
  title,
  description,
  tone = "paper",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: Tone;
  children?: ReactNode;
}) {
  return (
    <section className={cn("border-b-2 border-ink", tones[tone])}>
      <Container className="py-12 sm:py-16">
        {eyebrow ? (
          <div className="font-hand text-sm uppercase tracking-[0.2em] opacity-70">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="mt-2 font-display text-5xl leading-[0.9] tracking-tight sm:text-7xl">
          {title}
        </h1>
        {description ? (
          <div className="mt-4 max-w-2xl font-hand text-lg opacity-80">
            {description}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
