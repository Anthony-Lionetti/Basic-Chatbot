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

    // Create stream from Groq
    const stream = await groq.chat.completions.create({
      messages: messages,
      model: data.model || "llama3-70b-8192",
      stream: true,
    });

    // Create a TransformStream to convert Groq's stream to proper format
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(`data: ${content}\n\n`));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
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
