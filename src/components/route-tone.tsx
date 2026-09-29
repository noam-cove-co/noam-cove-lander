"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";

export function isRangePath(pathname: string) {
  return pathname === site.range.path || pathname.startsWith(`${site.range.path}/`);
}

const toneScript = `(function(){var p=location.pathname;if(p==="${site.range.path}"||p.indexOf("${site.range.path}/")===0){document.documentElement.dataset.tone="range";}})();`;

export function RouteToneScript() {
  return <script dangerouslySetInnerHTML={{ __html: toneScript }} />;
}

export function RouteTone() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (isRangePath(pathname)) {
      document.documentElement.dataset.tone = "range";
      return;
    }
    if (pathname === "/demo") return;
    delete document.documentElement.dataset.tone;
  }, [pathname]);

  return null;
}
