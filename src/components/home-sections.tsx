import { site } from "@/config/site";
import { Section } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export { Close, Platforms } from "@/components/platform-plays";

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
