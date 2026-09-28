import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3efe6",
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            border: "2.5px solid #0e6b56",
            borderRightColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              background: "#0e6b56",
              marginRight: 4,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
