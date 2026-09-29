import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JoinListView } from "@/components/land/join-list-view";
import { LookFamiliarView } from "@/components/land/look-familiar-view";
import { OwnDriveView } from "@/components/land/own-drive-view";
import { campaignById } from "@/config/campaigns";

/** Standalone land pages. Look familiar funnel lives at /land/out-of-space/* (static routes). */
const pages = {
  "own-drive": {
    View: OwnDriveView,
    title: "Your own cloud drive, on your Mac",
    description: "Cove: a cloud drive that shows up on your Mac in one click. Private beta from NOAM Co.",
    og: "/campaign/own-drive/od-og-hero-cta.png",
    campaignId: "own-drive",
  },
  "join-the-list": {
    View: JoinListView,
    title: "Join the Cove private beta",
    description: "Join the Cove waitlist. Invite friends to climb the list. Your own cloud drive, on your Mac.",
    og: "/campaign/join-the-list/jl-og-void.png",
    campaignId: "join-the-list",
  },
  "look-familiar": {
    View: LookFamiliarView,
    title: "Look familiar? Cove print ads",
    description:
      "Classic print-style Cove ads: enough space to do the work, on your Mac. Private beta from NOAM Co.",
    og: "/campaign/out-of-space/oos-og-rolex.png",
    campaignId: "out-of-space",
  },
} as const;

type PageKey = keyof typeof pages;

export function generateStaticParams() {
  return (Object.keys(pages) as PageKey[]).map((page) => ({ page }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const def = pages[page as PageKey];
  if (!def) return {};
  const campaign = campaignById(def.campaignId);
  return {
    title: def.title,
    description: def.description,
    openGraph: {
      title: def.title,
      description: def.description,
      images: [{ url: def.og, width: 2400, height: 1260 }],
    },
    twitter: {
      card: "summary_large_image",
      title: def.title,
      description: def.description,
      images: [def.og],
    },
    robots: { index: true, follow: true },
    other: {
      "cove:campaign": campaign?.id ?? def.campaignId,
    },
  };
}

export default async function LandPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const def = pages[page as PageKey];
  if (!def) notFound();
  const View = def.View;
  return <View />;
}
