import { type NextRequest } from "next/server";
// define the route handler
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("pname") || "";

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(query);
  const responseText: EnhancedGenerateContentResponse = result.response;
  return new Response(JSON.stringify(responseText));
}

import { EnhancedGenerateContentResponse, GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: process.env.SYSTEM_INSTRUCT,
});

export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};
