import Image from "next/image";
import { cn } from "cn";

export function CoveMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={cn("relative inline-block size-8 shrink-0", className)} aria-hidden="true">
      <Image
        src="/brand/cove-mark.png"
        alt=""
        fill
        sizes="128px"
        className="object-contain"
        {...(priority ? { priority: true } : { loading: "eager" })}
      />
    </span>
  );
}

/** The earlier arc-and-dot monogram, kept as a formal imprint. */
export function CoveSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true" fill="none">
      <circle cx="16" cy="16" r="14.35" stroke="currentColor" strokeWidth="0.9" />
      <g transform="translate(16 16) scale(0.72) translate(-16 -16)">
        <path
          d="M23.2 7.2a10.2 10.2 0 1 0 0 17.6"
          stroke="currentColor"
          strokeWidth="2.35"
          strokeLinecap="round"
        />
        <circle cx="15.2" cy="16" r="1.7" fill="currentColor" />
      </g>
    </svg>
  );
}

export function NoamSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        fill="currentColor"
        d="M9.1 23.2V8.8h2.15l9.35 11.05V8.8H22.9v14.4h-2.15L11.4 12.15v11.05H9.1z"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif text-[1.65rem] leading-none tracking-[-0.04em]", className)}>
      cove
    </span>
  );
}

export function MtMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true" fill="none">
      <path
        d="M3 25.5 11.2 8.2 16 17.2 20.8 8.2 29 25.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MtWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif leading-none tracking-[-0.04em]", className)}>Mt. Mtn.</span>
  );
}

export function EnglishFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 36"
      className={cn("h-3.5 w-6 overflow-hidden rounded-[2px] shadow-[inset_0_0_0_1px_rgba(23,36,30,0.18)]", className)}
      aria-hidden="true"
    >
      <rect width="60" height="36" fill="#fff" />
      <rect x="24" width="12" height="36" fill="#cf142b" />
      <rect y="12" width="60" height="12" fill="#cf142b" />
    </svg>
  );
}

export function YorkshireRose({ className }: { className?: string }) {
  const outer = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 64 64" className={cn("size-4", className)} aria-hidden="true">
      <g fill="currentColor">
        {outer.map((deg) => (
          <ellipse
            key={`sepal-${deg}`}
            cx="32"
            cy="13"
            rx="4.2"
            ry="9"
            opacity="0.38"
            transform={`rotate(${deg + 36} 32 32)`}
          />
        ))}
        {outer.map((deg) => (
          <ellipse
            key={`petal-${deg}`}
            cx="32"
            cy="15.5"
            rx="6.4"
            ry="13"
            opacity="0.78"
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
        {outer.map((deg) => (
          <ellipse
            key={`inner-${deg}`}
            cx="32"
            cy="21"
            rx="4"
            ry="8"
            transform={`rotate(${deg + 36} 32 32)`}
          />
        ))}
        <circle cx="32" cy="32" r="4.2" />
        <circle cx="32" cy="32" r="1.7" className="fill-background" />
      </g>
    </svg>
  );
}

export function CraftLine({ className }: { className?: string }) {
  return (
    <p className={cn("inline-flex flex-wrap items-center gap-2.5 text-sm text-muted-foreground", className)}>
      <span>Crafted by NOAM Co.</span>
      <span className="inline-flex items-center gap-1.5">
        <EnglishFlag />
        <span className="sr-only">England</span>
      </span>
      <span className="inline-flex items-center text-[#8a908c]">
        <YorkshireRose className="size-[18px]" />
        <span className="sr-only">Yorkshire</span>
      </span>
    </p>
  );
}
