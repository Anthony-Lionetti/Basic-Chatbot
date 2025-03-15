// lib/ai/types.ts
export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  reasoning?: boolean;
  systemPrompt?: string;
}

export interface ProviderConfig {
  type: string;
  enabled: boolean;
  [key: string]: any;
}

export interface StreamingResponse {
  stream: ReadableStream;
  metadata: {
    provider: string;
    model: string;
    promptTokens?: number;
    completionTokens?: number;
  };
}