import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, authorized } = body;

    if (!authorized) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return new NextResponse("Gemini API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // For now, let's use a simpler approach - just send the last message
    const lastMessage = messages[messages.length - 1].content;
    
    const result = await model.generateContent(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ role: "assistant", content: text });
  } catch (error: any) {
    console.log("[CONVERSATION_ERROR]", error);
    
    // Check if it's an API key error
    if (error.message?.includes("API key")) {
      return new NextResponse("Invalid Gemini API Key. Please check your API key.", { status: 500 });
    }
    
    // Check if it's a model not found error
    if (error.message?.includes("not found") || error.status === 404) {
      return new NextResponse("Gemini model not found. Please check your API key and model configuration.", { status: 500 });
    }
    
    return new NextResponse(`Internal Error: ${error.message || "Unknown error"}`, { status: 500 });
  }
}
