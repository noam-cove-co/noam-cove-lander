import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: {
    default: "Internal · Cove",
    template: "%s · Internal · Cove",
  },
};

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-[#eceef1] text-[#0e1320]">
      <div className="border-b border-foreground/10 bg-paper/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p className="text-[0.72rem] font-medium tracking-[0.18em] text-cove uppercase">
            Internal · Campaign library
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <a href="/internal/campaign" className="hover:text-foreground">
              All campaigns
            </a>
            <a href="/" className="hover:text-foreground">
              Site
            </a>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
