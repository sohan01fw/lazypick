import { z } from "zod";

export const SearchInputFormSchema = z.object({
  productname: z.string().min(2, {
    message: "product name must be at least 2 characters.",
  }),
});
