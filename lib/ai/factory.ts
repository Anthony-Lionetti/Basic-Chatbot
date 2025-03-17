// lib/ai/factory.ts
import { AIProvider } from './provider';
import { ProviderConfig } from './types';
import { GroqProvider, GroqConfig } from './providers/groq';
import { OllamaProvider, OllamaConfig } from './providers/ollama';

export class ProviderFactory {
  static getProvider(config: ProviderConfig): AIProvider | null {
    if (!config.enabled) {
      return null;
    }
    
    switch(config.type) {
      case 'groq':
        return new GroqProvider(config as GroqConfig);
      case 'ollama':
        return new OllamaProvider(config as OllamaConfig);
      default:
        console.warn(`Provider type ${config.type} not supported`);
        return null;
    }
  }
}