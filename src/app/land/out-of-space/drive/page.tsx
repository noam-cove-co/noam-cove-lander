import type { Metadata } from "next";
import { DriveStep } from "@/components/land/funnel/drive-step";

export const metadata: Metadata = {
  title: "Your own cloud drive, on your Mac",
  description: "One click. Cove shows up under Locations. The heavy files stay in the cloud. The Mac stays light.",
  other: { "cove:funnel-step": "drive" },
};

export default function OutOfSpaceDrivePage() {
  return <DriveStep />;
}
