import type { Metadata } from "next";
import { CraftStep } from "@/components/land/funnel/craft-step";

export const metadata: Metadata = {
  title: "Crafted by NOAM Co.",
  description: "NOAM Co. A small consultancy. A private beta that opens from the list.",
  other: { "cove:funnel-step": "craft" },
};

export default function StaysLightCraftPage() {
  return <CraftStep />;
}
