import { Groq } from "groq-sdk";
import { transformMessages } from "../(service)/util";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // get new message and add it to the chat history
    const newMessage = { role: "user", content: data.message };
    const messages = transformMessages([...data.chatHistory, newMessage]);

    // define necessary groq configurations based on request.
    const modelConfig = data.isReasoning
      ? {
          model: "deepseek-r1-distill-llama-70b",
          temperature: 0.6,
          max_completion_tokens: 4096,
          top_p: 0.95,
          stop: null,
        }
      : { model: "llama3-70b-8192" };

    // Create stream from Groq
    const stream = await groq.chat.completions.create({
      messages: messages,
      ...modelConfig,
      stream: true,
    });

    // Create a TransformStream to convert Groq's stream to proper format
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(content));
        }
        controller.close();
      },
    });

    // Return streaming response
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error(err);
    return Response.json({ status: 500, message: "Error" });
  }
}
