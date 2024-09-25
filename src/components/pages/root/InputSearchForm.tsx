"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchInputFormSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { useProductState } from "@/Hooks/store/product/useProductState";

export function InputSearchForm() {
  const router = useRouter();
  const { setProductName } = useProductState();
  const form = useForm<z.infer<typeof SearchInputFormSchema>>({
    resolver: zodResolver(SearchInputFormSchema),
    defaultValues: {
      productname: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SearchInputFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!values) return null;
    setProductName(values?.productname);
    router.push(`/searchproduct/${values?.productname}`);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="search the product u want..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
