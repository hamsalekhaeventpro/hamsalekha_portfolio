import { cn } from "@/lib/utils";

interface GradientDividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function GradientDivider({
  orientation = "horizontal",
  className,
}: GradientDividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn("w-px self-stretch", className)}
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(201,162,39,0.4), transparent)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={cn("h-px w-full", className)}
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(201,162,39,0.4), transparent)",
      }}
      aria-hidden="true"
    />
  );
}
