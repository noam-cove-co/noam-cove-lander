import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Look familiar? The Mac is full again",
  description:
    "The work got heavy. The laptop stayed the same size. Cove is your own cloud drive, on your Mac: enough room to do what you actually want.",
  openGraph: {
    title: "Look familiar? The Mac is full again",
    description:
      "The work got heavy. The laptop stayed the same size. Cove is your own cloud drive, on your Mac.",
    images: [{ url: "/campaign/out-of-space/oos-og-familiar.png", width: 2400, height: 1260 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Look familiar? The Mac is full again",
    images: ["/campaign/out-of-space/oos-og-familiar.png"],
  },
  robots: { index: true, follow: true },
  other: {
    "cove:campaign": "out-of-space",
    "cove:funnel": "look-familiar",
  },
};

export default function OutOfSpaceFunnelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
