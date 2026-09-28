"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { CoveMark, CraftLine, Wordmark } from "@/components/brand";
import { isRangePath } from "@/components/route-tone";
import { cn } from "cn";

export function SiteFooter() {
  const range = isRangePath(usePathname());
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr] md:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Cove, home">
            <CoveMark className={cn("size-7", range ? "text-primary" : "text-cove")} />
            <Wordmark />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {range
              ? "Cove, at the size of a mountain. A dedicated drive, mounted in one click, kept for an organisation."
              : "Your own cloud drive. It lives in the cloud, and it shows up on your Mac in one click."}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="grid content-start gap-2">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-foreground/80 hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="grid content-start gap-2 text-muted-foreground">
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              {site.email}
            </a>
            <p>{range ? "Mt. Mtn. is the range. Cove is the drive for one Mac." : site.footer.note}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <CraftLine />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NOAM Co.
            <span className="px-2">·</span>
            Photographs from{" "}
            <a href="https://unsplash.com" className="underline-offset-2 hover:underline">
              Unsplash
            </a>
            . App icons from the{" "}
            <a
              href="https://github.com/nweii/macOS_Big_Sur_icons_replacements"
              className="underline-offset-2 hover:underline"
            >
              Big Sur set
            </a>
            . File icons from{" "}
            <a href="https://icons8.com" className="underline-offset-2 hover:underline">
              Icons8
            </a>
            . OpenClaw and GitHub Copilot marks belong to their owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
