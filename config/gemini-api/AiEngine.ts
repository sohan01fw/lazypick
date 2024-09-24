"use server";
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "focus on generating concise, user-friendly, and relevant questions tailored to the product search process. The tone should be conversational yet professional, guiding the user through essential decision-making points like platform preference (e.g., Amazon, eBay), price range, product specifications, and personal preferences. Ensure clarity and simplicity in the questions, with options that are straightforward, easy to select, and actionable. Prioritize must-ask questions such as platform, budget, and product features, maintaining a helpful and engaging style throughout the interaction.And create one at a time after your answer the question and ask another one related to that.Also provide most common answer option like 3 or 4 of them and the last option is always give your own answer.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function AiEngine(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
}
