import { InputSearchForm } from "@/components/pages/root/InputSearchForm";
import { AiEngine } from "@/config/gemini-api/AiEngine";
import React from "react";

export default function Home() {
  AiEngine("soap");

  return (
    <main className="m-10">
      <InputSearchForm />
    </main>
  );
}
