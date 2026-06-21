import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { BASEURL } from "@/utils/baseurl";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname.replace("/api/wallpapers", "");
  const search = req.nextUrl.search;
  const url = `${BASEURL}/api/wallpapers${path}${search}`;

  try {
    const backendRes = await axios.get(url, { validateStatus: () => true });
    return NextResponse.json(backendRes.data, { status: backendRes.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable." }, { status: 502 });
  }
}
