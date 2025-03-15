// lib/ai/providers/groq.ts
import { Groq } from 'groq-sdk';
import { AIProvider } from '../provider';
import { Message, ChatOptions, StreamingResponse } from '../types';

export interface GroqConfig {
  type: 'groq';
  apiKey: string;
  defaultModel?: string;
  defaultTemperature?: number;
  enabled: boolean;
}

export class GroqProvider implements AIProvider {
  private client: Groq;
  private config: GroqConfig;
  
  constructor(config: GroqConfig) {
    this.config = config;
    this.client = new Groq({
      apiKey: this.config.apiKey
    });
  }
  
  async generateChatResponse(messages: Message[], options?: ChatOptions): Promise<StreamingResponse> {
    // This replaces your current implementation in app/api/chat/route.ts
    const modelConfig = options?.reasoning
      ? {
          model: "deepseek-r1-distill-llama-70b",
          temperature: options?.temperature || 0.6,
          max_completion_tokens: options?.maxTokens || 4096,
          top_p: options?.topP || 0.95,
          stop: null,
        }
      : { model: options?.model || "llama3-70b-8192" };

    // Create stream from Groq
    const stream = await this.client.chat.completions.create({
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      ...modelConfig,
      stream: true,
    });

    // Create a standardized ReadableStream
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

    return {
      stream: readableStream,
      metadata: {
        provider: 'groq',
        model: modelConfig.model as string
      }
    };
  }
  
  async getModels() {
    // For Groq, we'll manually define the available models
    return [
      { id: 'llama3-70b-8192', name: 'Llama 3 (70B)' },
      { id: 'deepseek-r1-distill-llama-70b', name: 'DeepSeek Reasoner' }
    ];
  }
  
  getProviderInfo() {
    return {
      id: 'groq',
      name: 'Groq',
      description: 'High-performance LLM inference',
      supportsStreaming: true,
      supportsReasoning: true
    };
  }
  
  async validateConfig(): Promise<boolean> {
    try {
      // Simple validation by making a minimal API call
      await this.client.chat.completions.create({
        messages: [{ role: 'user', content: 'test' }],
        model: 'llama3-70b-8192',
        max_tokens: 1
      });
      return true;
    } catch (error) {
      console.error('Groq configuration validation failed:', error);
      return false;
    }
  }
}