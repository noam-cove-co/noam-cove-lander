import type { Metadata } from "next";
import { DownloadView } from "@/components/download-view";

export const metadata: Metadata = {
  title: "Download",
  description: "The Cove Mac drive is in a private beta. Join the waitlist. iPhone is coming soon.",
};

export default function DownloadPage() {
  return <DownloadView />;
}
