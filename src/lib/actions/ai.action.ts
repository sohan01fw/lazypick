"use server";

import { streamUI } from "ai/rsc";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { fetchProduct } from "./ecommerce-api/amazon.action";
type Product = {
  asin: string;
  product_title: string;
  product_price: string;
  product_original_price: string;
  currency: string;
  product_star_rating: string;
  product_num_ratings: number;
  product_url: string;
  product_photo: string;
  product_num_offers: number;
  product_minimum_offer_price: string;
  is_best_seller: boolean;
  is_amazon_choice: boolean;
  is_prime: boolean;
  climate_pledge_friendly: boolean;
  sales_volume: string;
  delivery: string;
  has_variations: boolean;
};
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

          return productData.data.products.map((product: Product) => {
            return JSON.stringify({ product });
          });
        },
      },
    },
  });

  // console.log(result);
  return result.value;
}
