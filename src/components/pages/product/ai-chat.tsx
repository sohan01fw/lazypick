"use client";

import { type CoreMessage } from "ai";
import React, { useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { continueConversation } from "@/lib/actions/ai-actions";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function AiChat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");
  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((m, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content as string}
        </div>
      ))}

      <form
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const newMessages: CoreMessage[] = [...messages, { content: input, role: "user" }];

          setMessages(newMessages);
          setInput("");

          const result = await continueConversation(newMessages);

          for await (const content of readStreamableValue(result)) {
            setMessages([
              ...newMessages,
              {
                role: "assistant",
                content: content as string,
              },
            ]);
          }
        }}
      >
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
        />
      </form>
    </div>
  );
}
