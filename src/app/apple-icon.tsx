import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e6b56",
        }}
      >
        <div
          style={{
            width: 104,
            height: 104,
            borderRadius: 52,
            border: "10px solid #f3efe6",
            borderRightColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              background: "#f3efe6",
              marginRight: 16,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
