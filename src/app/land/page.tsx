import Link from "next/link";
import { campaigns } from "@/config/campaigns";

export const metadata = {
  title: "Landing pages",
  robots: { index: false, follow: false },
};

export default function LandIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-[0.72rem] font-medium tracking-[0.18em] text-cove uppercase">Marketing funnel</p>
      <h1 className="mt-3 font-serif text-5xl tracking-[-0.04em]">Land pages</h1>
      <p className="mt-4 text-muted-foreground">
        Campaign destinations under <code className="text-foreground">/land/[page]</code>. Pass UTMs;
        attribution sticks for Mixpanel and the waitlist.
      </p>
      <ul className="mt-10 grid gap-4">
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <Link
              href={`/land/${campaign.landSlug}`}
              className="block border border-foreground/10 bg-paper p-5 hover:border-cove/40"
            >
              <p className="text-[0.72rem] tracking-[0.16em] text-cove uppercase">{campaign.purpose}</p>
              <h2 className="mt-1 font-serif text-2xl tracking-tight">{campaign.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">/land/{campaign.landSlug}</p>
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/land/look-familiar"
            className="block border border-foreground/10 bg-paper p-5 hover:border-cove/40"
          >
            <p className="text-[0.72rem] tracking-[0.16em] text-cove uppercase">print</p>
            <h2 className="mt-1 font-serif text-2xl tracking-tight">Look Familiar</h2>
            <p className="mt-2 text-sm text-muted-foreground">/land/look-familiar | classic print ads</p>
          </Link>
        </li>
      </ul>
    </main>
  );
}
