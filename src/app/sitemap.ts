import type { MetadataRoute } from "next";
import { staysLightSteps } from "@/config/stays-light-funnel";

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
    "/land/own-drive",
    "/land/join-the-list",
    "/land/out-of-space",
    "/land/look-familiar",
  ];

  const funnelPaths = staysLightSteps
    .filter((step) => step.id !== "list")
    .map((step) => step.path);

  return [...staticPaths, ...funnelPaths].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/land/stays-light") ? 0.85 : 0.7,
  }));
}
