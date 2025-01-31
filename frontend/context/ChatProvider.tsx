import React, { createContext, useContext, useReducer } from "react";
import { ChatMessage } from "@/types/chat";

type Action = { type: "add"; completion: ChatMessage };
//   | { type: "erase"; id: string };

const ChatContext = createContext<ChatMessage[] | null>(null);
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

function chatReducer(chats: ChatMessage[], action: Action): ChatMessage[] {
  switch (action.type) {
    case "add": {
      return [...chats, action.completion];
    }
    default: {
      throw new Error("Unknown action: " + (action as Action).type);
    }
  }
}

const initialChat: ChatMessage[] = [];
