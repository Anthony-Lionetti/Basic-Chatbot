// app/api/chat/route.ts
import { NextRequest } from 'next/server';
import { AIService } from '@/lib/ai/service';
import providersConfig from '@/config/ai-providers';
import { Message } from '@/lib/ai/types';

// Initialize AI service
const aiService = new AIService(providersConfig);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Extract the providerId from the request if present
    const providerId = data.providerId;
    
    // get new message and add it to the chat history
    const newMessage: Message = { role: "user", content: data.message };
    
    // Convert chat history to our internal format
    const messages: Message[] = [
      ...data.chatHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      newMessage
    ];

    // Generate response using AI service with the specified provider
    const response = await aiService.generateChatResponse(
      messages,
      providerId, // Pass the provider ID if specified
      {
        reasoning: data.isReasoning,
        temperature: data.temperature
      }
    );

    // Create a Text Encoder to send the stream
    let accumulatedResponse = '';

    // Create a pass-through stream to monitor the content
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        accumulatedResponse += text;
        controller.enqueue(chunk);
      }
    });

    // Pipe the provider stream through our transform stream
    const outputStream = response.stream.pipeThrough(transformStream);

    // Return streaming response
    return new Response(outputStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    console.error(err);
    return Response.json({ status: 500, message: "Error" });
  }
}