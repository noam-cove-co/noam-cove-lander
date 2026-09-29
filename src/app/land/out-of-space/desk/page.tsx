import type { Metadata } from "next";
import { DeskStep } from "@/components/land/funnel/desk-step";

export const metadata: Metadata = {
  title: "Same product. Different libraries.",
  description: "Pick the desk that looks like yours. Cove is still just a drive on the Mac.",
  other: { "cove:funnel-step": "desk" },
};

export default function OutOfSpaceDeskPage() {
  return <DeskStep />;
}
