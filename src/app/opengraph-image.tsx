import { ImageResponse } from "next/og";

export const alt = "ХРУМ. — streetfood kyiv · pizza, rolls, burgers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f0eee9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#1a1a1a",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: "#ff5a1f",
            }}
          />
          STREETFOOD · KYIV
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 260,
              fontWeight: 900,
              letterSpacing: "-0.06em",
              color: "#1a1a1a",
              lineHeight: 0.9,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            ХРУМ<span style={{ color: "#ff5a1f" }}>.</span>
          </div>
          <div
            style={{
              fontSize: 44,
              color: "#555",
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            pizza · rolls · burgers · 30 min delivery
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#1a1a1a",
            }}
          >
            <span
              style={{
                background: "#ffd93d",
                padding: "10px 18px",
                border: "2px solid #1a1a1a",
              }}
            >
              khrum.ua
            </span>
            <span
              style={{
                background: "#ff5a1f",
                color: "#fdfcf7",
                padding: "10px 18px",
                border: "2px solid #1a1a1a",
              }}
            >
              −30% first order
            </span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 20, height: 20, background: "#1a1a1a" }} />
            <span style={{ width: 20, height: 20, background: "#ff5a1f" }} />
            <span style={{ width: 20, height: 20, background: "#ffd93d" }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
