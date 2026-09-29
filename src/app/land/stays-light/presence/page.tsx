import type { Metadata } from "next";
import { PresenceStep } from "@/components/land/funnel/presence-step";

export const metadata: Metadata = {
  title: "It simply shows up.",
  description: "One click under Locations. Beside Macintosh HD. The files stay in the cloud.",
  other: { "cove:funnel-step": "presence" },
};

export default function StaysLightPresencePage() {
  return <PresenceStep />;
}
