import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Cove, a dedicated drive for your Mac. Crafted by NOAM Co.";

export default async function OpenGraphImage() {
  const png = await readFile(join(process.cwd(), "public/brand/cove-mark.png"));
  const src = `data:image/png;base64,${png.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f6f8",
          color: "#17241e",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={src} width={72} height={72} alt="" />
          <div style={{ fontSize: 42, letterSpacing: -1 }}>Cove</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 860 }}>
          <div style={{ fontSize: 72, lineHeight: 0.95, letterSpacing: -2 }}>
            Your own cloud drive, on your Mac in one click.
          </div>
          <div style={{ fontSize: 28, fontFamily: "sans-serif", color: "#5c6a63" }}>
            Private beta. Crafted by NOAM Co. in Yorkshire.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
