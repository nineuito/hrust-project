import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "filled" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  filled:
    "bg-accent text-white border-2 border-ink shadow-[4px_4px_0_var(--color-ink)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)]",
  outline:
    "bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-paper",
  ghost: "bg-transparent text-ink hover:bg-ink/5 border-2 border-transparent",
  dark: "bg-ink text-paper border-2 border-ink shadow-[4px_4px_0_var(--color-accent)] hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-14 px-7 text-lg",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-body font-bold transition-all duration-150 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_var(--color-ink)]";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AsButton = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = ButtonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export function Button(props: AsButton | AsLink) {
  const { variant = "filled", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as AsLink;
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes} {...linkRest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
