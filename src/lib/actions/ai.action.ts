"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { fetchProduct } from "./ecommerce-api/amazon.action";
export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: google("gemini-1.5-flash"),
    system: process.env.SYSTEM_INSTRUCT,
    messages,
    tools: {
      productSearch: {
        description: "Search for products",
        parameters: z.object({
          query: z.string().describe("The product to search for, e.g., iPhone 16 Pro"),
        }),
        execute: async ({ query }) => {
          const productData = await fetchProduct(query);

          if (productData.error) {
            return { error: "Could not fetch the product data." };
          }
          return {
            product: productData,
          };
        },
      },
    },
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
