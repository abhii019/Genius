import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out" },
    { status: 200 }
  );

  // Remove the cookie by setting it with an expired date
  response.cookies.set("test_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
    sameSite: "lax",
  });

  return response;
}
