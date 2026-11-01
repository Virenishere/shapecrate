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
            "radial-gradient(circle at 80% 20%, rgba(98, 93, 232, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(199, 243, 107, 0.15) 0%, transparent 45%)",
          color: "#f5f7f4",
          padding: "60px 70px",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header: Shapecrate branding + category pill */}
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
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            <span>{category}</span>
          </div>
        </div>

        {/* Center: Component Title, Description, and Tags */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <h1
            style={{
              fontSize: 68,
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
              fontSize: 24,
              color: "#b6bcb8",
              lineHeight: 1.45,
              maxWidth: "920px",
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
              marginTop: "8px",
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
                  fontSize: 16,
                  color: "#c7f36b",
                  fontWeight: 600,
                }}
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Copy info and URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #303531",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <span style={{ fontSize: 18, color: "#818982" }}>
            shapecrate.vercel.app/components/{id}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#f5f7f4",
              fontSize: 18,
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

