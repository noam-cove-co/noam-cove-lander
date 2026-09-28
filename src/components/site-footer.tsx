import Link from "next/link";
import { site } from "@/config/site";
import { CoveMark, CraftLine, Wordmark } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr] md:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Cove, home">
            <CoveMark className="size-7 text-cove" />
            <Wordmark />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Your own cloud drive. It lives in the cloud, and it shows up on your Mac in one click.
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
            <p>{site.footer.note}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <CraftLine />
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} NOAM Co.</p>
        </div>
      </div>
    </footer>
  );
}
