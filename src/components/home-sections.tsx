import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { JoinButton } from "@/components/join-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Platforms() {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative min-h-[420px] overflow-hidden">
        <Image src="/media/macbook.jpg" alt="A MacBook on a desk" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1320]/80 via-[#0e1320]/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-[#f3f5f7] sm:p-8">
          <p className="text-xs tracking-[0.18em] text-[#3dcea0] uppercase">{site.platforms.macos.status}</p>
          <h2 className="mt-2 font-serif text-5xl tracking-[-0.04em]">{site.platforms.macos.name}</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">{site.platforms.macos.detail}</p>
          <Button nativeButton={false} className="mt-6 h-11 rounded-md px-5" render={<Link href="/download" />}>
            Join the Mac beta
          </Button>
        </div>
      </div>
      <div>
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">{site.platforms.ios.status}</p>
        <h3 className="mt-3 font-serif text-5xl tracking-[-0.04em]">{site.platforms.ios.name}</h3>
        <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted-foreground">{site.platforms.ios.detail}</p>
        <div className="mt-6">
          <JoinButton ios label="Tell me when iPhone is ready" variant="outline" />
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <Section>
      <h2 className="max-w-xl font-serif text-4xl tracking-tight sm:text-5xl">{site.faq.title}</h2>
      <Accordion defaultValue={[site.faq.items[0].q]} className="mt-8 border-t border-foreground/10">
        {site.faq.items.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="py-5 font-serif text-xl hover:no-underline sm:text-2xl">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="max-w-2xl pb-5 text-base leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

export function Close() {
  return (
    <section className="relative mx-4 mb-16 min-h-[70vh] overflow-hidden sm:mx-6">
      <Image
        src="/media/coast.jpg"
        alt="A wave breaking toward the shore"
        fill
        sizes="100vw"
        className="object-cover object-[center_68%]"
      />
      <div className="absolute inset-0 bg-[#0e1320]/45" />
      <div className="relative flex min-h-[70vh] flex-col items-start justify-end px-6 py-14 text-[#f3f5f7] sm:px-12 sm:py-16">
        <h2 className="max-w-3xl font-serif text-5xl tracking-[-0.04em] text-balance sm:text-7xl">{site.close.title}</h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">{site.close.body}</p>
        <div className="mt-8">
          <JoinButton />
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = [...site.disciplines, ...site.disciplines];
  return (
    <div className="overflow-hidden border-y border-foreground/10 py-4">
      <div className="marquee-track flex w-max gap-8 pr-8">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="font-serif flex items-center gap-8 text-[1.85rem] leading-none text-foreground/80">
            {item}
            <span className="size-1.5 rounded-full bg-cove" />
          </span>
        ))}
      </div>
    </div>
  );
}
