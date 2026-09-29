import fs from "node:fs";
import path from "node:path";
import { site } from "@/config/site";

export type JournalCategory = "Press" | "Product" | "Studio" | "Notes";
export type JournalStatus = "published" | "draft";

/** When false, /journal is 404 and omitted from nav, sitemap, and robots allow. */
export function isJournalPublic() {
  return site.journalPublic === true;
}

export type JournalPostMeta = {
  title: string;
  slug: string;
  status: JournalStatus;
  category: JournalCategory;
  publishedAt: string;
  updatedAt: string;
  author: string;
  dek: string;
  dateline?: string;
};

export type JournalPost = JournalPostMeta & {
  body: string;
  readingMinutes: number;
  wordCount: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content/journal");
const CATEGORIES: JournalCategory[] = ["Press", "Product", "Studio", "Notes"];

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const trimmed = raw.replace(/^\uFEFF/, "");
  if (!trimmed.startsWith("---\n")) {
    return { meta: {}, body: trimmed.trim() };
  }
  const end = trimmed.indexOf("\n---\n", 4);
  if (end === -1) {
    return { meta: {}, body: trimmed.trim() };
  }
  const matter = trimmed.slice(4, end);
  const body = trimmed.slice(end + 5).trim();
  const meta: Record<string, string> = {};
  for (const line of matter.split("\n")) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9_]*)\s*:\s*(.*)$/);
    if (!match) continue;
    meta[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body };
}

function wordCount(text: string) {
  const words = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`\[\]()!-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  return words.length;
}

function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / 220));
}

function isCategory(value: string): value is JournalCategory {
  return CATEGORIES.includes(value as JournalCategory);
}

function toPost(filename: string, raw: string): JournalPost | null {
  const { meta, body } = parseFrontmatter(raw);
  const slug = meta.slug || filename.replace(/\.md$/, "");
  const title = meta.title;
  if (!title || !slug || filename === "README.md") return null;

  const status = meta.status === "draft" ? "draft" : "published";
  const category = isCategory(meta.category) ? meta.category : "Notes";
  const publishedAt = meta.publishedAt || meta.updatedAt || "1970-01-01";
  const updatedAt = meta.updatedAt || publishedAt;
  const words = wordCount(body);

  return {
    title,
    slug,
    status,
    category,
    publishedAt,
    updatedAt,
    author: meta.author || "NOAM Co.",
    dek: meta.dek || "",
    dateline: meta.dateline || undefined,
    body,
    wordCount: words,
    readingMinutes: readingMinutes(words),
  };
}

export function getAllJournalPosts(options?: { includeDrafts?: boolean }): JournalPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((name) => name.endsWith(".md"));
  const posts = files
    .map((name) => {
      try {
        return toPost(name, fs.readFileSync(path.join(CONTENT_DIR, name), "utf8"));
      } catch {
        return null;
      }
    })
    .filter((post): post is JournalPost => Boolean(post))
    .filter((post) => options?.includeDrafts || post.status === "published")
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0));
  return posts;
}

export function getJournalPost(slug: string): JournalPost | null {
  return getAllJournalPosts({ includeDrafts: true }).find((post) => post.slug === slug) ?? null;
}

export function formatJournalDate(iso: string) {
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatEditionDate(iso: string) {
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Tiny Markdown → React-friendly blocks (headings, p, quotes, links, emphasis). */
export type MdBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; lines: string[] };

export function parseMarkdownBlocks(markdown: string): MdBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MdBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i += 1;
      continue;
    }
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push({ type: "quote", lines: quoteLines });
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith("#") && !lines[i].startsWith(">")) {
      para.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }

  return blocks;
}
