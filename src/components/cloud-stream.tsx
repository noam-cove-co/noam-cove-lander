import { CoveMark } from "@/components/brand";

const rising = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const falling = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export function CloudStream() {
  return (
    <section
      className="relative mx-auto mb-6 h-72 w-full max-w-3xl overflow-hidden"
      aria-label="Files go up to the cloud. The drive comes back down onto the Mac."
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-8 bottom-8"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(96,165,250,0.18), transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(14,107,86,0.16), transparent 50%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 288" fill="none" aria-hidden>
        <path
          d="M268 226C260 168 258 120 272 70"
          stroke="url(#cove-up)"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="stream-dash"
        />
        <path
          d="M292 226C286 170 284 122 296 70"
          stroke="url(#cove-up)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="stream-dash"
          style={{ animationDelay: "-0.6s" }}
        />
        <path
          d="M348 70C356 122 360 170 352 226"
          stroke="url(#cove-down)"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="stream-dash stream-dash-reverse"
        />
        <path
          d="M372 70C382 124 384 172 376 226"
          stroke="url(#cove-down)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="stream-dash stream-dash-reverse"
          style={{ animationDelay: "-0.8s" }}
        />
        <defs>
          <linearGradient id="cove-up" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#93c5fd" stopOpacity="0" />
            <stop offset="0.45" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#dbeafe" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="cove-down" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#bbf7d0" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#0e6b56" />
            <stop offset="1" stopColor="#86efac" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute top-2 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <CloudGlyph />
        <p className="mt-1 text-[11px] tracking-[0.16em] text-muted-foreground uppercase">The cloud</p>
      </div>
      <p className="absolute top-[42%] left-[8%] text-[11px] tracking-[0.14em] text-[#3b82f6]/80 uppercase">To the cloud</p>
      <p className="absolute top-[42%] right-[8%] text-[11px] tracking-[0.14em] text-cove/80 uppercase">Onto the Mac</p>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <CoveMark className="size-8 text-cove" />
        <p className="mt-1 text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Your Mac</p>
      </div>

      {rising.map((i) => (
        <span
          key={`rise-${i}`}
          className="stream-rise"
          style={{
            left: `calc(46% - ${(i % 4) * 16}px)`,
            animationDelay: `${i * 0.32}s`,
            animationDuration: `${3.1 + (i % 3) * 0.35}s`,
          }}
        />
      ))}
      {falling.map((i) => (
        <span
          key={`fall-${i}`}
          className="stream-fall"
          style={{
            left: `calc(52% + ${(i % 4) * 16}px)`,
            animationDelay: `${i * 0.36}s`,
            animationDuration: `${3.3 + (i % 3) * 0.3}s`,
          }}
        />
      ))}
    </section>
  );
}

function CloudGlyph() {
  return (
    <svg viewBox="0 0 64 40" className="h-8 w-12 text-[#3b82f6]" aria-hidden>
      <path
        d="M18 32h28a10 10 0 0 0 1.2-19.9A14 14 0 0 0 20.2 16 8.5 8.5 0 0 0 18 32Z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
