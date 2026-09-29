import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JoinListView } from "@/components/land/join-list-view";
import { OwnDriveView } from "@/components/land/own-drive-view";
import { campaignById, allCampaignIds } from "@/config/campaigns";

const pages = {
  "own-drive": {
    View: OwnDriveView,
    title: "Your own cloud drive, on your Mac",
    description: "Cove — a cloud drive that shows up on your Mac in one click. Private beta from NOAM Co.",
    og: "/campaign/own-drive/od-og-hero-cta.png",
  },
  "join-the-list": {
    View: JoinListView,
    title: "Join the Cove private beta",
    description: "Join the Cove waitlist. Invite friends to climb the list. Your own cloud drive, on your Mac.",
    og: "/campaign/join-the-list/jl-og-void.png",
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
  const campaign = campaignById(page);
  return {
    title: def.title,
    description: def.description,
    openGraph: {
      title: def.title,
      description: def.description,
      images: [{ url: def.og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: def.title,
      description: def.description,
      images: [def.og],
    },
    robots: { index: true, follow: true },
    other: {
      "cove:campaign": campaign?.id ?? page,
    },
  };
}

export default async function LandPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const def = pages[page as PageKey];
  if (!def) notFound();
  // Ensure campaign slug exists for future land pages wired from config.
  if (!allCampaignIds().includes(page) && !(page in pages)) notFound();
  const View = def.View;
  return <View />;
}
