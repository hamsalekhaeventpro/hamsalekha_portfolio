import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import { ServicesClient } from "@/components/services/ServicesClient";

export const metadata: Metadata = getPageMetadata("services", "/services");

export default function ServicesPage() {
  return <ServicesClient />;
}
