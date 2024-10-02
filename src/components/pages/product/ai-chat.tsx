"use client";

import React, { useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/lib/ai";

export default function AIChat() {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState<typeof AI>();
  const { continueConversation } = useActions();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInput("");
    setConversation((currentConversation) => [
      ...currentConversation,
      <div key={currentConversation.length}>{input}</div>,
    ]);
    const message = await continueConversation(input);

    setConversation((currentConversation) => [...currentConversation, message]);
  };

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
          <button>Send Message</button>
        </form>
      </div>
    </div>
  );
}
