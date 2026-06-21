import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { BASEURL } from "@/utils/baseurl";

export async function GET(req: NextRequest) {
  const backendRes = await axios.get(`${BASEURL}/userRoutes/checkislogin`, {
    headers: { cookie: req.headers.get("cookie") || "" },
    validateStatus: () => true,
  });

  return NextResponse.json(backendRes.data, { status: backendRes.status });
}
