import Groq from "groq-sdk";

export type ChatRole = Groq.Chat.ChatCompletionRole;
export type ChatCompletion = Groq.Chat.ChatCompletion;
export interface UserMessage {
  id: string;
  role: "user";
  content: string;
}

export type ChatMessage = ChatCompletion | UserMessage;
