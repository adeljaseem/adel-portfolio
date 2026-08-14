import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1_200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#05070b",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            left: -180,
            top: -250,
            borderRadius: 999,
            background: "rgba(34, 211, 238, 0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            right: -180,
            top: -80,
            borderRadius: 999,
            background: "rgba(139, 92, 246, 0.08)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "68px 76px",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(103, 232, 249, 0.45)",
                borderRadius: 18,
                background: "rgba(103, 232, 249, 0.08)",
                color: "#a5f3fc",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              AJ
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 26, fontWeight: 700 }}>
                {siteConfig.name}
              </span>
              <span
                style={{
                  marginTop: 6,
                  color: "#94a3b8",
                  fontSize: 15,
                  letterSpacing: 3,
                }}
              >
                SOFTWARE ENGINEER · AI PLATFORMS
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: 990,
              fontSize: 67,
              lineHeight: 1.02,
              letterSpacing: -3.6,
              fontWeight: 700,
            }}
          >
            Building AI-powered platforms and distributed systems.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#a7b4c4",
              fontSize: 18,
            }}
          >
            React · TypeScript · Python · RabbitMQ · gRPC · Self-hosted LLMs
          </div>
        </div>
      </div>
    ),
    size,
  );
}
