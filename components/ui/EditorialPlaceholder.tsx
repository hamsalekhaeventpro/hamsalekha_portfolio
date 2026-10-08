import React from "react";

interface EditorialPlaceholderProps {
  /** Aspect ratio class, e.g. "aspect-[4/3]", "aspect-[16/10]", "aspect-[3/4]", "aspect-[21/9]", "aspect-square" */
  aspectRatio?: string;
  /** Visual tone: "light" (warm ivory/panel base) or "dark" (deep navy/stage base) */
  tone?: "light" | "dark";
  /** Contextual category/subject label, e.g. "FOUNDER PORTRAIT", "GLASS HOUSE", "WAREHOUSE", "EVENT PHOTOGRAPH", "CREW / BACKSTAGE" */
  contextLabel: string;
  /** Primary title/subject caption */
  caption?: string;
  /** Secondary detail or year descriptor */
  subline?: string;
  /** Whether to render circular framing (e.g. for MoonGate) */
  circular?: boolean;
  /** Additional container styling */
  className?: string;
  /** Optional ID for testing / anchoring */
  id?: string;
}

export function EditorialPlaceholder({
  aspectRatio = "aspect-[4/3]",
  tone = "light",
  contextLabel,
  caption,
  subline,
  circular = false,
  className = "",
  id,
}: EditorialPlaceholderProps) {
  const isLight = tone === "light";

  // Base themes
  const baseBg = isLight
    ? "bg-gradient-to-b from-[#F5EFEB] via-[#EFE8E0] to-[#EAE2D8] border-gold-dark/30 text-navy-deep shadow-xs"
    : "bg-gradient-to-b from-navy-mid/80 via-navy-deep to-navy-mid/80 border-gold/25 text-cream shadow-md";

  const tickColor = isLight ? "border-gold-dark/45" : "border-gold/40";
  const hairlineColor = isLight ? "border-gold-dark/15" : "border-gold/15";
  const monogramColor = isLight ? "text-gold-dark/35" : "text-gold/30";
  const microLabelColor = isLight ? "text-text-slate/60" : "text-cream/50";
  const contextLabelColor = isLight ? "text-gold-dark" : "text-gold-light";
  const dividerColor = isLight ? "bg-gold-dark/30" : "bg-gold/30";
  const captionColor = isLight ? "text-navy-deep font-semibold" : "text-cream font-medium";
  const sublineColor = isLight ? "text-text-slate/75" : "text-cream/70";

  if (circular) {
    return (
      <div
        id={id}
        role="img"
        aria-label={`${contextLabel}${caption ? ` - ${caption}` : ""}`}
        className={`relative ${aspectRatio} w-full rounded-full border ${baseBg} flex flex-col items-center justify-center p-6 sm:p-8 overflow-hidden select-none ${className}`}
      >
        {/* Subtle radial glow */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_68%)]" 
          aria-hidden="true" 
        />

        {/* Inner concentric ring */}
        <div className={`absolute inset-3 sm:inset-5 rounded-full border ${hairlineColor} pointer-events-none`} />

        {/* Cardinal tick accents */}
        <div className={`absolute top-2 inset-x-1/2 -translate-x-1/2 w-3 h-0.5 ${isLight ? 'bg-gold-dark/40' : 'bg-gold/40'} pointer-events-none`} />
        <div className={`absolute bottom-2 inset-x-1/2 -translate-x-1/2 w-3 h-0.5 ${isLight ? 'bg-gold-dark/40' : 'bg-gold/40'} pointer-events-none`} />
        <div className={`absolute left-2 inset-y-1/2 -translate-y-1/2 h-3 w-0.5 ${isLight ? 'bg-gold-dark/40' : 'bg-gold/40'} pointer-events-none`} />
        <div className={`absolute right-2 inset-y-1/2 -translate-y-1/2 h-3 w-0.5 ${isLight ? 'bg-gold-dark/40' : 'bg-gold/40'} pointer-events-none`} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center gap-2 sm:gap-2.5 max-w-[85%]">
          <span className={`font-display font-bold text-3xl sm:text-4xl ${monogramColor} leading-none tracking-wider`}>
            H
          </span>
          <div className="flex flex-col items-center gap-1">
            <span className={`font-sans text-[0.55rem] uppercase tracking-[0.28em] font-bold ${microLabelColor}`}>
              IMAGE PLACEHOLDER
            </span>
            <span className={`font-sans text-[0.65rem] sm:text-xs uppercase tracking-[0.22em] font-bold ${contextLabelColor}`}>
              {contextLabel}
            </span>
          </div>
          {caption && (
            <p className={`font-display italic text-xs sm:text-sm ${captionColor} leading-snug mt-0.5`}>
              {caption}
            </p>
          )}
          {subline && (
            <p className={`font-sans text-[0.65rem] sm:text-xs ${sublineColor} leading-tight`}>
              {subline}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      role="img"
      aria-label={`${contextLabel}${caption ? ` - ${caption}` : ""}`}
      className={`relative ${aspectRatio} w-full rounded-sm border ${baseBg} flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 overflow-hidden select-none ${className}`}
    >
      {/* Subtle radial texture */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)]" 
        aria-hidden="true" 
      />

      {/* Editorial corner tick marks */}
      <div className={`absolute top-2.5 sm:top-3 left-2.5 sm:left-3 w-3 sm:w-3.5 h-3 sm:h-3.5 border-t border-l ${tickColor} pointer-events-none`} />
      <div className={`absolute top-2.5 sm:top-3 right-2.5 sm:right-3 w-3 sm:w-3.5 h-3 sm:h-3.5 border-t border-r ${tickColor} pointer-events-none`} />
      <div className={`absolute bottom-2.5 sm:top-auto sm:bottom-3 left-2.5 sm:left-3 w-3 sm:w-3.5 h-3 sm:h-3.5 border-b border-l ${tickColor} pointer-events-none`} />
      <div className={`absolute bottom-2.5 sm:top-auto sm:bottom-3 right-2.5 sm:right-3 w-3 sm:w-3.5 h-3 sm:h-3.5 border-b border-r ${tickColor} pointer-events-none`} />

      {/* Subtle inner decorative hairline framing */}
      <div className={`absolute inset-2.5 sm:inset-3.5 border ${hairlineColor} pointer-events-none rounded-xs`} />

      {/* Center Monogram & Architectural Labels */}
      <div className="relative z-10 flex flex-col items-center text-center gap-2 sm:gap-2.5 max-w-[90%] sm:max-w-[80%]">
        <span className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl ${monogramColor} leading-none tracking-wider`}>
          H
        </span>
        
        <div className={`w-8 sm:w-10 h-[1px] ${dividerColor} my-0.5`} />

        <div className="flex flex-col items-center gap-0.5">
          <span className={`font-sans text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.28em] font-semibold ${microLabelColor}`}>
            IMAGE PLACEHOLDER
          </span>
          <span className={`font-sans text-[0.65rem] sm:text-xs uppercase tracking-[0.22em] font-bold ${contextLabelColor}`}>
            {contextLabel}
          </span>
        </div>

        {caption && (
          <p className={`font-display italic text-xs sm:text-sm md:text-base ${captionColor} leading-snug mt-0.5`}>
            {caption}
          </p>
        )}

        {subline && (
          <p className={`font-sans text-[0.65rem] sm:text-xs ${sublineColor} leading-tight`}>
            {subline}
          </p>
        )}
      </div>
    </div>
  );
}
