"use client";

import { usePathname } from "next/navigation";
import { MobileJoinBar, SiteHeader } from "@/components/site-header";
import { PageCloser } from "@/components/page-closer";
import { SiteFooter } from "@/components/site-footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname.startsWith("/internal") || pathname.startsWith("/land");

  if (bare) {
    return (
      <div id="content" className="flex-1">
        {children}
      </div>
    );
  }

  return (
    <>
      <SiteHeader />
      <div id="content" className="flex-1 pb-24 md:pb-0">
        {children}
        <PageCloser />
      </div>
      <SiteFooter />
      <MobileJoinBar />
    </>
  );
}
