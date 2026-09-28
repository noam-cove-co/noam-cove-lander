import Image from "next/image";
import { site } from "@/config/site";
import { CoveMark } from "@/components/brand";
import { MacWindow } from "@/components/mac-window";
import { Kicker } from "@/components/section";

export function UseCases() {
  const { useCases } = site;
  return (
    <section id={useCases.id} className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Kicker>{useCases.kicker}</Kicker>
      <h2 className="mt-3 max-w-3xl font-serif text-4xl tracking-[-0.04em] text-balance sm:text-6xl">{useCases.title}</h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{useCases.body}</p>
      <div className="mt-16 grid gap-20">
        {useCases.items.map((item, index) => {
          const flip = index % 2 === 1;
          return (
            <article key={item.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={flip ? "lg:order-2" : undefined}>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e7e4de]">
                  <Image src={item.photo} alt={item.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </div>
              </div>
              <div className={flip ? "lg:order-1" : undefined}>
                <h3 className="font-serif text-4xl tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">{item.body}</p>
                <MacWindow title={item.volume} className="mt-6">
                  <div className="px-3 py-3 text-[13px]">
                    <p className="px-2 text-[11px] font-semibold text-[#6e6e73]">Locations</p>
                    <div className="mt-1 flex items-center gap-2 rounded-md bg-[#0a84ff] px-2 py-1.5 text-white">
                      <CoveMark className="size-[21px] shrink-0" />
                      {item.volume}
                    </div>
                    <ul className="mt-2 border-t border-black/10">
                      {item.files.map((file) => (
                        <li key={file} className="flex items-center gap-2 border-b border-black/8 px-2 py-2">
                          <CoveMark className="size-[18px] shrink-0" />
                          {file}
                        </li>
                      ))}
                    </ul>
                  </div>
                </MacWindow>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
