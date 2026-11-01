import { ImageResponse } from "next/og";
import { componentsRegistry } from "@shapecrate/components";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return componentsRegistry.map((component) => ({
    id: component.id,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = componentsRegistry.find((c) => c.id === id);

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
              width="34"
              height="34"
              viewBox="0 0 1155 1000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m577.3 0 577.4 1000H0z" fill="#ffffff" />
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
                  backgroundColor: "#625de8",
                  color: "#ffffff",
                  padding: "14px 28px",
                  borderRadius: "14px",
                  fontSize: "17px",
                  fontWeight: 600,
                  boxShadow: "0 10px 25px rgba(98, 93, 232, 0.45)",
                }}
              >
                <span>Start building</span>
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
