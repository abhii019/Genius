import { NextResponse } from "next/server";

export async function GET() {
  try {
    const envVars = {
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      hasReplicateToken: !!process.env.REPLICATE_API_TOKEN,
      hasJWTSecret: !!process.env.JWT_SECRET,
      hasMongoURI: !!process.env.MONGODB_URI,
      nodeEnv: process.env.NODE_ENV,
      geminiKeyLength: process.env.GEMINI_API_KEY
        ? process.env.GEMINI_API_KEY.length
        : 0,
      geminiKeyPrefix: process.env.GEMINI_API_KEY
        ? process.env.GEMINI_API_KEY.substring(0, 10) + "..."
        : "not set",
    };

    return NextResponse.json({
      message: "Environment variables check",
      envVars,
      status: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || "Unknown error",
      status: "error",
    });
  }
}
