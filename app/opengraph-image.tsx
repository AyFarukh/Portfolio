import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Farrukh Sultan — Senior Shopify Plus and Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 82px",
          background: "linear-gradient(135deg,#07090d 0%,#0e1422 58%,#10162a 100%)",
          color: "#f7f8fc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 760 }}>
          <div style={{ fontSize: 22, letterSpacing: 5, color: "#8d7cff", marginBottom: 28 }}>
            SENIOR SHOPIFY PLUS · FULL STACK · AI
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.02, letterSpacing: -4, fontWeight: 700 }}>
            Building commerce systems that perform.
          </div>
          <div style={{ fontSize: 28, color: "#aeb7c8", marginTop: 30, lineHeight: 1.45 }}>
            Custom Shopify apps, checkout extensions, headless storefronts and production-grade full-stack platforms.
          </div>
          <div style={{ display: "flex", marginTop: 42, gap: 22, fontSize: 20 }}>
            <span style={{ color: "#49d7c6" }}>Farrukh Sultan</span>
            <span style={{ color: "#6c7586" }}>Lahore · Remote worldwide</span>
          </div>
        </div>
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle at 35% 25%,#765fff,#34298f 45%,#0b1020 78%)",
            border: "1px solid rgba(255,255,255,.15)",
            boxShadow: "0 35px 80px rgba(63,42,170,.5)",
          }}
        >
          <span style={{ fontSize: 150, fontWeight: 700, letterSpacing: -20, color: "#ffffff" }}>FS</span>
        </div>
      </div>
    ),
    size,
  );
}
