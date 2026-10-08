import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import { HowWeWorkClient } from "@/components/how-we-work/HowWeWorkClient";

export const metadata: Metadata = getPageMetadata("howWeWork", "/how-we-work");

export default function HowWeWorkPage() {
  return <HowWeWorkClient />;
}
