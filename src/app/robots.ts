import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cove.will.me.uk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/internal/", "/api/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow: ["/internal/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
