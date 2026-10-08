import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import { SignatureSetsClient } from "@/components/signature-sets/SignatureSetsClient";

export const metadata: Metadata = getPageMetadata("signatureSets", "/signature-sets");

export default function SignatureSetsPage() {
  return <SignatureSetsClient />;
}
