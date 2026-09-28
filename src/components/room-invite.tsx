import Link from "next/link";
import { site } from "@/config/site";
import { CoveMark } from "@/components/brand";
import { Kicker } from "@/components/section";

export function RoomInvite() {
  const { room } = site;
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <Kicker>{room.kicker}</Kicker>
        <h2 className="mt-3 max-w-xl font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-6xl">{room.inviteTitle}</h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{room.inviteBody}</p>
        <Link href={room.path} className="mt-8 inline-flex h-12 items-center rounded-md bg-primary px-6 text-[15px] font-medium text-primary-foreground">
          Work it out
        </Link>
      </div>
      <div className="overflow-hidden rounded-[10px] bg-[#f6f6f6] text-[#1d1d1f] shadow-[0_22px_50px_-28px_rgba(14,19,32,0.45)] ring-1 ring-black/10">
        <div className="flex h-9 items-center gap-2 border-b border-black/10 px-3">
          <span className="flex gap-[6px]" aria-hidden>
            <i className="size-2.5 rounded-full bg-[#ff5f57]" />
            <i className="size-2.5 rounded-full bg-[#febc2e]" />
            <i className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="flex-1 pr-8 text-center text-[12px] font-medium">Storage</span>
        </div>
        <div className="px-5 py-6">
          <p className="font-serif text-5xl tracking-[-0.04em]">2.4 TB</p>
          <p className="mt-1 flex items-center gap-2 text-sm text-[#4c5563]">
            <CoveMark className="size-4 text-cove" />
            on Cove · Family
          </p>
          <div className="mt-6">
            <div className="flex justify-between text-[11px] text-[#6e6e73]">
              <span>MacBook Air · 256 GB</span>
              <span>Full</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#e5e5ea]">
              <div className="h-full w-full rounded-full bg-[#ff3b30]" />
            </div>
            <div className="mt-3 flex justify-between text-[11px] text-[#6e6e73]">
              <span>Cove</span>
              <span>2.4 TB in the cloud</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#e5e5ea]">
              <div className="h-full w-[70%] rounded-full bg-[#0e6b56]" />
            </div>
          </div>
          <p className="mt-4 text-[12px] text-[#6e6e73]">Past 50 TB, the same setup becomes Mt. Mtn.</p>
        </div>
      </div>
    </section>
  );
}
