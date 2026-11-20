import { ImageResponse } from "next/og";
import { componentsRegistry } from "@shapecrate/components";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  const ids = componentsRegistry.map((component) => ({
    id: component.id,
  }));
  if (!ids.some((c) => c.id === "popup-button")) {
    ids.push({ id: "popup-button" });
  }
  return ids;
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resolvedId = id === "popup-button" ? "popover-button" : id;
  const item = componentsRegistry.find((c) => c.id === resolvedId || c.id === id);

  const title = item ? item.title : "UI Component";
  const category = item ? item.category.toUpperCase() : "COMPONENT";
  const description = item
    ? item.description
    : "Free, copy-paste UI building block made with plain HTML and CSS.";
  const tags = item ? item.tags : ["ui", "component"];

  // Visual preview element depending on component category or id
  const isButton = item?.category === "buttons";
  const isGrid = item?.id === "soft-grid";
  const isSpotlight = item?.id === "radial-spotlight";

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
            "radial-gradient(circle at 85% 15%, rgba(98, 93, 232, 0.28) 0%, transparent 48%), radial-gradient(circle at 15% 85%, rgba(199, 243, 107, 0.15) 0%, transparent 45%)",
          color: "#f5f7f4",
          padding: "50px 60px",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header: Shapecrate branding + Category Pill */}
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
                fontSize: 30,
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
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(145, 141, 244, 0.15)",
              border: "1px solid rgba(145, 141, 244, 0.4)",
              color: "#918df4",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            <span>{category}</span>
          </div>
        </div>

        {/* Center: 2-Column Split (Meta info on left, Visual preview canvas on right) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "50px",
            width: "100%",
          }}
        >
          {/* Left Column: Component Details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              flex: "1 1 540px",
              maxWidth: "580px",
            }}
          >
            <h1
              style={{
                fontSize: 56,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: 22,
                color: "#b6bcb8",
                lineHeight: 1.45,
                margin: 0,
              }}
            >
              {description}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "4px",
              }}
            >
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    backgroundColor: "#202421",
                    border: "1px solid #303531",
                    fontSize: 15,
                    color: "#c7f36b",
                    fontWeight: 600,
                  }}
                >
                  #{tag}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Component Preview Canvas */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "440px",
              height: "280px",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backgroundColor: isGrid || isSpotlight ? "#fbfbfa" : "#1a1d1b",
              backgroundImage: isGrid
                ? "linear-gradient(to right, rgba(99, 102, 241, 0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.28) 1px, transparent 1px)"
                : isSpotlight
                ? "radial-gradient(circle at 50% 50%, rgba(147, 130, 245, 0.75) 0%, rgba(167, 139, 250, 0.4) 30%, rgba(98, 93, 232, 0.15) 50%, transparent 70%)"
                : isButton
                ? "radial-gradient(circle at 50% 50%, rgba(98, 93, 232, 0.15) 0%, transparent 60%)"
                : "radial-gradient(circle at 15% 25%, rgba(52, 211, 153, 0.55) 0%, transparent 48%), radial-gradient(circle at 85% 25%, rgba(96, 165, 250, 0.55) 0%, transparent 48%), radial-gradient(circle at 50% 85%, rgba(167, 139, 250, 0.45) 0%, transparent 55%)",
              backgroundSize: isGrid ? "24px 24px" : "auto",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            {isButton ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor:
                    item?.id === "popover-button" || item?.id === "shimmer-button" || item?.id === "glow-button"
                      ? "#171918"
                      : "#625de8",
                  color: "#ffffff",
                  padding: "14px 28px",
                  borderRadius: "14px",
                  fontSize: "17px",
                  fontWeight: 600,
                  boxShadow:
                    item?.id === "glow-button"
                      ? "0 0 30px rgba(98, 93, 232, 0.65), 0 10px 25px rgba(0, 0, 0, 0.45)"
                      : item?.id === "popover-button" || item?.id === "shimmer-button"
                      ? "0 10px 25px rgba(0, 0, 0, 0.45)"
                      : "0 10px 25px rgba(98, 93, 232, 0.45)",
                  border:
                    item?.id === "shimmer-button" || item?.id === "glow-button"
                      ? "1px solid rgba(255, 255, 255, 0.2)"
                      : "none",
                }}
              >
                <span>
                  {item?.id === "popover-button"
                    ? "Deploy project"
                    : item?.id === "shimmer-button"
                    ? "Explore features"
                    : item?.id === "glow-button"
                    ? "Get started now"
                    : "Start building"}
                </span>
                <span style={{ fontSize: "18px" }}>→</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Bottom Footer: URL & copy action */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #303531",
            paddingTop: "22px",
            width: "100%",
          }}
        >
          <span style={{ fontSize: 16, color: "#818982" }}>
            shapecrate.vercel.app/components/{id}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#f5f7f4",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            <span>Copy-paste HTML &amp; CSS</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
