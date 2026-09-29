import type { MetadataRoute } from "next";
import { staysLightSteps } from "@/config/stays-light-funnel";
import { getAllJournalPosts } from "@/lib/journal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cove.will.me.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "/",
    "/why",
    "/how",
    "/demo",
    "/download",
    "/room",
    "/mt",
    "/journal",
    "/land/own-drive",
    "/land/join-the-list",
    "/land/out-of-space",
    "/land/look-familiar",
  ];

  const funnelPaths = staysLightSteps
    .filter((step) => step.id !== "list")
    .map((step) => step.path);

  const journalPaths = getAllJournalPosts().map((post) => `/journal/${post.slug}`);

  return [...staticPaths, ...funnelPaths, ...journalPaths].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : path.startsWith("/journal") ? "weekly" : "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/journal"
          ? 0.8
          : path.startsWith("/journal/")
            ? 0.75
            : path.startsWith("/land/stays-light")
              ? 0.85
              : 0.7,
  }));
}
