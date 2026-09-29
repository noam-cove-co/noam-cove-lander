import type { ReactNode } from "react";
import Link from "next/link";
import { parseMarkdownBlocks } from "@/lib/journal";

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-medium text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("*")) {
      nodes.push(
        <em key={key++} className="font-serif italic">
          {token.slice(1, -1)}
        </em>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key++} className="rounded bg-foreground/5 px-1 py-0.5 font-mono text-[0.9em]">
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const href = link[2];
        const label = link[1];
        const external = href.startsWith("http") || href.startsWith("mailto:");
        nodes.push(
          external ? (
            <a
              key={key++}
              href={href}
              className="underline decoration-cove/50 underline-offset-[0.18em] transition-colors hover:decoration-cove"
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {label}
            </a>
          ) : (
            <Link
              key={key++}
              href={href}
              className="underline decoration-cove/50 underline-offset-[0.18em] transition-colors hover:decoration-cove"
            >
              {label}
            </Link>
          ),
        );
      }
    }
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function JournalMdBody({ markdown, dropCap }: { markdown: string; dropCap?: boolean }) {
  const blocks = parseMarkdownBlocks(markdown);
  let firstParagraph = true;

  return (
    <div className="journal-prose">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              className="mt-12 mb-4 font-serif text-3xl tracking-[-0.03em] text-balance sm:text-4xl"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={index}
              className="mt-8 mb-3 font-serif text-2xl tracking-[-0.02em] text-balance"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="journal-pullquote my-10 border-y border-foreground/20 py-6"
            >
              <p className="font-serif text-2xl leading-snug tracking-[-0.02em] text-balance sm:text-3xl">
                {renderInline(block.lines.join(" "))}
              </p>
            </blockquote>
          );
        }

        const useDrop = Boolean(dropCap && firstParagraph);
        firstParagraph = false;
        return (
          <p
            key={index}
            className={
              useDrop
                ? "journal-dropcap mt-0 text-lg leading-[1.75] text-foreground/90 sm:text-xl sm:leading-[1.7]"
                : "mt-5 text-lg leading-[1.75] text-foreground/90 sm:text-xl sm:leading-[1.7]"
            }
          >
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
