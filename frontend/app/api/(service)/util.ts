import Groq from "groq-sdk";
import { ChatMessage } from "@/types/chat";

export function transformMessages(messages: ChatMessage[]) {
  // Map list of messages to required list
  const transformedMessages: Groq.Chat.ChatCompletionMessageParam[] =
    messages.map((message) => {
      // handle User messages
      if ("role" in message) {
        return { role: message.role, content: message.content };
      } else {
        return {
          role: message.choices[0].message.role,
          content: message.choices[0].message.content,
        };
      }
    });

  return transformedMessages;
}
