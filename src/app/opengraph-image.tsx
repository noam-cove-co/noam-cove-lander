import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Cove, a dedicated drive for your Mac. Crafted by NOAM Co.";

export default function OpenGraphImage() {
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
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              border: "4px solid #0e6b56",
              borderRightColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: "#0e6b56",
                marginRight: 6,
              }}
            />
          </div>
          <div style={{ fontSize: 42, letterSpacing: -1 }}>cove</div>
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
