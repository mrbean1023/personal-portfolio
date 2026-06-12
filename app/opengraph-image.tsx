import { ImageResponse } from "next/og";
import { hero, siteMeta } from "@/data/portfolio";

export const alt = siteMeta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card rendered at build time — matches the site's dark theme. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0b0f19",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(59,130,246,0.18), transparent 55%)",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#3b82f6",
            fontSize: 28,
          }}
        >
          ~$ whoami
        </div>
        <div
          style={{
            marginTop: 24,
            color: "#e2e8f0",
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: "-2px",
            display: "flex",
          }}
        >
          {hero.name}
          <span style={{ color: "#3b82f6" }}>.</span>
        </div>
        <div
          style={{
            marginTop: 24,
            color: "#94a3b8",
            fontSize: 32,
            maxWidth: 900,
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Computer Science @ NTU Singapore — full-stack web, enterprise
          automation & fintech.
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#64748b",
            fontSize: 24,
          }}
        >
          <div
            style={{
              width: 56,
              height: 2,
              backgroundColor: "#3b82f6",
              display: "flex",
            }}
          />
          {new URL(siteMeta.url).host}
        </div>
      </div>
    ),
    { ...size },
  );
}
