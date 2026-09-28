import { site, type HeadlineVariant, headlineFor } from "@/config/site";
import { CloudStream } from "@/components/cloud-stream";
import { DemoStage } from "@/components/demo-stage";
import { MountDemo } from "@/components/mount-demo";
import { JoinButton } from "@/components/join-button";

export function Hero({ variant }: { variant: HeadlineVariant }) {
  const line = headlineFor(variant);
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24">
        <p className="text-xs tracking-[0.18em] text-cove uppercase">{site.hero.eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-[2.7rem] leading-[0.96] tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.75rem]">
          {line.before}
          <span className="text-cove">{line.accent}</span>
          {line.after}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{site.hero.sub}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <JoinButton />
          <a
            href="#demo"
            className="inline-flex h-11 items-center justify-center rounded-md border border-foreground/15 bg-white px-5 text-[15px]"
          >
            {site.hero.secondaryCta}
          </a>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{site.hero.platforms}</p>
      </section>
      <div className="mt-12">
        <DemoStage>
          <MountDemo />
        </DemoStage>
      </div>
      <CloudStream />
    </>
  );
}
