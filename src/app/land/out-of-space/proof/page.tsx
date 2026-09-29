import type { Metadata } from "next";
import { ProofStep } from "@/components/land/funnel/proof-step";

export const metadata: Metadata = {
  title: "People wrote back.",
  description: "From the private beta: a real email, and desks that stopped buying little drives.",
  other: { "cove:funnel-step": "proof" },
};

export default function OutOfSpaceProofPage() {
  return <ProofStep />;
}
