import React, { createContext, useContext, useReducer } from "react";
import { ChatDetails, ChatMessage } from "@/types/chat";

type Action =
  | { type: "add"; completion: ChatMessage }
  | { type: "setStreaming" }
  | { type: "setReasoning" }
  | { type: "appendResponseChunk"; message: string }
  | { type: "resetResponse" };

const ChatContext = createContext<ChatDetails | null>(null);
const ChatDispatch = createContext<React.Dispatch<Action> | null>(null);

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chat, dispatch] = useReducer(chatReducer, initialChat);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatch.Provider value={dispatch}>{children}</ChatDispatch.Provider>
    </ChatContext.Provider>
  );
}

export function useChats() {
  const context = useContext(ChatContext);
  if (context == null) {
    throw new Error("useChats must be used within a ChatProviers");
  }
  return context;
}

export function useChatDispatch() {
  const context = useContext(ChatDispatch);
  if (context == null) {
    throw new Error("useChatDispatch must be used within a ChatProviers");
  }
  return context;
}

function chatReducer(chats: ChatDetails, action: Action): ChatDetails {
  switch (action.type) {
    case "add": {
      return {
        ...chats,
        chatMessages: [...chats.chatMessages, action.completion],
      };
    }
    case "setStreaming": {
      return {
        ...chats,
        isStreaming: !chats.isStreaming,
      };
    }
    case "setReasoning": {
      return {
        ...chats,
        isReasoning: !chats.isReasoning,
      };
    }
    case "appendResponseChunk": {
      return {
        ...chats,
        streamingMessage: chats.streamingMessage + action.message,
      };
    }
    case "resetResponse": {
      return {
        ...chats,
        streamingMessage: "",
      };
    }
    default: {
      throw new Error("Unknown action: " + (action as Action).type);
    }
  }
}
const content = `
When writing spaced repetition prompts meant to invoke retrieval practice, you’re doing something similar to language translation. You’re asking: which tasks, when performed in aggregate, require lighting the bulbs which are activated when you have that idea “fully loaded” into your mind?

The retrieval practice mechanism implies some core properties of effective prompts. We’ll review them briefly here, and the rest of this guide will illustrate them through many examples.

These properties aren’t laws of nature. They’re more like rules you might learn in an English class. Good writers can (and should!) strategically break the rules of grammar to produce interesting effects. But you need to have enough experience to understand why doing something different makes sense in a given context.

Retrieval practice prompts should be focused. A question or answer involving too much detail will dull your concentration and stimulate incomplete retrievals, leaving some bulbs unlit. Unfocused questions also make it harder to check whether you remembered all parts of the answer and to note places where you differed. It’s usually best to focus on one detail at a time.`;

const initialChat: ChatDetails = {
  isStreaming: false,
  isReasoning: false,
  streamingMessage: "",
  chatMessages: [
    { id: "ihoiahgo", role: "user", content: "This is a test chat" },
    { id: "ihoiahgr", role: "assistant", content: content },
  ],
};
