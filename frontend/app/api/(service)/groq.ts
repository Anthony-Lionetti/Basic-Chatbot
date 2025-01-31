import { ChatCompletion } from "@/types/chat";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function groqRequest(messages: ChatCompletion[]) {
  const transformedMessages: Groq.Chat.ChatCompletionMessageParam[] =
    messages.map((message) => ({
      role: message.choices[0].message.role,
      content: message.choices[0].message.content,
    }));

  const chatCompletion = await groq.chat.completions.create({
    messages: transformedMessages,
    model: "llama-3.3-70b-versatile",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null,
  });

  return chatCompletion;
}
