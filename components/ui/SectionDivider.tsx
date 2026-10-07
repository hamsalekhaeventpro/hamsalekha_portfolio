import { cn } from "@/lib/utils";

/**
 * SectionDivider — thin, restrained gold rules between sections.
 *
 * Phase 1 spec:
 * - Thin (1px)
 * - Short & intentional (not full-width by default)
 * - No thick gold borders
 *
 * variant="gold"  — warm gold, centered fade
 * variant="navy"  — subtle navy, for light→light transitions
 * variant="muted" — near-invisible, structural only
 */

interface SectionDividerProps {
  variant?: "gold" | "navy" | "muted";
  className?: string;
}

export function SectionDivider({ variant = "gold", className }: SectionDividerProps) {
  const styles = {
    gold:  "bg-gradient-to-r from-transparent via-gold/25 to-transparent",
    navy:  "bg-gradient-to-r from-transparent via-navy-deep/10 to-transparent",
    muted: "bg-gradient-to-r from-transparent via-panel-warm to-transparent",
  };

  return (
    <div
      aria-hidden="true"
      className={cn("h-px w-full", styles[variant], className)}
    />
  );
}

/**
 * GoldRule — short decorative gold hairline.
 * Used as an eyebrow accent before section headings.
 *
 * width defaults to 2rem (w-8), height is 1px.
 */
export function GoldRule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block h-px w-8 bg-gold shrink-0", className)}
    />
  );
}
