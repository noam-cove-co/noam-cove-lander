import { notFound } from "next/navigation";
import { CreativeFrame } from "@/components/campaign/creative-frame";
import { allCampaignIds, campaignById } from "@/config/campaigns";

export function generateStaticParams() {
  return allCampaignIds().flatMap((name) => {
    const campaign = campaignById(name);
    if (!campaign) return [];
    return campaign.creatives.map((creative) => ({
      name,
      creativeId: creative.id,
    }));
  });
}

export default async function CreativeExportPage({
  params,
}: {
  params: Promise<{ name: string; creativeId: string }>;
}) {
  const { name, creativeId } = await params;
  const campaign = campaignById(name);
  const creative = campaign?.creatives.find((item) => item.id === creativeId);
  if (!campaign || !creative) notFound();

  return (
    <div
      className="flex min-h-svh items-start justify-start bg-black"
      style={{ width: creative.width, height: creative.height }}
    >
      <CreativeFrame creative={creative} />
    </div>
  );
}
