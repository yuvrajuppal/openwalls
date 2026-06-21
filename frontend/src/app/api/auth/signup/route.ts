import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { BASEURL } from "@/utils/baseurl";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const backendRes = await axios.post(`${BASEURL}/userRoutes/signup`, body, {
    validateStatus: () => true,
  });

  const response = NextResponse.json(backendRes.data, { status: backendRes.status });

  const cookie = backendRes.headers["set-cookie"];
  if (cookie) {
    const cookies = Array.isArray(cookie) ? cookie : [cookie];
    cookies.forEach((c) => response.headers.append("set-cookie", c));
  }

  return response;
}
