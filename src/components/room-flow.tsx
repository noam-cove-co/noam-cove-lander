"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { CoveMark, NoamSeal } from "@/components/brand";
import { Glyph } from "@/components/mac-window";
import { cn } from "cn";

const { room } = site;
const MOUNTAIN_GB = room.mountainTb * 1000;
const CLIMB_GB = room.climbTb * 1000;
const RULER_MIN = 32;
const RULER_MAX = 200000;

type Desk = (typeof room.desks)[number];

function formatGb(gb: number) {
  if (gb >= 1_000_000) return `${trim(gb / 1_000_000)} PB`;
  if (gb >= 1000) return `${trim(gb / 1000)} TB`;
  return `${Math.round(gb)} GB`;
}

function trim(value: number) {
  if (value >= 10) return String(Math.round(value));
  const tenths = Math.round(value * 10) / 10;
  return String(tenths);
}

function rulerPos(gb: number) {
  const value = Math.max(gb, RULER_MIN);
  const t = Math.log(value / RULER_MIN) / Math.log(RULER_MAX / RULER_MIN);
  return Math.min(1, Math.max(0, t));
}

function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export function RoomFlow() {
  const [step, setStep] = useState(0);
  const [deskId, setDeskId] = useState<string | null>(null);
  const [macId, setMacId] = useState(room.macs[0].id);
  const [picks, setPicks] = useState<Record<string, number[]>>({});
  const desk = room.desks.find((item) => item.id === deskId) ?? null;
  const mac = room.macs.find((item) => item.id === macId) ?? room.macs[0];
  const indexes = desk ? (picks[desk.id] ?? desk.defaults) : [];
  const workGb = desk ? desk.sliders.reduce((sum, slider, index) => sum + slider.stops[indexes[index]].gb, 0) : 0;
  const mountain = workGb >= MOUNTAIN_GB;
  const climb = workGb >= CLIMB_GB && !mountain;
  const freeGb = Math.max(0, mac.gb - room.systemGb);
  const shortGb = Math.max(0, workGb - freeGb);

  useLayoutEffect(() => {
    if (mountain) document.documentElement.dataset.tone = "range";
    else delete document.documentElement.dataset.tone;
    return () => {
      delete document.documentElement.dataset.tone;
    };
  }, [mountain]);

  const benefit = useMemo(() => {
    const values = { size: formatGb(workGb), short: formatGb(shortGb), free: formatGb(freeGb) };
    if (mountain) return fill(room.lines.mountain, values);
    if (climb) return fill(room.lines.climb, values);
    if (shortGb > 0) return fill(room.lines.short, values);
    return room.lines.fits;
  }, [mountain, climb, workGb, shortGb, freeGb]);

  function setSlider(index: number, value: number) {
    if (!desk) return;
    const next = [...(picks[desk.id] ?? desk.defaults)];
    next[index] = value;
    setPicks((current) => ({ ...current, [desk.id]: next }));
  }

  function continueFlow() {
    if (step === 0 && !desk) return;
    if (step === 1 && desk) {
      track(site.analytics.events.roomSized, {
        desk: desk.id,
        mac: mac.id,
        gb: workGb,
        mountain,
      });
    }
    setStep((current) => Math.min(room.stages.length - 1, current + 1));
  }

  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
          mountain ? "opacity-0" : "opacity-100",
        )}
        style={{
          background: climb
            ? "radial-gradient(80% 60% at 100% 100%, rgba(10,39,96,0.28), transparent 55%), radial-gradient(70% 50% at 0% 0%, rgba(14,107,86,0.18), transparent 50%), #e7edf2"
            : "radial-gradient(90% 70% at 85% 110%, rgba(14,107,86,0.35), transparent 55%), linear-gradient(165deg, #d5dee6 0%, #efe8df 46%, #c5d4cc 100%)",
        }}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
          mountain ? "opacity-100" : "opacity-0",
        )}
        style={{
          background:
            "radial-gradient(80% 55% at 80% 120%, rgba(61,206,160,0.22), transparent 50%), linear-gradient(180deg, #0a2760 0%, #071a45 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <SetupWindow
          step={step}
          mountain={mountain}
          title={step === 2 ? (mountain ? room.mountainJoin.title : room.join.title) : step === 1 ? "Slide the work." : room.title}
          lede={step === 2 ? (mountain ? room.mountainJoin.body : room.join.body) : step === 1 ? room.lede : "The same cloud drive. The folders change with the desk."}
          canBack={step > 0}
          canNext={step === 0 ? Boolean(desk) : true}
          nextLabel={step === 1 ? (mountain ? "Ask about Mt. Mtn." : "Join the beta") : "Continue"}
          showNext={step < 2}
          onBack={() => setStep((current) => Math.max(0, current - 1))}
          onNext={continueFlow}
        >
          {step === 0 ? <WhoStep deskId={deskId} onPick={setDeskId} /> : null}
          {step === 1 && desk ? (
            <WorkStep
              desk={desk}
              macId={macId}
              indexes={indexes}
              workGb={workGb}
              freeGb={freeGb}
              shortGb={shortGb}
              mountain={mountain}
              climb={climb}
              benefit={benefit}
              onMac={setMacId}
              onSlider={setSlider}
            />
          ) : null}
          {step === 2 && desk ? (
            <ListStep
              desk={desk}
              macLabel={mac.label}
              macId={mac.id}
              workGb={workGb}
              mountain={mountain}
              benefit={benefit}
            />
          ) : null}
        </SetupWindow>
      </div>
    </section>
  );
}

function SetupWindow({
  step,
  mountain,
  title,
  lede,
  children,
  canBack,
  canNext,
  nextLabel,
  showNext,
  onBack,
  onNext,
}: {
  step: number;
  mountain: boolean;
  title: string;
  lede: string;
  children: React.ReactNode;
  canBack: boolean;
  canNext: boolean;
  nextLabel: string;
  showNext: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[12px] shadow-[0_30px_80px_-36px_rgba(14,19,32,0.55)] ring-1 transition-colors duration-700 motion-reduce:transition-none",
        mountain ? "bg-[#0e3274] text-[#f4f7fb] ring-white/15" : "bg-[#f4f5f7] text-[#1d1d1f] ring-black/10",
      )}
    >
      <div className={cn("flex h-11 items-center gap-3 border-b px-4", mountain ? "border-white/10" : "border-black/10")}>
        <span className="flex gap-[6px]" aria-hidden>
          <i className="size-2.5 rounded-full bg-[#ff5f57]" />
          <i className="size-2.5 rounded-full bg-[#febc2e]" />
          <i className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex flex-1 justify-center gap-1.5 pr-10" aria-hidden>
          {room.stages.map((label, index) => (
            <i
              key={label}
              className={cn(
                "size-1.5 rounded-full",
                index === step ? (mountain ? "bg-[#3dcea0]" : "bg-[#0e6b56]") : mountain ? "bg-white/25" : "bg-black/15",
              )}
            />
          ))}
        </span>
      </div>
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <p className={cn("text-[11px] font-medium tracking-[0.18em] uppercase", mountain ? "text-[#3dcea0]" : "text-[#0e6b56]")}>
          {room.stages[step]}
          <span className={cn("ml-2 tracking-normal", mountain ? "text-[#c5d4ea]" : "text-[#6e6e73]")}>
            {step + 1} of {room.stages.length}
          </span>
        </p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-0.03em] text-balance sm:text-5xl">{title}</h1>
        <p className={cn("mt-3 max-w-xl text-base leading-relaxed", mountain ? "text-[#c5d4ea]" : "text-[#4c5563]")}>{lede}</p>
        <div className="mt-8">{children}</div>
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={!canBack}
            className={cn("text-sm disabled:opacity-0", mountain ? "text-[#c5d4ea]" : "text-[#4c5563]")}
          >
            Back
          </button>
          {showNext ? (
            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              className={cn(
                "h-11 rounded-md px-5 text-[15px] font-medium disabled:opacity-40",
                mountain ? "bg-[#3dcea0] text-[#062016]" : "bg-[#0e6b56] text-white",
              )}
            >
              {nextLabel}
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}

function WhoStep({ deskId, onPick }: { deskId: string | null; onPick: (id: string) => void }) {
  return (
    <div role="listbox" aria-label="Who the drive is for" className="overflow-hidden rounded-[10px] bg-white text-[#1d1d1f] ring-1 ring-black/10">
      {room.desks.map((item) => {
        const selected = item.id === deskId;
        return (
          <button
            key={item.id}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onPick(item.id)}
            className={cn("flex w-full items-center gap-4 border-b border-black/8 px-4 py-4 text-left last:border-b-0", selected && "bg-[#0a84ff] text-white")}
          >
            <Glyph kind={item.kind} className="size-12 shrink-0" />
            <span className="min-w-0">
              <span className="flex items-baseline gap-2">
                <span className="font-serif text-2xl tracking-[-0.03em]">{item.label}</span>
                {item.badge ? (
                  <span className={cn("text-[10px] tracking-[0.14em] uppercase", selected ? "text-white/75" : "text-[#6e6e73]")}>
                    {item.badge}
                  </span>
                ) : null}
              </span>
              <span className={cn("mt-1 block text-sm leading-relaxed", selected ? "text-white/85" : "text-[#4c5563]")}>{item.body}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function WorkStep({
  desk,
  macId,
  indexes,
  workGb,
  freeGb,
  shortGb,
  mountain,
  climb,
  benefit,
  onMac,
  onSlider,
}: {
  desk: Desk;
  macId: string;
  indexes: number[];
  workGb: number;
  freeGb: number;
  shortGb: number;
  mountain: boolean;
  climb: boolean;
  benefit: string;
  onMac: (id: string) => void;
  onSlider: (index: number, value: number) => void;
}) {
  const mac = room.macs.find((item) => item.id === macId) ?? room.macs[0];
  const usedPct = Math.min(100, ((room.systemGb + Math.min(workGb, freeGb)) / mac.gb) * 100);
  const macPressure = shortGb > 0 ? 100 : usedPct;
  const iconCount = Math.min(8, Math.max(2, Math.round(Math.log2(workGb + 8)) - 2));

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
      <div>
        <div role="radiogroup" aria-label="Your Mac" className="grid grid-cols-2 gap-x-4 sm:grid-cols-4">
          {room.macs.map((item) => {
            const on = item.id === macId;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => onMac(item.id)}
                className={cn("border-b-2 py-2 text-left", on ? (mountain ? "border-[#3dcea0]" : "border-[#0e6b56]") : "border-transparent")}
              >
                <span className="block text-[13px] font-medium">{macShort[item.id] ?? item.label}</span>
                <span className={cn("block text-[11px] tabular-nums", mountain ? "text-[#c5d4ea]" : "text-[#6e6e73]")}>{formatGb(item.gb)}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-6 grid gap-5">
          {desk.sliders.map((slider, index) => {
            const stop = slider.stops[indexes[index]];
            const pct = (indexes[index] / (slider.stops.length - 1)) * 100;
            const fillColor = mountain ? "#3dcea0" : "#0e6b56";
            const track = mountain ? "rgba(244,247,251,0.18)" : "#e1e3e8";
            return (
              <label key={slider.label} className="block">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-medium">{slider.label}</span>
                  <span className="text-right">
                    <span className="font-serif text-xl tracking-[-0.03em]">{stop.label}</span>
                    <span className={cn("ml-2 text-[12px] tabular-nums", mountain ? "text-[#c5d4ea]" : "text-[#6e6e73]")}>
                      {formatGb(stop.gb)}
                    </span>
                  </span>
                </span>
                <input
                  type="range"
                  className="room-range mt-2 w-full"
                  min={0}
                  max={slider.stops.length - 1}
                  step={1}
                  value={indexes[index]}
                  aria-valuetext={`${stop.label}, ${formatGb(stop.gb)}`}
                  onChange={(event) => onSlider(index, Number(event.target.value))}
                  style={{ background: `linear-gradient(to right, ${fillColor} ${pct}%, ${track} ${pct}%)`, borderRadius: 999 }}
                />
                <span className={cn("mt-1 block text-[11px]", mountain ? "text-[#c5d4ea]" : "text-[#6e6e73]")}>{slider.hint}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={cn("lg:border-l lg:pl-8", mountain ? "lg:border-white/15" : "lg:border-black/10")} aria-live="polite">
        <div className="flex items-end gap-1">
          {Array.from({ length: iconCount }, (_, index) => (
            <Glyph key={index} kind={desk.kind} variant={index} className="size-9" />
          ))}
          <CoveMark className={cn("mb-0.5 ml-1 size-[41px]", mountain ? "text-[#3dcea0]" : "text-[#0e6b56]")} />
        </div>
        <p className="mt-4 font-serif text-6xl tracking-[-0.04em] tabular-nums sm:text-7xl">{formatGb(workGb)}</p>
        <p className={cn("mt-1 text-sm", mountain ? "text-[#c5d4ea]" : "text-[#4c5563]")}>on {mountain ? "Mt. Mtn." : "Cove"} · {desk.volume}</p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed">{benefit}</p>

        <div className="mt-6">
          <div className="flex justify-between text-[11px]">
            <span>This Mac · {formatGb(mac.gb)}</span>
            <span className="tabular-nums">{shortGb > 0 ? "Full" : `${formatGb(freeGb)} free`}</span>
          </div>
          <div className={cn("mt-1.5 h-2 overflow-hidden rounded-full", mountain ? "bg-white/15" : "bg-[#e5e5ea]")}>
            <div
              className={cn("h-full rounded-full transition-[width] duration-300", shortGb > 0 ? "bg-[#ff3b30]" : "bg-[#ff9f0a]")}
              style={{ width: `${macPressure}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[11px]">
            <span>{mountain ? "Mt. Mtn." : "Cove"}</span>
            <span className="tabular-nums">{formatGb(workGb)} in the cloud</span>
          </div>
          <div className={cn("mt-1.5 h-2 overflow-hidden rounded-full", mountain ? "bg-white/15" : "bg-[#e5e5ea]")}>
            <div
              className={cn("h-full rounded-full transition-[width] duration-300", mountain ? "bg-[#3dcea0]" : "bg-[#0e6b56]")}
              style={{ width: `${Math.max(8, rulerPos(Math.max(workGb, 1)) * 100)}%` }}
            />
          </div>
        </div>

        <Ruler workGb={workGb} diskGb={mac.gb} mountain={mountain} climb={climb} />
      </div>
    </div>
  );
}

const macShort: Record<string, string> = {
  air: "Air",
  pro: "Pro",
  studio: "Studio",
  mini: "Mini",
};

function Ruler({ workGb, diskGb, mountain, climb }: { workGb: number; diskGb: number; mountain: boolean; climb: boolean }) {
  const marker = rulerPos(Math.max(workGb, 1));
  const macAt = rulerPos(diskGb);
  const ridgeAt = rulerPos(MOUNTAIN_GB);
  return (
    <div className="mt-7">
      <div className="relative h-4">
        <div className={cn("absolute top-1.5 right-0 left-0 h-1 rounded-full", mountain ? "bg-white/15" : "bg-[#e5e5ea]")} />
        <div
          className={cn("absolute top-1.5 left-0 h-1 rounded-full transition-[width] duration-300", mountain ? "bg-[#3dcea0]" : climb ? "bg-[#12367a]" : "bg-[#0e6b56]")}
          style={{ width: `${marker * 100}%` }}
        />
        <span
          className={cn("absolute top-0 size-3.5 rounded-full bg-white ring-2", mountain ? "ring-[#3dcea0]" : "ring-[#0e6b56]")}
          style={{ left: `calc(${marker * 100}% - 7px)` }}
        />
        <span className={cn("absolute top-0 h-4 w-px", mountain ? "bg-white/40" : "bg-black/25")} style={{ left: `${macAt * 100}%` }} />
        <span className={cn("absolute top-0 h-4 w-px", mountain ? "bg-[#3dcea0]" : "bg-[#0e1320]")} style={{ left: `${ridgeAt * 100}%` }} />
      </div>
      <div className={cn("relative mt-1 h-4 text-[10px]", mountain ? "text-[#c5d4ea]" : "text-[#6e6e73]")}>
        <span className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${macAt * 100}%` }}>
          This Mac
        </span>
        <span
          className={cn("absolute -translate-x-1/2 whitespace-nowrap", mountain ? "text-[#3dcea0]" : "text-[#0e1320]")}
          style={{ left: `${ridgeAt * 100}%` }}
        >
          Mt. Mtn.
        </span>
      </div>
      <p className={cn("mt-1 text-[11px] leading-relaxed", mountain ? "text-[#3dcea0]" : "text-[#6e6e73]")}>{room.cutoff}</p>
    </div>
  );
}

function ListStep({
  desk,
  macLabel,
  macId,
  workGb,
  mountain,
  benefit,
}: {
  desk: Desk;
  macLabel: string;
  macId: string;
  workGb: number;
  mountain: boolean;
  benefit: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [note, setNote] = useState(`About ${formatGb(workGb)}. ${desk.label} desk, on a ${macLabel}.`);
  const [studioRole, setStudioRole] = useState<string>(desk.role);
  const [iosInterest, setIosInterest] = useState(false);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "already">("idle");
  const [message, setMessage] = useState("");
  const summary = `${desk.volume} · ${formatGb(workGb)} · ${macLabel}`;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    if (mountain && organisation.trim().length < 2) {
      setMessage("Add the organisation, so we know whose mountain it is.");
      return;
    }
    setStatus("sending");
    const params = new URLSearchParams(window.location.search);
    const headline = params.get("v") === "b" ? "b" : params.get("v") === "a" ? "a" : site.experiment.active;
    const role = mountain ? "range" : desk.id === "studio" ? studioRole : desk.role;

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role,
          mac: macId,
          iosInterest: mountain ? false : iosInterest,
          company,
          organisation: mountain ? organisation : "",
          note: mountain ? note : `${summary}. ${note}`,
          source: mountain ? "mt-mtn" : "room",
          headline,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; already?: boolean; message?: string };
      if (!response.ok || !data.ok) {
        setStatus("idle");
        setMessage(data.message ?? "The list did not take that. Try again in a moment.");
        return;
      }
      setStatus(data.already ? "already" : "done");
      track(site.analytics.events.waitlistJoined, {
        source: mountain ? "mt-mtn" : "room",
        role,
        gb: workGb,
        mountain,
        already: Boolean(data.already),
      });
    } catch {
      setStatus("idle");
      setMessage("The list did not take that. Try again in a moment.");
    }
  }

  if (status === "done" || status === "already") {
    const copy = mountain ? room.mountainJoin : room.join;
    return (
      <div role="status">
        <p className="font-serif text-4xl tracking-[-0.03em]">{status === "already" ? "Already with us." : copy.done}</p>
        <p className={cn("mt-3 max-w-md text-base leading-relaxed", mountain ? "text-[#c5d4ea]" : "text-[#4c5563]")}>
          {status === "already" ? copy.already : copy.doneBody}
        </p>
      </div>
    );
  }

  const field = cn(
    "w-full border-0 border-b bg-transparent py-3 text-lg outline-none",
    mountain ? "border-white/25 text-[#f4f7fb] placeholder:text-[#93a8c4] focus:border-[#3dcea0]" : "border-black/15 text-[#1d1d1f] placeholder:text-[#8e8e93] focus:border-[#0e6b56]",
  );

  return (
    <form onSubmit={onSubmit} className="grid max-w-lg gap-4">
      <p className={cn("font-mono text-[12px]", mountain ? "text-[#3dcea0]" : "text-[#0e6b56]")}>{summary}</p>
      <p className={cn("text-sm leading-relaxed", mountain ? "text-[#c5d4ea]" : "text-[#4c5563]")}>{benefit}</p>
      <label className="grid gap-1 text-sm">
        Name
        <input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className={field} />
      </label>
      <label className="grid gap-1 text-sm">
        Email
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className={field} />
      </label>
      {mountain ? (
        <>
          <label className="grid gap-1 text-sm">
            Organisation
            <input required value={organisation} onChange={(event) => setOrganisation(event.target.value)} className={field} />
          </label>
          <label className="grid gap-1 text-sm">
            The size of it
            <textarea required rows={3} value={note} onChange={(event) => setNote(event.target.value)} className={cn(field, "resize-none")} />
          </label>
        </>
      ) : desk.id === "studio" ? (
        <fieldset className="grid gap-2">
          <legend className="text-sm">The studio is mostly</legend>
          <div className="flex flex-wrap gap-3">
            {room.studioRoles.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={studioRole === item.id}
                onClick={() => setStudioRole(item.id)}
                className={cn("border-b-2 py-1 text-sm", studioRole === item.id ? "border-[#0e6b56]" : "border-transparent text-[#6e6e73]")}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}
      {mountain ? null : (
        <label className="flex items-start gap-2 text-sm leading-snug">
          <input type="checkbox" className="mt-0.5 size-4 accent-[#0e6b56]" checked={iosInterest} onChange={(event) => setIosInterest(event.target.checked)} />
          {room.join.ios}
        </label>
      )}
      <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={company} onChange={(event) => setCompany(event.target.value)} />
      {message ? (
        <p className="text-sm text-[#ff6b6b]" role="alert">
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "h-12 rounded-md px-5 text-[15px] font-medium disabled:opacity-60",
          mountain ? "bg-[#3dcea0] text-[#062016]" : "bg-[#0e6b56] text-white",
        )}
      >
        {status === "sending" ? "Sending…" : mountain ? "Send the note" : site.campaign.cta}
      </button>
      <p className={cn("flex items-start gap-2 text-xs", mountain ? "text-[#c5d4ea]" : "text-[#6e6e73]")}>
        {mountain ? (
          <>
            <NoamSeal className="mt-0.5 size-5 shrink-0 text-[#c5d4ea]" />
            <span>{room.mountainJoin.fine}</span>
          </>
        ) : (
          room.join.fine
        )}
      </p>
    </form>
  );
}
