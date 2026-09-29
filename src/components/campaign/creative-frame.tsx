import Image from "next/image";
import type { CreativeSpec, CreativeTone, LeaderboardRow } from "@/config/campaigns";
import { cn } from "cn";

const tones: Record<
  CreativeTone,
  { bg: string; fg: string; muted: string; rule: string; accent: string }
> = {
  paper: {
    bg: "#f5f6f8",
    fg: "#0e1320",
    muted: "#4c5563",
    rule: "rgba(14,19,32,0.12)",
    accent: "#0e6b56",
  },
  ink: {
    bg: "#0e1320",
    fg: "#f5f6f8",
    muted: "rgba(245,246,248,0.62)",
    rule: "rgba(245,246,248,0.16)",
    accent: "#3dcea0",
  },
  mist: {
    bg: "#e7f3ee",
    fg: "#0e1320",
    muted: "#3d4a45",
    rule: "rgba(14,107,86,0.22)",
    accent: "#0e6b56",
  },
  void: {
    bg: "#050608",
    fg: "#f7f8fa",
    muted: "rgba(247,248,250,0.58)",
    rule: "rgba(247,248,250,0.14)",
    accent: "#3dcea0",
  },
};

const heroWash =
  "radial-gradient(ellipse 90% 55% at 12% 18%, rgba(14, 107, 86, 0.10), transparent 58%), radial-gradient(ellipse 70% 50% at 88% 8%, rgba(96, 140, 180, 0.16), transparent 55%), radial-gradient(ellipse 60% 45% at 70% 70%, rgba(14, 19, 32, 0.04), transparent 60%), linear-gradient(180deg, #eef2f6 0%, #f5f6f8 46%, #f5f6f8 100%)";

const desktopWash =
  "radial-gradient(90% 70% at 80% 110%, rgba(14,107,86,0.55), transparent 55%), radial-gradient(70% 50% at 10% 0%, rgba(232,214,186,0.9), transparent 50%), linear-gradient(165deg, #9eb0c2 0%, #d9c7ae 42%, #6e9084 100%)";

function Headline({
  text,
  accent,
  color,
  accentColor,
  size,
}: {
  text: string;
  accent?: string;
  color: string;
  accentColor: string;
  size: number;
}) {
  if (!accent || !text.includes(accent)) {
    return (
      <p className="font-serif tracking-[-0.035em] text-balance" style={{ color, fontSize: size, lineHeight: 0.98 }}>
        {text}
      </p>
    );
  }
  const [before, after] = text.split(accent);
  return (
    <p className="font-serif tracking-[-0.035em] text-balance" style={{ color, fontSize: size, lineHeight: 0.98 }}>
      {before}
      <span style={{ color: accentColor }}>{accent}</span>
      {after}
    </p>
  );
}

function BrandLockup({
  tone,
  mark,
  wordSize,
  inverted,
}: {
  tone: (typeof tones)[CreativeTone];
  mark: number;
  wordSize: number;
  inverted?: boolean;
}) {
  return (
    <header className="relative z-[1] flex items-center gap-3">
      <Image
        src={inverted ? "/brand/cove-mark.png" : "/brand/cove-mark.png"}
        alt=""
        width={mark}
        height={mark}
        style={{ width: mark, height: mark }}
        unoptimized
      />
      <div className="flex items-baseline gap-2 leading-none">
        <span className="font-serif tracking-[-0.04em]" style={{ fontSize: wordSize, color: tone.fg }}>
          Cove
        </span>
        <span
          className="font-sans font-medium tracking-[0.16em] uppercase"
          style={{ fontSize: 11, color: tone.accent, transform: "translateY(0.35em)" }}
        >
          Beta
        </span>
      </div>
    </header>
  );
}

function TryCta({ label, large }: { label: string; large?: boolean }) {
  return (
    <div className="w-fit shrink-0">
      <span
        className="try-mac-frame inline-flex"
        style={{ animation: "none", borderRadius: large ? 18 : 14, padding: large ? 4 : 3 }}
      >
        <span
          className="try-mac inline-flex items-center justify-center font-sans font-medium whitespace-nowrap"
          style={{
            animation: "none",
            borderRadius: large ? 14 : 11,
            padding: large ? "14px 28px" : "10px 20px",
            fontSize: large ? 22 : 17,
          }}
        >
          {label}
        </span>
      </span>
    </div>
  );
}

function MiniFinder({ compact }: { compact?: boolean }) {
  return (
    <div
      className="overflow-hidden rounded-[14px] shadow-[0_28px_60px_-28px_rgba(14,19,32,0.55)] ring-1 ring-black/15"
      style={{ background: desktopWash }}
    >
      <div className="flex h-7 items-center gap-3 px-3 text-[11px] text-white/90">
        <span className="font-semibold">Finder</span>
        <span className="text-white/70">File</span>
        <span className="text-white/70">Edit</span>
        <span className="ml-auto tabular-nums">Mon 9:41</span>
      </div>
      <div className={cn("px-2 pb-2", compact ? "pt-1" : "pt-2")}>
        <div className="overflow-hidden rounded-[10px] bg-[#f6f6f6] text-[#1d1d1f] shadow-[0_14px_40px_-20px_rgba(0,0,0,0.55)]">
          <div className="flex h-10 items-center gap-2 border-b border-black/10 px-3">
            <span className="flex gap-[6px]" aria-hidden>
              <i className="size-2.5 rounded-full bg-[#ff5f57]" />
              <i className="size-2.5 rounded-full bg-[#febc2e]" />
              <i className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            <p className="ml-1 flex items-center gap-1.5 text-[12px] font-semibold">
              <Image src="/brand/cove-mark.png" alt="" width={14} height={14} unoptimized />
              Family
            </p>
          </div>
          <div className={cn("grid grid-cols-[140px_1fr]", compact ? "min-h-[140px]" : "min-h-[180px]")}>
            <aside className="border-r border-black/8 bg-[#ececee] px-2 py-2 text-[11px]">
              <p className="px-1.5 pt-1 pb-1 text-[10px] font-semibold tracking-[0.04em] text-[#8e8e93] uppercase">
                Locations
              </p>
              <p className="rounded-md px-1.5 py-1 text-[#1d1d1f]/70">Macintosh HD</p>
              <p className="mt-0.5 flex items-center gap-1.5 rounded-md bg-[#0a84ff] px-1.5 py-1 font-medium text-white">
                <Image src="/brand/cove-mark.png" alt="" width={12} height={12} unoptimized />
                Family
              </p>
            </aside>
            <div className="grid grid-cols-3 content-start gap-3 px-3 py-3">
              {["Summer holiday", "School play", "Masters"].map((name) => (
                <div key={name} className="grid justify-items-center gap-1">
                  <span
                    className="relative block size-11"
                    style={{
                      background:
                        "linear-gradient(180deg, #7eb6ff 0%, #3b82f6 45%, #2563eb 100%)",
                      borderRadius: "4px 4px 3px 3px",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute -top-1 left-1 h-2 w-5 rounded-t-[3px]"
                      style={{ background: "#60a5fa" }}
                    />
                  </span>
                  <span className="max-w-[5.5rem] truncate text-center text-[10px] leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-black/10 px-3 py-1.5 text-[10px] text-[#6e6e73]">
            3 items — 2.4 TB in the cloud. Zero KB on this Mac.
          </div>
        </div>
      </div>
    </div>
  );
}

function Leaderboard({
  rows,
  tone,
  compact,
}: {
  rows: LeaderboardRow[];
  tone: (typeof tones)[CreativeTone];
  compact?: boolean;
}) {
  const dark = tone.bg === "#0e1320" || tone.bg === "#050608";
  return (
    <div
      className="w-full overflow-hidden rounded-[14px]"
      style={{
        background: dark ? "rgba(255,255,255,0.04)" : "#fff",
        boxShadow: dark ? "inset 0 0 0 1px rgba(255,255,255,0.1)" : "0 18px 40px -28px rgba(14,19,32,0.4)",
        border: dark ? undefined : "1px solid rgba(14,19,32,0.08)",
      }}
    >
      <div
        className="grid grid-cols-[64px_1fr_88px] gap-2 border-b px-4 py-2.5 font-sans text-[11px] tracking-[0.14em] uppercase"
        style={{
          borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(14,19,32,0.08)",
          color: tone.muted,
        }}
      >
        <span>Rank</span>
        <span>On the list</span>
        <span className="text-right">Invites</span>
      </div>
      {rows.map((row) => (
        <div
          key={`${row.rank}-${row.name}`}
          className="grid grid-cols-[64px_1fr_88px] items-center gap-2 px-4"
          style={{
            minHeight: compact ? 52 : 60,
            background: row.you ? (dark ? "rgba(61,206,160,0.12)" : "rgba(14,107,86,0.08)") : "transparent",
            borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(14,19,32,0.06)"}`,
            color: tone.fg,
          }}
        >
          <span
            className="font-serif tabular-nums tracking-[-0.03em]"
            style={{ fontSize: compact ? 26 : 30, color: row.you ? tone.accent : tone.fg }}
          >
            {String(row.rank).padStart(2, "0")}
          </span>
          <span className="font-sans text-[17px]" style={{ fontWeight: row.you ? 600 : 400 }}>
            {row.name}
            {row.you ? (
              <span className="ml-2 font-sans text-[11px] tracking-[0.14em] uppercase" style={{ color: tone.accent }}>
                You
              </span>
            ) : null}
          </span>
          <span className="text-right font-sans tabular-nums text-[15px]" style={{ color: tone.muted }}>
            {row.invites}
          </span>
        </div>
      ))}
    </div>
  );
}

function Footer({ cue, muted }: { cue?: string; muted: string }) {
  return (
    <footer className="relative z-[1] flex items-end justify-between gap-6">
      <p className="font-sans tracking-[0.18em] uppercase" style={{ fontSize: 12, color: muted }}>
        {cue ?? "Cove"}
      </p>
      <p className="font-sans" style={{ fontSize: 12, color: muted, letterSpacing: "0.04em" }}>
        NOAM Co.
      </p>
    </footer>
  );
}

export function CreativeFrame({
  creative,
  className,
}: {
  creative: CreativeSpec;
  className?: string;
}) {
  const tone = tones[creative.tone];
  const layout = creative.layout ?? "print";
  const tall = creative.height / creative.width >= 1.2;
  const story = creative.format === "instagram-story";
  const square = creative.width === creative.height;
  const wide = creative.height / creative.width < 0.7;
  const headlineSize = story ? 92 : tall ? 72 : square ? 64 : wide ? 52 : 58;
  const pad = story ? 72 : tall ? 56 : 48;
  const mark = story ? 56 : 48;
  const wordSize = story ? 34 : 28;

  if (layout === "void-logo") {
    return (
      <article
        data-creative={creative.id}
        data-format={creative.format}
        className={cn("relative overflow-hidden", className)}
        style={{
          width: creative.width,
          height: creative.height,
          background: "#050608",
          color: tone.fg,
          padding: pad,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 70% 40%, rgba(61,206,160,0.14), transparent 60%), radial-gradient(50% 40% at 20% 80%, rgba(96,140,180,0.1), transparent 55%)",
          }}
        />
        <Image
          src="/brand/cove-icon.png"
          alt=""
          width={920}
          height={920}
          unoptimized
          className="pointer-events-none absolute"
          style={{
            width: Math.round(creative.width * (tall ? 0.92 : 0.72)),
            height: "auto",
            right: tall ? "-8%" : "-6%",
            bottom: tall ? "4%" : "-18%",
            opacity: 0.16,
            filter: "grayscale(0.15) contrast(1.05)",
          }}
        />
        <div className="relative z-[1] flex h-full flex-col justify-between">
          <BrandLockup tone={tone} mark={mark} wordSize={wordSize} />
          <div className="flex max-w-[88%] flex-col gap-4">
            <div aria-hidden style={{ width: 48, height: 1, background: tone.rule }} />
            <Headline text={creative.headline} accent={creative.accent} color={tone.fg} accentColor={tone.accent} size={headlineSize} />
            {creative.line ? (
              <p className="font-serif tracking-[-0.03em]" style={{ fontSize: story ? 52 : 40, lineHeight: 1.05, color: "#d7dde6" }}>
                {creative.line}
              </p>
            ) : null}
            {creative.support ? (
              <p className="max-w-[32ch] font-sans" style={{ fontSize: story ? 24 : 20, lineHeight: 1.35, color: tone.muted }}>
                {creative.support}
              </p>
            ) : null}
          </div>
          <Footer cue={creative.cue} muted={tone.muted} />
        </div>
      </article>
    );
  }

  if (layout === "leaderboard") {
    const board = creative.board ?? [];
    return (
      <article
        data-creative={creative.id}
        data-format={creative.format}
        className={cn("relative overflow-hidden", className)}
        style={{
          width: creative.width,
          height: creative.height,
          background: tone.bg,
          color: tone.fg,
          padding: pad,
        }}
      >
        {creative.tone === "void" ? (
          <Image
            src="/brand/cove-icon.png"
            alt=""
            width={700}
            height={700}
            unoptimized
            className="pointer-events-none absolute"
            style={{ width: "55%", right: "-8%", bottom: "-10%", opacity: 0.1 }}
          />
        ) : null}
        <div className="relative z-[1] flex h-full flex-col justify-between gap-6">
          <BrandLockup tone={tone} mark={mark} wordSize={wordSize} />
          <div className={cn("grid gap-6", wide ? "grid-cols-[1.05fr_0.95fr] items-end" : "content-start")}>
            <div className="flex flex-col gap-3">
              <div aria-hidden style={{ width: 48, height: 1, background: tone.rule }} />
              <Headline
                text={creative.headline}
                accent={creative.accent}
                color={tone.fg}
                accentColor={tone.accent}
                size={wide ? 44 : tall ? 58 : 48}
              />
              {creative.line ? (
                <p className="font-serif" style={{ fontSize: wide ? 30 : 34, lineHeight: 1.05, color: tone.fg }}>
                  {creative.line}
                </p>
              ) : null}
              {creative.support ? (
                <p className="max-w-[34ch] font-sans" style={{ fontSize: 18, lineHeight: 1.35, color: tone.muted }}>
                  {creative.support}
                </p>
              ) : null}
            </div>
            <Leaderboard rows={board} tone={tone} compact={wide || square} />
          </div>
          <Footer cue={creative.cue} muted={tone.muted} />
        </div>
      </article>
    );
  }

  if (layout === "hero-cta") {
    return (
      <article
        data-creative={creative.id}
        data-format={creative.format}
        className={cn("relative overflow-hidden", className)}
        style={{
          width: creative.width,
          height: creative.height,
          background: "#f5f6f8",
          color: "#0e1320",
          padding: pad,
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: heroWash }} />
        <Image
          src="/brand/cove-icon.png"
          alt=""
          width={640}
          height={640}
          unoptimized
          className="pointer-events-none absolute"
          style={{
            width: tall ? "58%" : wide ? "38%" : "46%",
            right: tall ? "6%" : "4%",
            top: tall ? "12%" : "50%",
            transform: tall ? "none" : "translateY(-48%)",
            opacity: 0.95,
          }}
        />
        <div className="relative z-[1] flex h-full flex-col justify-between">
          <BrandLockup tone={tones.paper} mark={mark} wordSize={wordSize} />
          <div className={cn("flex flex-col gap-5", tall ? "max-w-[90%]" : "max-w-[54%]")}>
            <Headline
              text={creative.headline}
              accent={creative.accent}
              color="#0e1320"
              accentColor="#0e6b56"
              size={tall ? 68 : wide ? 48 : 54}
            />
            {creative.support ? (
              <p className="max-w-[32ch] font-sans text-[#4c5563]" style={{ fontSize: 20, lineHeight: 1.35 }}>
                {creative.support}
              </p>
            ) : null}
            <TryCta label={creative.cta ?? "Try on this Mac"} large={tall || square} />
          </div>
          <Footer cue={creative.cue} muted="#4c5563" />
        </div>
      </article>
    );
  }

  if (layout === "product-ui") {
    return (
      <article
        data-creative={creative.id}
        data-format={creative.format}
        className={cn("relative overflow-hidden", className)}
        style={{
          width: creative.width,
          height: creative.height,
          background: "#f5f6f8",
          color: "#0e1320",
          padding: pad,
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: heroWash }} />
        <div className="relative z-[1] flex h-full flex-col justify-between gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <BrandLockup tone={tones.paper} mark={mark} wordSize={wordSize} />
            <TryCta label={creative.cta ?? "Try on this Mac"} />
          </div>
          <div className={cn("grid gap-5", wide ? "grid-cols-[0.9fr_1.1fr] items-center" : "content-start")}>
            <div className="flex flex-col gap-3">
              <Headline
                text={creative.headline}
                accent={creative.accent}
                color="#0e1320"
                accentColor="#0e6b56"
                size={wide ? 40 : tall ? 54 : 44}
              />
              {creative.support ? (
                <p className="max-w-[34ch] font-sans text-[#4c5563]" style={{ fontSize: 18, lineHeight: 1.35 }}>
                  {creative.support}
                </p>
              ) : null}
            </div>
            <MiniFinder compact={wide || !tall} />
          </div>
          <Footer cue={creative.cue} muted="#4c5563" />
        </div>
      </article>
    );
  }

  // Default print layout
  return (
    <article
      data-creative={creative.id}
      data-format={creative.format}
      className={cn("relative overflow-hidden", className)}
      style={{
        width: creative.width,
        height: creative.height,
        background: tone.bg,
        color: tone.fg,
        padding: pad,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            creative.tone === "ink" || creative.tone === "void"
              ? "radial-gradient(90% 70% at 100% 0%, rgba(61,206,160,0.12), transparent 55%)"
              : creative.tone === "mist"
                ? "radial-gradient(80% 60% at 0% 100%, rgba(14,107,86,0.1), transparent 50%)"
                : "radial-gradient(70% 50% at 100% 0%, rgba(14,107,86,0.05), transparent 55%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between">
        <BrandLockup tone={tone} mark={mark} wordSize={wordSize} />
        <div className="flex max-w-[92%] flex-col gap-5">
          <div aria-hidden style={{ width: 48, height: 1, background: tone.rule }} />
          <Headline
            text={creative.headline}
            accent={creative.accent}
            color={tone.fg}
            accentColor={tone.accent}
            size={headlineSize}
          />
          {creative.line ? (
            <p
              className="font-serif tracking-[-0.03em] text-balance"
              style={{ fontSize: story ? 56 : tall ? 44 : 36, lineHeight: 1.05, color: tone.fg, opacity: 0.92 }}
            >
              {creative.line}
            </p>
          ) : null}
          {creative.support ? (
            <p className="max-w-[34ch] font-sans" style={{ fontSize: story ? 24 : 20, lineHeight: 1.35, color: tone.muted }}>
              {creative.support}
            </p>
          ) : null}
        </div>
        <Footer cue={creative.cue} muted={tone.muted} />
      </div>
    </article>
  );
}
