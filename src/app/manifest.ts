import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cove | a dedicated drive for your Mac",
    short_name: "Cove",
    description:
      "A dedicated cloud drive that mounts on your Mac in one click. Crafted by NOAM Co.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f3efe6",
    theme_color: "#f3efe6",
    lang: "en-GB",
    icons: [
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
