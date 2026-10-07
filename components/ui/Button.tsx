import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  id?: string;
}

/**
 * Button system — Phase 1 spec:
 *
 * primary:  Gold background, deep navy text.
 *           Hover: lighter gold. No pill shape. No glow.
 *
 * outline:  Editorial border. Gold border/text on dark,
 *           navy border/text on light. Restrained hover.
 *
 * ghost:    Text-only. Transparent bg, subtle hover.
 *
 * Arrow/UpRight suffixes animate on hover (translate only, no scale/bounce).
 */

const base =
  "group inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-[2px] min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-dark disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-wide";

const variants = {
  primary:
    "bg-gold text-navy-deep hover:bg-gold-light transition-colors duration-300",
  outline:
    "border border-gold-border text-gold-text bg-transparent hover:bg-gold/8 hover:border-gold transition-colors duration-300",
  ghost:
    "text-text-navy bg-transparent hover:bg-navy-deep/6 transition-colors duration-300",
};

/** Outline variant on dark (navy/stage) backgrounds */
export const outlineDark =
  "border border-gold/40 text-cream bg-transparent hover:bg-gold/10 hover:border-gold/70 transition-colors duration-300";

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-base",
};

function ArrowContent({ children }: { children: React.ReactNode }) {
  if (typeof children !== "string") return <>{children}</>;
  if (children.endsWith("→")) {
    return (
      <>
        {children.slice(0, -1).trim()}
        <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
      </>
    );
  }
  if (children.endsWith("↗")) {
    return (
      <>
        {children.slice(0, -1).trim()}
        <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </>
    );
  }
  return <>{children}</>;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  onClick,
  disabled,
  loading,
  className,
  type = "button",
  id,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        id={id}
      >
        <ArrowContent>{children}</ArrowContent>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      id={id}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Sending…
        </span>
      ) : (
        <ArrowContent>{children}</ArrowContent>
      )}
    </button>
  );
}
