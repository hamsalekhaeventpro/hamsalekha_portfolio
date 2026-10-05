import { cn } from "@/lib/utils";

interface SectionProps {
  tone?: "base" | "panel" | "stage";
  className?: string;
  children: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}

export function Section({ tone = "base", className, children, id, style }: SectionProps) {
  const tones = {
    base: "bg-base text-text-slate",
    panel: "bg-panel text-text-slate",
    stage: "bg-navy-deep text-cream/70",
  };

  return (
    <section
      id={id}
      style={style}
      className={cn("section-py w-full", tones[tone], className)}
      data-theme={tone === "stage" ? "dark" : "light"}
    >
      {children}
    </section>
  );
}
