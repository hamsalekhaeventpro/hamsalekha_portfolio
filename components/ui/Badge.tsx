import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "gold" | "navy" | "cream";
  className?: string;
}

export function Badge({ label, variant = "gold", className }: BadgeProps) {
  const variants = {
    gold: "bg-gold/15 text-gold-dark border border-gold/30",
    navy: "bg-navy/10 text-navy border border-navy/20",
    cream: "bg-cream/20 text-cream border border-cream/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full font-sans text-eyebrow font-semibold tracking-widest uppercase",
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
