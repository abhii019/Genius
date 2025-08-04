import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        error: "GEMINI_API_KEY not found in environment variables",
        status: "error",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Test with a simple model list or basic request
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(
      "Hello, this is a test message."
    );
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      message: "Gemini API is working!",
      response: text,
      status: "success",
    });
  } catch (error: any) {
    console.log("[TEST_GEMINI_ERROR]", error);

    return NextResponse.json({
      error: error.message || "Unknown error",
      status: "error",
      details: error,
    });
  }
}
