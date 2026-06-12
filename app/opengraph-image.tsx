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
          backgroundColor: "#171410",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(196,149,106,0.16), transparent 55%)",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#c4956a",
            fontSize: 28,
          }}
        >
          ~$ whoami
        </div>
        <div
          style={{
            marginTop: 24,
            color: "#e3ddd1",
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: "-2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {hero.name.toLowerCase()}
          {/* CSS-drawn terminal caret — emoji/symbol glyphs are unreliable in satori */}
          <div
            style={{
              width: 30,
              height: 64,
              marginLeft: 20,
              backgroundColor: "#c4956a",
              display: "flex",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 24,
            color: "#948c7e",
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
            color: "#7d756a",
            fontSize: 24,
          }}
        >
          <div
            style={{
              width: 56,
              height: 2,
              backgroundColor: "#c4956a",
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
