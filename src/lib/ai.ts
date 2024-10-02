import { createAI } from "ai/rsc";
import { continueConversation } from "./actions/ai.action";
import React from "react";

export const AI = createAI<[], React.ReactNode[]>({
  initialUIState: [],
  initialAIState: [],
  actions: {
    continueConversation,
  },
});
