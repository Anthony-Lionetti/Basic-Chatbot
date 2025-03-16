import Groq from "groq-sdk";

export type ChatRole = Groq.Chat.ChatCompletionRole;
export type ChatCompletion = Groq.Chat.ChatCompletion;
export interface ChatUserMessage {
  id: string;
  role: "user";
  content: string;
}

export interface ChatAssistantMessage {
  id: string;
  role: "assistant";
  content: string;
  provider?: string; // Add provider information
}

export type ChatMessage =
  | ChatCompletion
  | ChatAssistantMessage
  | ChatUserMessage;

export interface ChatDetails {
  isStreaming: boolean;
  isReasoning: boolean;
  streamingMessage: string;
  chatMessages: ChatMessage[];
}
