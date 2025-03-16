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
    // Format messages for Ollama
    const ollamaMessages = messages.map(m => ({
      role: m.role === 'assistant' ? 'assistant' : m.role === 'system' ? 'system' : 'user',
      content: m.content
    }));
    // for reasoning use deepseek-r1:8b
    // for non-reasoning use llama3.1
    const requestBody = {
      model: options?.model || this.config.defaultModel || "llama3.1",
      messages: ollamaMessages,
      stream: true,
      options: {
        temperature: options?.temperature || this.config.defaultTemperature || 0.7,
      }
    };
    
    try {
      console.log('Sending request to Ollama:', `${this.baseUrl}/api/chat`, requestBody.model);
      
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Ollama API error:', response.status, errorText);
        throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
      }
      
      console.log("Response:", response)

      const reader = response.body?.getReader();
      
      if (!reader) {
        throw new Error('Failed to get response reader from Ollama');
      }
      
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              
              const text = decoder.decode(value, { stream: true });
              const lines = text.split('\n').filter(line => line.trim());
              for (const line of lines) {
                try {
                  const parsed = JSON.parse(line);
                  const content = parsed.message.content; // extract the tokens
                  if (content) {
                    controller.enqueue(encoder.encode(content));
                  }
                } catch (parseError) {
                  console.error('Failed to parse Ollama response:', line);
                }
              }
            }
          } catch (error: unknown) {
            console.error('Error in Ollama stream processing:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            controller.enqueue(encoder.encode(`\n\nError connecting to Ollama: ${errorMessage}`));
          } finally {
            controller.close();
          }
        }
      });
      
      return {
        stream: readableStream,
        metadata: {
          provider: 'ollama',
          model: requestBody.model as string
        }
      };
    } catch (error: unknown) {
      console.error('Ollama provider error:', error);
      
      // Create a stream with the error message instead of throwing
      const encoder = new TextEncoder();
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      const readableStream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`Error connecting to Ollama: ${errorMessage}\n\nPlease check that Ollama is running and accessible.`));
          controller.close();
        }
      });
      
      return {
        stream: readableStream,
        metadata: {
          provider: 'ollama',
          model: 'error'
        }
      };
    }
  }
  
  async getModels() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (!response.ok) {
        console.error(`Failed to fetch Ollama models: ${response.status}`);
        return [];
      }
      
      const data = await response.json();
      return data.models?.map((model: any) => ({
        id: model.name,
        name: model.name
      })) || [];
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