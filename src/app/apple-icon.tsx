import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const png = await readFile(join(process.cwd(), "public/brand/cove-mark.png"));
  const src = `data:image/png;base64,${png.toString("base64")}`;
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
        <img src={src} width={148} height={148} alt="" />
      </div>
    ),
    { ...size },
  );
}
