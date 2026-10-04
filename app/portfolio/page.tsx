import { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import PortfolioClient from "@/components/portfolio/PortfolioClient";

export const metadata: Metadata = getPageMetadata("portfolio", "/portfolio");

export default function PortfolioPage() {
  return <PortfolioClient />;
}
