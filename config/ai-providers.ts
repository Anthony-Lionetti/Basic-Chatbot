// config/ai-providers.ts
import { ProviderConfig } from '@/lib/ai/types';

const providersConfig: Record<string, ProviderConfig> = {
  groq: {
    type: 'groq',
    enabled: Boolean(process.env.GROQ_API_KEY),
    apiKey: process.env.GROQ_API_KEY || '',
    defaultModel: 'llama3-70b-8192',
    defaultTemperature: 0.7
  },
  ollama: {
    type: 'ollama',
    enabled: Boolean(process.env.ENABLE_OLLAMA),
    baseUrl: process.env.OLLAMA_API_URL || 'http://localhost:11434',
    defaultModel: 'llama3.2:1b',
    defaultTemperature: 0.7
  }
};

export default providersConfig;