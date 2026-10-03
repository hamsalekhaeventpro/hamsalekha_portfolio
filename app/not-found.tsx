import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "var(--gradient-navy-band)" }}
    >
      <div className="flex flex-col items-center gap-6 max-w-lg">
        <span className="font-display text-9xl font-bold text-gold/20 select-none">404</span>
        <h1 className="font-display text-h2 font-bold text-cream">
          This stage isn't built yet.
        </h1>
        <p className="font-sans text-body text-cream/60">
          The page you're looking for doesn't exist.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button href="/" variant="primary" size="md">
            Back to Home →
          </Button>
          <Button
            href={`https://wa.me/919972544316`}
            variant="outline"
            size="md"
            external
          >
            WhatsApp us
          </Button>
        </div>
      </div>
    </div>
  );
}
