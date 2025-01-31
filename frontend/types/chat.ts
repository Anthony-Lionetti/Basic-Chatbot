export type ChatRole = "User" | "Assistant";
export type ChatContent = string;
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: ChatContent;
}
