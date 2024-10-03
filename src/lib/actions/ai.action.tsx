"use server";
import { streamUI } from "ai/rsc";
import { google } from "@ai-sdk/google";

export async function continueConversation(input: string) {
  const result = await streamUI({
    model: google("gemini-1.5-flash"),
    system: process.env.SYSTEM_INSTRUCT,
    prompt: input,
  });

  return result.value;
}
