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
            "radial-gradient(circle at 90% 10%, rgba(199, 243, 107, 0.15) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(98, 93, 232, 0.22) 0%, transparent 50%)",
          color: "#f5f7f4",
          padding: "50px 60px",
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
              width="38"
              height="38"
              viewBox="0 0 104.44 104.44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M78.69,104.44l-31.08-.19c-15.2-.09-26.89-12.26-26.91-27.95C8.2,72.06-.19,61.02,0,47.46l.25-17.25C-.18,13.96,12.55-.14,29.19,0l27.95.24c17.62.15,30.98,14.8,29.19,33.03,11.05,4.28,18.5,14.07,18.38,26.25l-.17,18.44c-.6,13.61-10.95,26.57-25.85,26.48ZM49.19,31.57l27.46.34c1.19-12.15-7.66-21.75-19.4-21.93l-26.85-.41c-11.28-.17-20.2,8.16-20.37,19.58l-.27,18.32c-.12,7.87,3.93,15.71,11.37,17.98-2.51-18.78,9.57-34.1,28.06-33.87Z"
                fill="#ffffff"
              />
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
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            <span>Free &amp; Open Source</span>
          </div>
        </div>

        {/* Center: 2-Column Split (Text on Left, Visual Mockup Window on Right) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "50px",
            width: "100%",
          }}
        >
          {/* Left Column: Heading and Description */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              flex: "1 1 560px",
              maxWidth: "580px",
            }}
          >
            <div
              style={{
                fontSize: 54,
                fontWeight: 800,
                lineHeight: 1.12,
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
                fontSize: 22,
                color: "#b6bcb8",
                lineHeight: 1.45,
                margin: 0,
              }}
            >
              Free, copy-paste building blocks crafted with plain HTML and CSS
              for modern web apps. No installs. No lock-in.
            </p>
          </div>

          {/* Right Column: Visual UI Mockup Window / Graphic */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "440px",
              height: "280px",
              backgroundColor: "#161817",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Window Title Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "38px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "0 16px",
                gap: "8px",
                backgroundColor: "#1c1f1d",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#ff5f56",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#ffbd2e",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#27c93f",
                }}
              />
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "13px",
                  color: "#818982",
                  fontFamily: "monospace",
                }}
              >
                button.html
              </span>
            </div>

            {/* Code lines */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px 20px 10px",
                gap: "6px",
                fontSize: "13px",
                fontFamily: "monospace",
              }}
            >
              <div style={{ display: "flex", gap: "10px", color: "#818982" }}>
                <span>1</span>
                <span style={{ color: "#c7f36b" }}>
                  &lt;button class=&quot;shape-btn&quot;&gt;
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  paddingLeft: "16px",
                  color: "#ffffff",
                }}
              >
                <span style={{ color: "#818982" }}>2</span>
                <span>Start building</span>
              </div>
              <div style={{ display: "flex", gap: "10px", color: "#818982" }}>
                <span>3</span>
                <span style={{ color: "#c7f36b" }}>&lt;/button&gt;</span>
              </div>
            </div>

            {/* Visual Live Preview Box with Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                margin: "0 16px 16px",
                backgroundColor: "#202421",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#625de8",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  fontWeight: 600,
                  boxShadow: "0 8px 20px rgba(98, 93, 232, 0.4)",
                }}
              >
                <span>Start building</span>
                <span style={{ fontSize: "16px" }}>→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            borderTop: "1px solid #303531",
            paddingTop: "22px",
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
                fontSize: 15,
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
