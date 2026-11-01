import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Shapecrate — Free HTML, CSS & Tailwind UI Components";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#111312",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(199, 243, 107, 0.18) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(98, 93, 232, 0.25) 0%, transparent 50%)",
          color: "#f5f7f4",
          padding: "60px 70px",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header: Brand Logo & Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 1155 1000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m577.3 0 577.4 1000H0z" fill="#ffffff" />
            </svg>
            <span
              style={{
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#f5f7f4",
              }}
            >
              shapecrate
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(199, 243, 107, 0.15)",
              border: "1px solid rgba(199, 243, 107, 0.35)",
              color: "#c7f36b",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            <span>Free &amp; Open Source</span>
          </div>
        </div>

        {/* Center Main Content: Large Headline & Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Beautiful UI,</span>
            <span style={{ color: "#918df4" }}>without the busywork.</span>
          </div>

          <p
            style={{
              fontSize: 26,
              color: "#b6bcb8",
              lineHeight: 1.4,
              maxWidth: "880px",
              margin: 0,
            }}
          >
            Free, copy-paste building blocks made with plain HTML and CSS for modern
            web apps. No installs. No lock-in.
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            borderTop: "1px solid #303531",
            paddingTop: "28px",
          }}
        >
          {[
            "HTML + Modern CSS",
            "Tailwind Ready",
            "Zero Dependencies",
            "MIT Licensed",
          ].map((badge) => (
            <div
              key={badge}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                borderRadius: "12px",
                backgroundColor: "#181b19",
                border: "1px solid #303531",
                fontSize: 16,
                color: "#b6bcb8",
                fontWeight: 500,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

