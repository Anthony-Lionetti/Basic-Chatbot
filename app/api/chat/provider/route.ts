// app/api/chat/provider/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai/service';
import providersConfig from '@/config/ai-providers';

// Initialize AI service
const aiService = new AIService(providersConfig);

// Get available providers and current default
export async function GET() {
  try {
    return NextResponse.json({
      providers: aiService.getAvailableProviders(),
      defaultProvider: aiService.getDefaultProvider()
    });
  } catch (error) {
    console.error('Error fetching providers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}

// Set default provider
export async function POST(req: NextRequest) {
  try {
    const { providerId } = await req.json();
    
    const success = aiService.setDefaultProvider(providerId);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      defaultProvider: aiService.getDefaultProvider()
    });
  } catch (error) {
    console.error('Error setting default provider:', error);
    return NextResponse.json(
      { error: 'Failed to set default provider' },
      { status: 500 }
    );
  }
}