import { InputSearchForm } from "@/components/pages/root/input-search-form";
// import { fetchProduct } from "@/lib/actions/ecommerce-api/amazon.action";
import React from "react";

export default async function Home() {
  return (
    <main className="m-10">
      <InputSearchForm />
    </main>
  );
}
