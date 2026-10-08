import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import { VaultClient } from "@/components/vault/VaultClient";

export const metadata: Metadata = getPageMetadata("vault", "/the-vault");

export default function TheVaultPage() {
  return <VaultClient />;
}
