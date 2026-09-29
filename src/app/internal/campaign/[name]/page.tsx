import Link from "next/link";
import { notFound } from "next/navigation";
import { CreativeFrame } from "@/components/campaign/creative-frame";
import { allCampaignIds, campaignById } from "@/config/campaigns";

export function generateStaticParams() {
  return allCampaignIds().map((name) => ({ name }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const campaign = campaignById(name);
  if (!campaign) return {};
  return { title: campaign.name };
}

export default async function CampaignLibraryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const campaign = campaignById(name);
  if (!campaign) notFound();

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
      <div className="max-w-3xl">
        <p className="text-[0.72rem] font-medium tracking-[0.18em] text-cove uppercase">
          {campaign.purpose} · /internal/campaign/{campaign.id}
        </p>
        <h1 className="mt-3 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{campaign.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{campaign.summary}</p>
        <dl className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <div>
            <dt className="tracking-[0.14em] uppercase">Land page</dt>
            <dd className="mt-1 text-foreground">/land/{campaign.landSlug}</dd>
          </div>
          <div>
            <dt className="tracking-[0.14em] uppercase">UTM campaign</dt>
            <dd className="mt-1 text-foreground">{campaign.defaultUtm.campaign}</dd>
          </div>
          <div>
            <dt className="tracking-[0.14em] uppercase">Creatives</dt>
            <dd className="mt-1 text-foreground">{campaign.creatives.length} for approval</dd>
          </div>
        </dl>
      </div>

      <div className="mt-12 grid gap-14">
        {campaign.creatives.map((creative) => {
          const scale = Math.min(1, 720 / creative.width);
          return (
            <section key={creative.id} id={creative.id} className="scroll-mt-8">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl tracking-[-0.03em]">{creative.headline}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {creative.label} · {creative.id} · tone {creative.tone}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href={`/campaign/${campaign.id}/${creative.id}.png`}
                    download
                    className="text-cove hover:underline"
                  >
                    Download PNG
                  </a>
                  <Link
                    href={`/internal/campaign/${campaign.id}/export/${creative.id}`}
                    className="text-muted-foreground hover:text-foreground hover:underline"
                  >
                    Full-size view
                  </Link>
                </div>
              </div>
              <div className="overflow-auto border border-foreground/10 bg-[#d9dde3] p-4 sm:p-6">
                <div
                  className="origin-top-left shadow-[0_24px_60px_-36px_rgba(14,19,32,0.55)]"
                  style={{
                    width: creative.width * scale,
                    height: creative.height * scale,
                  }}
                >
                  <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
                    <CreativeFrame creative={creative} />
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
