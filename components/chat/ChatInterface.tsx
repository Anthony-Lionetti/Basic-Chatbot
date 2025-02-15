import ChatWrapper from "./ChatWrapper";
import { ChatInput } from "./ChatInput";

export default function ChatInterface() {
  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <ChatWrapper />
      </div>
      {/* Input Area */}
      <div className="flex-shrink-0">
        <ChatInput />
      </div>
    </div>
  );
}
