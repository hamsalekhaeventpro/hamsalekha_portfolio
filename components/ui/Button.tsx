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

const base =
  "group inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-control duration-300 min-h-[44px] focus-visible:outline-2 focus-visible:outline-gold-dark focus-visible:outline-offset-3 disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-wide";

const variants = {
  primary:
    "bg-gold text-navy-deep hover:bg-gold-light active:bg-gold-dark transition-colors",
  outline:
    "border-2 border-gold-border text-gold-dark bg-transparent hover:bg-gold/8 hover:border-gold transition-colors",
  ghost:
    "text-navy-deep bg-transparent hover:bg-navy-deep/8 transition-colors",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-9 py-4 text-base",
};

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
        {typeof children === "string" && children.endsWith("→") ? (
          <>
            {children.slice(0, -1).trim()}
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
          </>
        ) : typeof children === "string" && children.endsWith("↗") ? (
          <>
            {children.slice(0, -1).trim()}
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
          </>
        ) : (
          children
        )}
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
        typeof children === "string" && children.endsWith("→") ? (
          <>
            {children.slice(0, -1).trim()}
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
          </>
        ) : typeof children === "string" && children.endsWith("↗") ? (
          <>
            {children.slice(0, -1).trim()}
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
          </>
        ) : (
          children
        )
      )}
    </button>
  );
}
