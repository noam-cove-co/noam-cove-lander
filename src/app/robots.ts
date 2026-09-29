import type { MetadataRoute } from "next";
import { isJournalPublic } from "@/lib/journal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cove.will.me.uk";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/internal/", "/api/"];
  if (!isJournalPublic()) {
    disallow.push("/journal", "/journal/");
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
