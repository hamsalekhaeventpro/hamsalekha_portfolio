import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import { AboutClient } from "@/components/about/AboutClient";

export const metadata: Metadata = getPageMetadata("about", "/about");

export default function AboutPage() {
  return <AboutClient />;
}
