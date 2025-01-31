import React, { createContext, useContext, useReducer } from "react";
import { ChatMessage, ChatRole, ChatContent } from "@/types/chat";

type Action =
  | { type: "add"; id: string; role: ChatRole; content: ChatContent }
  | { type: "erase"; id: string };

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

function chatReducer(chats: ChatMessage[], action: Action): ChatMessage[] {
  switch (action.type) {
    case "add": {
      return [
        ...chats,
        {
          id: action.id,
          role: action.role,
          content: action.content,
        },
      ];
    }
    case "erase": {
      return chats.filter((chat: ChatMessage) => chat.id !== action.id);
    }
    default: {
      throw new Error("Unknown action: " + (action as Action).type);
    }
  }
}

const placeHolderMsg =
  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.";

const initialChat: ChatMessage[] = [
  {
    id: "user-1",
    role: "User",
    content: placeHolderMsg,
  },
  {
    id: "assistant-1",
    role: "Assistant",
    content: placeHolderMsg,
  },
  {
    id: "user-2",
    role: "User",
    content: placeHolderMsg,
  },
];
