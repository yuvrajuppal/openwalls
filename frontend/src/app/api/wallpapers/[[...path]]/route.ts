import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { BASEURL } from "@/utils/baseurl";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname.replace("/api/wallpapers", "");
  const search = req.nextUrl.search;
  const url = `${BASEURL}/api/wallpapers${path}${search}`;

  try {
    const backendRes = await axios.get(url, {
      headers: { cookie: req.headers.get("cookie") || "" },
      validateStatus: () => true,
    });
    return NextResponse.json(backendRes.data, { status: backendRes.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable." }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  const path = req.nextUrl.pathname.replace("/api/wallpapers", "");
  const url = `${BASEURL}/api/wallpapers${path}`;
  const body = await req.json().catch(() => ({}));

  try {
    const backendRes = await axios.post(url, body, {
      headers: { cookie: req.headers.get("cookie") || "" },
      validateStatus: () => true,
    });

    const response = NextResponse.json(backendRes.data, { status: backendRes.status });

    const cookie = backendRes.headers["set-cookie"];
    if (cookie) {
      const cookies = Array.isArray(cookie) ? cookie : [cookie];
      cookies.forEach((c) => response.headers.append("set-cookie", c));
    }

    return response;
  } catch {
    return NextResponse.json({ error: "Backend unavailable." }, { status: 502 });
  }
}
