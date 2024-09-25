"use server";
import { AiEngine } from "@/config/gemini-api/AiEngine";
import { useProductState } from "@/Hooks/store/product/useProductState";

export default async function AiEngineResponse() {
  const { productName } = useProductState();

  const getAiResponse = await AiEngine(productName);
  return getAiResponse;
}
