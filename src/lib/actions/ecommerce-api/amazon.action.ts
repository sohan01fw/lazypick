"use server";

import axios from "axios";

export const fetchProduct = async (query: string) => {
  const options = {
    method: "GET",
    url: process.env.AMAZON_URL,
    params: {
      query,
      page: "1",
      country: "US",
      sort_by: "RELEVANCE",
      product_condition: "ALL",
      is_prime: "false",
      deals_and_discounts: "NONE",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
