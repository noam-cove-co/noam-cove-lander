import { site, type HeadlineVariant, headlineFor } from "@/config/site";
import { MountDemo } from "@/components/mount-demo";
import { JoinButton } from "@/components/join-button";

export function Hero({ variant }: { variant: HeadlineVariant }) {
  const line = headlineFor(variant);
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-32 pb-8 sm:px-6 sm:pt-40">
      <p className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs tracking-[0.16em] text-cove uppercase ring-1 ring-white/80">
        <span className="size-1.5 rounded-full bg-cove" />
        {site.hero.eyebrow}
      </p>
      <h1 className="mt-6 max-w-4xl font-serif text-[2.7rem] leading-[0.96] tracking-[-0.035em] text-balance sm:text-6xl lg:text-[5.15rem]">
        {line.before}
        <span className="text-cove">{line.accent}</span>
        {line.after}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{site.hero.sub}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <JoinButton />
        <a
          href="#demo"
          className="inline-flex h-12 items-center justify-center rounded-full bg-white/70 px-6 text-[15px] ring-1 ring-foreground/10"
        >
          {site.hero.secondaryCta}
        </a>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{site.hero.platforms}</p>
      <div className="mt-12">
        <MountDemo />
      </div>
    </section>
  );
}
