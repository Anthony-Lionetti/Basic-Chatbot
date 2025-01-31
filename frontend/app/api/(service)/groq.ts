import { ChatMessage } from "@/types/chat";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function groqRequest(
  messages: ChatMessage[],
  model: string = "llama-3.3-70b-versatile",
  stream: boolean = false
) {
  const transformedMessages = transformMessages(messages);

  const chatCompletion = await groq.chat.completions.create({
    messages: transformedMessages,
    model: model,
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: stream,
    stop: null,
  });

  return chatCompletion;
}

function transformMessages(messages: ChatMessage[]) {
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
