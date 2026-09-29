import Link from "next/link";
import type { JournalPost } from "@/lib/journal";
import { formatJournalDate } from "@/lib/journal";

export function JournalBreadcrumbs({ post }: { post: JournalPost }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/journal" className="hover:text-foreground">
            Journal
          </Link>
        </li>
        <li aria-hidden className="text-foreground/30">
          /
        </li>
        <li>
          <Link
            href={`/journal?category=${encodeURIComponent(post.category)}`}
            className="hover:text-foreground"
          >
            {post.category}
          </Link>
        </li>
        <li aria-hidden className="text-foreground/30">
          /
        </li>
        <li className="max-w-[18rem] truncate text-foreground/70 normal-case tracking-normal">
          {post.title}
        </li>
      </ol>
    </nav>
  );
}

export function JournalByline({ post }: { post: JournalPost }) {
  const published = formatJournalDate(post.publishedAt);
  const updated = formatJournalDate(post.updatedAt);
  const showUpdated = post.updatedAt !== post.publishedAt;

  return (
    <div className="grid gap-4 border-y border-foreground/20 py-4 sm:grid-cols-[1fr_auto] sm:items-end">
      <div>
        <p className="font-mono text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
          Written by
        </p>
        <p className="mt-1 font-serif text-2xl tracking-[-0.02em]">{post.author}</p>
        {post.dateline ? (
          <p className="mt-1 text-sm text-muted-foreground">{post.dateline}</p>
        ) : null}
      </div>
      <dl className="grid gap-1 font-mono text-[0.68rem] tracking-[0.08em] text-muted-foreground uppercase sm:text-right">
        <div className="flex flex-wrap gap-x-2 sm:justify-end">
          <dt className="text-foreground/45">Published</dt>
          <dd className="text-foreground/80 normal-case tracking-normal">{published}</dd>
        </div>
        {showUpdated ? (
          <div className="flex flex-wrap gap-x-2 sm:justify-end">
            <dt className="text-foreground/45">Updated</dt>
            <dd className="text-foreground/80 normal-case tracking-normal">{updated}</dd>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-x-2 sm:justify-end">
          <dt className="text-foreground/45">Time to read</dt>
          <dd className="text-cove normal-case tracking-normal">
            {post.readingMinutes} min · {post.wordCount} words
          </dd>
        </div>
      </dl>
    </div>
  );
}
