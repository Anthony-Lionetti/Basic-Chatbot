# Stealth Chatbot

A modern, Next.js-based chatbot interface with multiple LLM provider integrations including Groq and Ollama.

![Stealth Chatbot](public/logo.png)

## Features

- 🌓 Light and dark theme support
- 🤖 Multiple AI provider integration (Groq, Ollama)
- 💭 Model "reasoning" toggle support
- 💨 Streaming responses
- 🔄 Custom markdown rendering with code syntax highlighting
- 📱 Responsive design with sidebar navigation

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- [Ollama](https://ollama.com/) (optional, for local model support)
- Groq API key (optional, for Groq integration)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Anthony-Lionetti/Basic-Chatbot.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```
# Groq API integration
GROQ_API_KEY=your_groq_api_key

# Ollama integration
ENABLE_OLLAMA=true
OLLAMA_API_URL=http://localhost:11434  # Default Ollama URL
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

This will start the Next.js development server with Turbopack. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Architecture

The application is built with Next.js 15 and follows a modern React architecture:

### Key Components

- **Context Providers**:
  - `ThemeContext` - Manages light/dark theme
  - `ChatProvider` - Manages chat state and message history

- **API Routes**:
  - `/api/chat` - Main endpoint for chat completions
  - `/api/chat/provider` - Endpoint for managing AI providers

- **AI Integration**:
  - `AIService` - Manages provider selection and message routing
  - Provider implementations for Groq and Ollama

### Folder Structure

```
/app               - Next.js app router pages
/components        - React components
  /chat            - Chat-specific components
/context           - React context providers
/lib               - Utility functions and libraries
  /ai              - AI provider integrations
/public            - Static assets
/types             - TypeScript type definitions
```

## Customization

### Adding New AI Providers

1. Create a new provider implementation in `lib/ai/providers/`
2. Update the provider factory in `lib/ai/factory.ts`
3. Add configuration in `config/ai-providers.ts`

### Styling

The application uses Tailwind CSS for styling with a custom color theme based on Radix Colors. Modify the following files to customize the appearance:

- `app/colors.css` - Core color variables
- `tailwind.config.ts` - Tailwind configuration

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Make your changes
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - See [LICENSE](LICENSE) for details

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Groq](https://groq.com/)
- [Ollama](https://ollama.com/)