import { NextResponse } from "next/server";
import * as jose from "jose";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Test user logic
    if (email === "test@test.test") {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const token = await new jose.SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(secret);

      const response = NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );

      response.cookies.set("test_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60, // 15 min
        path: "/",
        sameSite: "lax",
      });

      return response;
    }

    // For now, reject any non-test users
    return NextResponse.json(
      { message: "Only test user allowed." },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
