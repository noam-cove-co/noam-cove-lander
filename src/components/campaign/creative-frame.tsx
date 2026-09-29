import Image from "next/image";
import type { CreativeSpec, CreativeTone } from "@/config/campaigns";
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
};

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
      <p
        className="font-serif tracking-[-0.035em] text-balance"
        style={{ color, fontSize: size, lineHeight: 0.98 }}
      >
        {text}
      </p>
    );
  }
  const [before, after] = text.split(accent);
  return (
    <p
      className="font-serif tracking-[-0.035em] text-balance"
      style={{ color, fontSize: size, lineHeight: 0.98 }}
    >
      {before}
      <span style={{ color: accentColor }}>{accent}</span>
      {after}
    </p>
  );
}

export function CreativeFrame({
  creative,
  className,
  markSrc = "/brand/cove-mark.png",
}: {
  creative: CreativeSpec;
  className?: string;
  markSrc?: string;
}) {
  const tone = tones[creative.tone];
  const tall = creative.height / creative.width >= 1.2;
  const story = creative.format === "instagram-story";
  const square = creative.width === creative.height;
  const headlineSize = story ? 92 : tall ? 78 : square ? 68 : 58;
  const pad = story ? 72 : tall ? 64 : 56;
  const mark = story ? 56 : 48;

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
      {/* Quiet print texture — not decorative noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            creative.tone === "ink"
              ? "radial-gradient(90% 70% at 100% 0%, rgba(61,206,160,0.12), transparent 55%)"
              : creative.tone === "mist"
                ? "radial-gradient(80% 60% at 0% 100%, rgba(14,107,86,0.1), transparent 50%)"
                : "radial-gradient(70% 50% at 100% 0%, rgba(14,107,86,0.05), transparent 55%)",
        }}
      />

      <div className="relative flex h-full flex-col justify-between">
        <header className="flex items-center gap-3">
          <Image
            src={markSrc}
            alt=""
            width={mark}
            height={mark}
            className="size-[var(--mark)]"
            style={{ width: mark, height: mark }}
            unoptimized
          />
          <div className="flex items-baseline gap-2 leading-none">
            <span
              className="font-serif tracking-[-0.04em]"
              style={{ fontSize: story ? 34 : 28 }}
            >
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

        <div className="flex max-w-[92%] flex-col gap-5">
          <div
            aria-hidden
            style={{
              width: 48,
              height: 1,
              background: tone.rule,
            }}
          />
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
              style={{
                fontSize: story ? 56 : tall ? 44 : 36,
                lineHeight: 1.05,
                color: tone.fg,
                opacity: 0.92,
              }}
            >
              {creative.line}
            </p>
          ) : null}
          {creative.support ? (
            <p
              className="max-w-[34ch] font-sans"
              style={{
                fontSize: story ? 24 : 20,
                lineHeight: 1.35,
                color: tone.muted,
              }}
            >
              {creative.support}
            </p>
          ) : null}
        </div>

        <footer className="flex items-end justify-between gap-6">
          <p
            className="font-sans tracking-[0.18em] uppercase"
            style={{ fontSize: 12, color: tone.muted }}
          >
            {creative.cue ?? "Cove"}
          </p>
          <p
            className="font-sans"
            style={{ fontSize: 12, color: tone.muted, letterSpacing: "0.04em" }}
          >
            NOAM Co.
          </p>
        </footer>
      </div>
    </article>
  );
}
