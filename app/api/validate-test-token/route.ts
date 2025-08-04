import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("test_token")?.value;
  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jose.jwtVerify(token, secret);

    if (payload.email === "test@test.test") {
      return NextResponse.json({ message: "Authorized" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
