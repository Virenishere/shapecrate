import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/virenishere/shapecrate",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "shapecrate-web",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ stars: 0 }, { status: 200 });
    }

    const data = await res.json();
    const stars = typeof data?.stargazers_count === "number" ? data.stargazers_count : 0;

    return NextResponse.json(
      { stars },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json({ stars: 0 }, { status: 200 });
  }
}

