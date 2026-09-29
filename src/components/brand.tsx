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
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-grid size-8 shrink-0 place-items-center text-current [container-type:size]",
        className,
      )}
    >
      <span className="absolute inset-0 rounded-[25%] shadow-[inset_0_0_0_4.2cqw_currentColor]" />
      <span className="relative flex flex-col items-center text-center font-serif text-[34cqw] leading-[0.8] tracking-[-0.04em]">
        <span>No.</span>
        <span>Co.</span>
      </span>
    </span>
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

const flagFrame =
  "h-3.5 w-6 overflow-hidden rounded-[2px] shadow-[inset_0_0_0_1px_rgba(23,36,30,0.18)]";

export function UnionJack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 36" className={cn(flagFrame, className)} aria-hidden="true">
      <rect width="60" height="36" fill="#012169" />
      <path fill="#fff" d="M7.00 0.00 L0.00 0.00 L0.00 4.20 L53.00 36.00 L60.00 36.00 L60.00 31.80ZM7.00 36.00 L60.00 4.20 L60.00 0.00 L53.00 0.00 L0.00 31.80 L0.00 36.00Z" />
      <path fill="#C8102E" d="M60.00 36.00 L60.00 33.20 L34.66 18.00 L30.00 18.00ZM0.00 0.00 L0.00 2.80 L25.34 18.00 L30.00 18.00ZM0.00 36.00 L4.66 36.00 L30.00 20.80 L30.00 18.00ZM60.00 0.00 L55.34 0.00 L30.00 15.20 L30.00 18.00Z" />
      <path fill="#fff" d="M24.00 0.00 L36.00 0.00 L36.00 36.00 L24.00 36.00ZM0.00 12.00 L60.00 12.00 L60.00 24.00 L0.00 24.00Z" />
      <path fill="#C8102E" d="M26.40 0.00 L33.60 0.00 L33.60 36.00 L26.40 36.00ZM0.00 14.40 L60.00 14.40 L60.00 21.60 L0.00 21.60Z" />
    </svg>
  );
}

export function YorkshireFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 36" className={cn(flagFrame, className)} aria-hidden="true">
      <rect width="60" height="36" fill="#006eb6" />
      <path fill="#fff" transform="translate(30 18)" d="M9.52 -13.11 L3.32 -1.67 L0.91 -0.45 L0.14 -1.01 L0.56 -3.67ZM15.41 5.01 L2.61 2.64 L0.71 0.73 L1.00 -0.17 L3.66 -0.60ZM0.00 16.20 L-1.70 3.30 L-0.48 0.90 L0.48 0.90 L1.70 3.30ZM-15.41 5.01 L-3.66 -0.60 L-1.00 -0.17 L-0.71 0.73 L-2.61 2.64ZM-9.52 -13.11 L-0.56 -3.67 L-0.14 -1.01 L-0.91 -0.45 L-3.32 -1.67ZM4.20 -6.60 L4.06 -5.05 L3.64 -3.60 L2.97 -2.36 L2.10 -1.40 L1.09 -0.80 L0.00 -0.60 L-1.09 -0.80 L-2.10 -1.40 L-2.97 -2.36 L-3.64 -3.60 L-4.06 -5.05 L-4.20 -6.60 L-4.06 -8.15 L-3.64 -9.60 L-2.97 -10.84 L-2.10 -11.80 L-1.09 -12.40 L-0.00 -12.60 L1.09 -12.40 L2.10 -11.80 L2.97 -10.84 L3.64 -9.60 L4.06 -8.15ZM7.57 1.95 L6.05 2.30 L4.55 2.35 L3.16 2.10 L1.98 1.56 L1.10 0.79 L0.57 -0.19 L0.43 -1.28 L0.69 -2.43 L1.32 -3.55 L2.30 -4.57 L3.55 -5.42 L4.98 -6.03 L6.50 -6.38 L8.01 -6.43 L9.39 -6.18 L10.57 -5.64 L11.45 -4.86 L11.98 -3.89 L12.12 -2.80 L11.87 -1.65 L11.23 -0.53 L10.25 0.49 L9.01 1.34ZM0.48 7.81 L-0.32 6.47 L-0.83 5.05 L-1.02 3.65 L-0.87 2.37 L-0.41 1.29 L0.35 0.49 L1.35 0.01 L2.52 -0.10 L3.79 0.16 L5.06 0.77 L6.25 1.70 L7.28 2.87 L8.07 4.21 L8.59 5.63 L8.78 7.03 L8.63 8.31 L8.17 9.39 L7.41 10.19 L6.41 10.67 L5.23 10.78 L3.97 10.52 L2.70 9.90 L1.51 8.98ZM-7.28 2.87 L-6.25 1.70 L-5.06 0.77 L-3.79 0.16 L-2.52 -0.10 L-1.35 0.01 L-0.35 0.49 L0.41 1.29 L0.87 2.37 L1.02 3.65 L0.83 5.05 L0.32 6.47 L-0.48 7.81 L-1.51 8.98 L-2.70 9.90 L-3.97 10.52 L-5.23 10.78 L-6.41 10.67 L-7.41 10.19 L-8.17 9.39 L-8.63 8.31 L-8.78 7.03 L-8.59 5.63 L-8.07 4.21ZM-4.98 -6.03 L-3.55 -5.42 L-2.30 -4.57 L-1.32 -3.55 L-0.69 -2.43 L-0.43 -1.28 L-0.57 -0.19 L-1.10 0.79 L-1.98 1.56 L-3.16 2.10 L-4.55 2.35 L-6.05 2.30 L-7.57 1.95 L-9.01 1.34 L-10.25 0.49 L-11.23 -0.53 L-11.87 -1.65 L-12.12 -2.80 L-11.98 -3.89 L-11.45 -4.86 L-10.57 -5.64 L-9.39 -6.18 L-8.01 -6.43 L-6.50 -6.38ZM2.20 0.00 L1.98 0.95 L1.37 1.72 L0.49 2.14 L-0.49 2.14 L-1.37 1.72 L-1.98 0.95 L-2.20 0.00 L-1.98 -0.95 L-1.37 -1.72 L-0.49 -2.14 L0.49 -2.14 L1.37 -1.72 L1.98 -0.95Z" />
    </svg>
  );
}

export function CraftLine({ className }: { className?: string }) {
  return (
    <p className={cn("inline-flex flex-wrap items-center gap-2.5 text-sm text-muted-foreground", className)}>
      <span>Crafted by NOAM Co.</span>
      <span className="inline-flex items-center gap-1.5">
        <UnionJack />
        <span className="sr-only">United Kingdom</span>
        <YorkshireFlag />
        <span className="sr-only">Yorkshire</span>
      </span>
    </p>
  );
}
