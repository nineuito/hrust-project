import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ff5a1f",
          color: "#fdfcf7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 140,
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: "-0.06em",
          position: "relative",
        }}
      >
        <div style={{ lineHeight: 1, display: "flex", alignItems: "center" }}>
          Х
          <span
            style={{
              width: 16,
              height: 16,
              background: "#ffd93d",
              borderRadius: 4,
              marginLeft: 6,
              alignSelf: "flex-end",
              marginBottom: 22,
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
