import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JournalMasthead } from "@/components/journal/masthead";
import {
  formatJournalDate,
  getAllJournalPosts,
  isJournalPublic,
  type JournalCategory,
} from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "The Cove Journal: press notes, product essays, and studio dispatches from NOAM Co. in Yorkshire.",
  alternates: { canonical: "/journal" },
  robots: { index: false, follow: false },
};

const CATEGORY_ORDER: JournalCategory[] = ["Press", "Product", "Studio", "Notes"];

export default async function JournalIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  if (!isJournalPublic()) notFound();

  const { category: rawCategory } = await searchParams;
  const posts = getAllJournalPosts();
  const activeCategory = CATEGORY_ORDER.find((item) => item === rawCategory);
  const filtered = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;
  const [lead, ...rest] = filtered;
  const editionDate = posts[0]?.publishedAt;

  return (
    <main className="journal-sheet relative overflow-hidden">
      <div className="journal-newsprint pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />
      <div className="relative mx-auto w-full max-w-5xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14 sm:pb-28">
        <JournalMasthead editionDate={editionDate} />

        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-foreground/15 pb-4">
          <Link
            href="/journal"
            className={
              !activeCategory
                ? "bg-foreground px-3 py-1 font-mono text-[0.65rem] tracking-[0.16em] text-background uppercase"
                : "px-3 py-1 font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase hover:text-foreground"
            }
          >
            All editions
          </Link>
          {CATEGORY_ORDER.map((category) => {
            const count = posts.filter((post) => post.category === category).length;
            if (!count) return null;
            const active = activeCategory === category;
            return (
              <Link
                key={category}
                href={`/journal?category=${encodeURIComponent(category)}`}
                className={
                  active
                    ? "bg-cove px-3 py-1 font-mono text-[0.65rem] tracking-[0.16em] text-white uppercase"
                    : "px-3 py-1 font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase hover:text-foreground"
                }
              >
                {category}
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 border border-dashed border-foreground/20 px-6 py-16 text-center">
            <p className="font-serif text-3xl tracking-[-0.03em]">No copy on the wire.</p>
            <p className="mt-3 text-muted-foreground">
              Drop a Markdown file in <code className="font-mono text-sm">content/journal/</code> with{" "}
              <code className="font-mono text-sm">status: published</code>.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:gap-12">
            {lead ? (
              <article className="journal-lead relative border-b border-foreground/20 pb-10 lg:border-b-0 lg:border-r lg:pr-10 lg:pb-0">
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-cove uppercase">
                  {lead.category} · Lead
                </p>
                <h1 className="mt-3 font-serif text-4xl leading-[0.98] tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
                  <Link href={`/journal/${lead.slug}`} className="hover:text-cove">
                    {lead.title}
                  </Link>
                </h1>
                {lead.dek ? (
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{lead.dek}</p>
                ) : null}
                <p className="mt-6 font-mono text-[0.68rem] tracking-[0.1em] text-muted-foreground uppercase">
                  Written by {lead.author}
                  <span className="mx-2 text-foreground/25">·</span>
                  {formatJournalDate(lead.publishedAt)}
                  <span className="mx-2 text-foreground/25">·</span>
                  {lead.readingMinutes} min read
                </p>
                <Link
                  href={`/journal/${lead.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <span className="border-b border-foreground/40 pb-px">Continue reading</span>
                  <span aria-hidden className="text-cove">
                    →
                  </span>
                </Link>
              </article>
            ) : null}

            <div className="grid content-start gap-0">
              <p className="mb-4 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
                Also in this edition
              </p>
              {rest.length === 0 && lead ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  More dispatches arrive as the beta opens. Meanwhile, the lead story is the whole front page.
                </p>
              ) : null}
              {rest.map((post, index) => (
                <article
                  key={post.slug}
                  className={
                    index === 0
                      ? "border-t border-foreground/15 pt-5"
                      : "mt-5 border-t border-foreground/15 pt-5"
                  }
                >
                  <p className="font-mono text-[0.62rem] tracking-[0.16em] text-cove uppercase">
                    {post.category}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl leading-tight tracking-[-0.03em]">
                    <Link href={`/journal/${post.slug}`} className="hover:text-cove">
                      {post.title}
                    </Link>
                  </h2>
                  {post.dek ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.dek}</p>
                  ) : null}
                  <p className="mt-3 font-mono text-[0.62rem] tracking-[0.08em] text-muted-foreground uppercase">
                    {formatJournalDate(post.publishedAt)} · {post.readingMinutes} min
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}

        <aside className="journal-classifieds mt-16 border-2 border-foreground/15 px-5 py-6 sm:px-8">
          <p className="font-mono text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
            Classifieds
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            <p className="text-sm leading-relaxed">
              <span className="font-serif text-lg">Wanted:</span> Macs that stay light while the libraries get loud.
            </p>
            <p className="text-sm leading-relaxed">
              <span className="font-serif text-lg">Found:</span> A cloud drive that shows up in Finder like it belongs there.
            </p>
            <p className="text-sm leading-relaxed">
              <span className="font-serif text-lg">Notice:</span> Private beta seats open from the{" "}
              <Link href="/land/join-the-list" className="underline decoration-cove/50 underline-offset-2">
                waitlist
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
