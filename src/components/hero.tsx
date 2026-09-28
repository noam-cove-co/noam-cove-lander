import Image from "next/image";
import { site, type HeadlineVariant, headlineFor } from "@/config/site";
import { CloudStream } from "@/components/cloud-stream";
import { DemoStage } from "@/components/demo-stage";
import { MountDemo } from "@/components/mount-demo";
import { JoinButton } from "@/components/join-button";

export function Hero({ variant }: { variant: HeadlineVariant }) {
  const line = headlineFor(variant);
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-6 px-4 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)] lg:gap-4 lg:pt-20">
        <div className="order-2 lg:order-1">
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
        </div>
        <div className="order-1 mx-auto w-[min(100%,340px)] lg:order-2 lg:w-full lg:max-w-[460px]">
          <Image
            src="/brand/cove-icon.png"
            alt="A fluffy cloud shaped into a cove"
            width={1024}
            height={1024}
            priority
            className="h-auto w-full"
          />
        </div>
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
