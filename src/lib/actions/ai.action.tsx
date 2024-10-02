"use server";
import { streamUI } from "ai/rsc";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { fetchProduct } from "./ecommerce-api/amazon.action";
import SearchProduct from "@/components/pages/product/search-product";

export async function continueConversation(input: string) {
  const result = await streamUI({
    model: google("gemini-1.5-flash"),
    system: process.env.SYSTEM_INSTRUCT,
    prompt: input,
    tools: {
      productSearch: {
        description: "Search for products",
        parameters: z.object({
          query: z.string().describe("The product to search for, e.g., iPhone 16 Pro"),
        }),

        generate: async function* ({ query }) {
          yield `Searching for products from ${query}...`;
          const productData = await fetchProduct(query);

          return <SearchProduct productData={productData} />;
        },
      },
    },
  });

  return result.value;
}
