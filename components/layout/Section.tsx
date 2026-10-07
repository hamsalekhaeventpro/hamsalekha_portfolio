import { cn } from "@/lib/utils";

/**
 * Section tone system — establishes global dark/light rhythm.
 *
 * tone="base"      LIGHT / BASE        warm ivory   bg-bg-base
 * tone="panel"     LIGHT / PANEL       soft panel   bg-bg-panel
 * tone="stage"     DARK / STAGE        navy stage   bg-navy-deep  + warm stage-light
 * tone="charcoal"  CHARCOAL / NEUTRAL  warm dark    bg-charcoal
 * tone="image"     IMAGE-LED           dark, full-bleed image context
 *
 * Future pages use these to create rhythm:
 *   DARK → LIGHT → LIGHT → DARK → DARK/FEATURE → LIGHT → DARK → LIGHT → DARK
 */

interface SectionProps {
  tone?: "base" | "panel" | "stage" | "charcoal" | "image";
  className?: string;
  children: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
  /** aria-label for landmark labelling */
  "aria-label"?: string;
  /** aria-labelledby for heading association */
  "aria-labelledby"?: string;
}

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  // Warm ivory — editorial, spacious
  base:     "bg-bg-base text-text-slate",
  // Warm panel — slightly deeper ivory
  panel:    "bg-bg-panel text-text-slate",
  // Deep navy — cinematic stage, warm stage-light glow via tone-stage class
  stage:    "bg-navy-deep text-cream/75 tone-stage",
  // Warm dark neutral — charcoal sections
  charcoal: "bg-charcoal text-cream/70",
  // Image-led — underlying dark context for full-bleed images
  image:    "bg-navy-deep text-cream",
};

const themeAttr: Record<NonNullable<SectionProps["tone"]>, "dark" | "light"> = {
  base:     "light",
  panel:    "light",
  stage:    "dark",
  charcoal: "dark",
  image:    "dark",
};

export function Section({
  tone = "base",
  className,
  children,
  id,
  style,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      style={style}
      className={cn("section-py w-full relative", toneClasses[tone], className)}
      data-theme={themeAttr[tone]}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  );
}
