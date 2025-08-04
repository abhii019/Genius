import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, authorized } = body;

    if (!authorized) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }

    // Note: Gemini Pro doesn't support image generation like DALL-E
    // This endpoint now returns a message explaining this limitation
    // You might want to use a different service for image generation

    return NextResponse.json({
      error:
        "Gemini Pro does not support image generation. Consider using DALL-E or other image generation services.",
      suggestion:
        "For image generation, you would need to use OpenAI DALL-E or another image generation service.",
      prompt: prompt,
    });
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
