import Link from "next/link";
import { campaigns } from "@/config/campaigns";

export const metadata = {
  title: "Campaigns",
};

export default function CampaignIndexPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-serif text-5xl tracking-[-0.04em]">Campaign library</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Two Cove campaigns for the marketing funnel: awareness, then waitlist. Land pages are live
        at <code className="text-foreground">/land/[page]</code> with UTM attribution and
        Mixpanel-ready events.
      </p>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <Link
              href={`/internal/campaign/${campaign.id}`}
              className="block border border-foreground/10 bg-paper p-6 transition-colors hover:border-cove/40"
            >
              <p className="text-[0.72rem] font-medium tracking-[0.18em] text-cove uppercase">
                {campaign.purpose}
              </p>
              <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em]">{campaign.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{campaign.summary}</p>
              <p className="mt-5 text-sm text-foreground/70">
                {campaign.creatives.length} creatives · future land{" "}
                <span className="text-foreground">/land/{campaign.landSlug}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
