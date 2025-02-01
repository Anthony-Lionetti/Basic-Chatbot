import React, { createContext, useContext, useReducer } from "react";
import { ChatDetails, ChatMessage } from "@/types/chat";

type Action =
  | { type: "add"; completion: ChatMessage }
  | { type: "setStreaming" }
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

const initialChat: ChatDetails = {
  isStreaming: false,
  streamingMessage: "",
  chatMessages: [],
};
