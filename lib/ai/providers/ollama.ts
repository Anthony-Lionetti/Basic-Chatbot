// lib/ai/providers/ollama.ts
import { AIProvider } from '../provider';
import { Message, ChatOptions, StreamingResponse } from '../types';

export interface OllamaConfig {
  type: 'ollama';
  baseUrl: string;
  defaultModel?: string;
  defaultTemperature?: number;
  enabled: boolean;
}

export class OllamaProvider implements AIProvider {
  private baseUrl: string;
  private config: OllamaConfig;
  
  constructor(config: OllamaConfig) {
    this.config = config;
    this.baseUrl = this.config.baseUrl || 'http://localhost:11434';
  }
  
  async generateChatResponse(messages: Message[], options?: ChatOptions): Promise<StreamingResponse> {
    const requestBody = {
      model: options?.model || this.config.defaultModel || "llama3",
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      stream: true,
      options: {
        temperature: options?.temperature || this.config.defaultTemperature || 0.7,
      }
    };
    
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }
    
    // Ollama uses newline-delimited JSON, so we need to parse it
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    const readableStream = new ReadableStream({
      async start(controller) {
        if (!reader) {
          controller.close();
          return;
        }
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            // Parse Ollama's streaming format
            const lines = chunk.split('\n').filter(Boolean);
            
            for (const line of lines) {
              try {
                const json = JSON.parse(line);
                if (json.response) {
                  controller.enqueue(new TextEncoder().encode(json.response));
                }
              } catch (e) {
                console.error('Failed to parse Ollama response line:', line);
              }
            }
          }
        } finally {
          controller.close();
        }
      }
    });
    
    return {
      stream: readableStream,
      metadata: {
        provider: 'ollama',
        model: requestBody.model
      }
    };
  }
  
  async getModels() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Ollama models: ${response.status}`);
      }
      
      const data = await response.json();
      return data.models.map((model: any) => ({
        id: model.name,
        name: model.name
      }));
    } catch (error) {
      console.error('Error fetching Ollama models:', error);
      return [];
    }
  }
  
  getProviderInfo() {
    return {
      id: 'ollama',
      name: 'Ollama',
      description: 'Local LLM inference',
      supportsStreaming: true,
      supportsReasoning: false
    };
  }
  
  async validateConfig(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/version`);
      return response.ok;
    } catch (error) {
      console.error('Ollama configuration validation failed:', error);
      return false;
    }
  }
}