import type { Metadata } from "next";
import { LibrariesStep } from "@/components/land/funnel/libraries-step";

export const metadata: Metadata = {
  title: "Quiet confidence. Loud libraries.",
  description: "Family film, a campaign, a studio, a repo. Same drive. Different rooms.",
  other: { "cove:funnel-step": "libraries" },
};

export default function StaysLightLibrariesPage() {
  return <LibrariesStep />;
}
