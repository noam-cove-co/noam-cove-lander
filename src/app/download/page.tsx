import type { Metadata } from "next";
import { Check } from "lucide-react";
import { site } from "@/config/site";
import { InstallButton } from "@/components/install-button";
import { JoinButton } from "@/components/join-button";
import { WaitlistForm } from "@/components/waitlist";

export const metadata: Metadata = {
  title: "Download",
  description: "The Cove Mac drive is in a private beta. Join the waitlist. iPhone is coming soon.",
};

export default function DownloadPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">{site.campaign.badge}</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.98] tracking-tight text-balance sm:text-6xl">
        {site.download.title}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{site.download.body}</p>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="glass rounded-[28px] p-6">
          <p className="text-xs tracking-[0.18em] text-cove uppercase">{site.platforms.macos.status}</p>
          <h2 className="mt-3 font-serif text-4xl">Mac</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{site.platforms.macos.detail}</p>
          <ul className="mt-6 grid gap-3">
            {site.download.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <Check className="mt-0.5 size-4 shrink-0 text-cove" />
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-[28px] bg-white/45 p-6 ring-1 ring-foreground/10">
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">{site.platforms.ios.status}</p>
          <h2 className="mt-3 font-serif text-4xl">iPhone</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{site.platforms.ios.detail}</p>
          <div className="mt-6">
            <JoinButton ios label="Tell me when iPhone is ready" variant="outline" />
          </div>
        </article>
      </div>

      <div id="waitlist" className="glass mt-6 rounded-[28px] p-6 sm:p-8">
        <h2 className="font-serif text-3xl tracking-tight">Ask for a seat</h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Tell us whether the drive is for family photos, a marketing team, a studio, or a project you are building with an agent.
        </p>
        <div className="mt-6 max-w-xl">
          <WaitlistForm source="download" />
        </div>
      </div>

      <section className="mt-6 rounded-[28px] bg-pine px-6 py-8 text-paper sm:px-8">
        <h2 className="font-serif text-3xl tracking-tight">Keep this page on your home screen</h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/75">
          The Mac app is private for now. Add Cove to your home screen and the beta stays a tap away.
        </p>
        <div className="mt-5">
          <InstallButton label="Add to Home Screen" className="bg-white/10 text-paper hover:bg-white/15" />
        </div>
      </section>
    </main>
  );
}
