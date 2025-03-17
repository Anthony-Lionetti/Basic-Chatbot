// lib/ai/provider.ts
import { Message, ChatOptions, ProviderConfig, StreamingResponse } from './types';

export interface AIProvider {
  // Core chat functionality
  generateChatResponse(messages: Message[], options?: ChatOptions): Promise<StreamingResponse>;
  
  // Provider information
  getModels(): Promise<{id: string, name: string}[]>;
  getProviderInfo(): {
    id: string;
    name: string;
    description: string;
    supportsStreaming: boolean;
    supportsReasoning: boolean;
  };
  
  // Configuration
  validateConfig(): Promise<boolean>;
}