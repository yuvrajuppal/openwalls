import { NextRequest, NextResponse } from "next/server";

const BACKEND = "http://localhost:3000";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname.replace("/api/wallpapers", "");
  const search = req.nextUrl.search;
  const url = `${BACKEND}/api/wallpapers${path}${search}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable." }, { status: 502 });
  }
}
