import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JournalBreadcrumbs, JournalByline } from "@/components/journal/article-chrome";
import { JournalMasthead } from "@/components/journal/masthead";
import { JournalMdBody } from "@/components/journal/md-body";
import { ReadingProgress } from "@/components/journal/reading-progress";
import { getAllJournalPosts, getJournalPost } from "@/lib/journal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllJournalPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post || post.status !== "published") {
    return { title: "Journal" };
  }
  return {
    title: post.title,
    description: post.dek || post.title,
    authors: [{ name: post.author }],
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.dek || post.title,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: [post.category],
    },
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post || post.status !== "published") notFound();

  const siblings = getAllJournalPosts().filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <main className="journal-sheet relative overflow-hidden">
      <div className="journal-newsprint pointer-events-none absolute inset-0 opacity-[0.28]" aria-hidden />
      <ReadingProgress targetId="journal-article" />
      <div className="relative mx-auto w-full max-w-3xl px-4 pt-8 pb-20 sm:px-6 sm:pt-12 sm:pb-28">
        <JournalMasthead editionDate={post.publishedAt} compact />
        <div className="mt-6">
          <JournalBreadcrumbs post={post} />
        </div>

        <header className="mt-8">
          <p className="font-mono text-[0.68rem] tracking-[0.22em] text-cove uppercase">
            {post.category}
            {post.dateline ? ` · ${post.dateline}` : ""}
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-[0.98] tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          {post.dek ? (
            <p className="mt-5 max-w-2xl border-l-2 border-cove/40 pl-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {post.dek}
            </p>
          ) : null}
          <div className="mt-8">
            <JournalByline post={post} />
          </div>
        </header>

        <article id="journal-article" className="mt-10">
          <JournalMdBody markdown={post.body} dropCap />
        </article>

        <footer className="mt-16 border-t-2 border-foreground pt-8">
          <p className="font-mono text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
            End of article · Page still turns
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <Link href="/journal" className="inline-flex items-center gap-2 text-sm font-medium">
              <span aria-hidden>←</span>
              <span className="border-b border-foreground/40 pb-px">Back to the Journal</span>
            </Link>
            <Link
              href="/land/join-the-list"
              className="inline-flex items-center gap-2 text-sm font-medium text-cove"
            >
              <span className="border-b border-cove/50 pb-px">Join the waitlist</span>
              <span aria-hidden>→</span>
            </Link>
          </div>

          {siblings.length ? (
            <div className="mt-12 grid gap-6 border-t border-foreground/15 pt-8 sm:grid-cols-2">
              {siblings.map((item) => (
                <Link key={item.slug} href={`/journal/${item.slug}`} className="group block">
                  <p className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
                    {item.category}
                  </p>
                  <p className="mt-2 font-serif text-xl tracking-[-0.02em] group-hover:text-cove">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          ) : null}
        </footer>
      </div>
    </main>
  );
}
