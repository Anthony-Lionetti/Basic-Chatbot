// lib/ai/service.ts
import { AIProvider } from './provider';
import { ProviderFactory } from './factory';
import { Message, ChatOptions, ProviderConfig, StreamingResponse } from './types';

export class AIService {
  private defaultProvider: AIProvider | null = null;
  private providers: Map<string, AIProvider> = new Map();
  
  constructor(providerConfigs: Record<string, ProviderConfig>, defaultProviderType?: string) {
    // Initialize all enabled providers
    for (const [providerType, config] of Object.entries(providerConfigs)) {
      if (!config.enabled) continue;
      
      const provider = ProviderFactory.getProvider(config);
      if (provider) {
        this.providers.set(providerType, provider);
      }
    }
    
    // Set default provider
    if (defaultProviderType && this.providers.has(defaultProviderType)) {
      this.defaultProvider = this.providers.get(defaultProviderType)!;
    } else if (this.providers.size > 0) {
      this.defaultProvider = this.providers.values().next().value;
    }
  }
  
  async generateChatResponse(
    messages: Message[], 
    providerType?: string,
    options?: ChatOptions
  ): Promise<StreamingResponse> {
    // Use specified provider or default
    const provider = providerType && this.providers.has(providerType)
      ? this.providers.get(providerType)!
      : this.defaultProvider;
      
    if (!provider) {
      throw new Error('No AI provider available');
    }
      
    return provider.generateChatResponse(messages, options);
  }
  
  getAvailableProviders() {
    return Array.from(this.providers.entries()).map(([id, provider]) => ({
      id,
      ...provider.getProviderInfo()
    }));
  }
  
  getDefaultProvider() {
    return this.defaultProvider?.getProviderInfo() || null;
  }
  
  setDefaultProvider(providerType: string) {
    if (this.providers.has(providerType)) {
      this.defaultProvider = this.providers.get(providerType)!;
      return true;
    }
    return false;
  }
}