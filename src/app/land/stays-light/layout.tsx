import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Mac that stays light.",
  description:
    "A cloud drive, shown in Finder. The library does not live on the system disk. Private beta from NOAM Co.",
  openGraph: {
    title: "The Mac that stays light.",
    description: "A cloud drive, shown in Finder. The library does not live on the system disk.",
    images: [{ url: "/campaign/out-of-space/oos-og-rolex.png", width: 2400, height: 1260 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mac that stays light.",
    images: ["/campaign/out-of-space/oos-og-rolex.png"],
  },
  robots: { index: true, follow: true },
  other: {
    "cove:campaign": "stays-light",
    "cove:funnel": "stays-light",
  },
};

export default function StaysLightLayout({ children }: { children: React.ReactNode }) {
  return children;
}
