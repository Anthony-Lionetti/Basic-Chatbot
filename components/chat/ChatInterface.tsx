"use client";
import { useEffect, useRef, useState } from "react";
import ChatWrapper from "./ChatWrapper";
import { ChatInput } from "./ChatInput";

export default function ChatInterface() {
  const chatInputRef = useRef<HTMLDivElement>(null);
  const [inputHeight, setInputHeight] = useState(0);

  useEffect(() => {
    if (chatInputRef.current) {
      const updateHeight = () => {
        setInputHeight(chatInputRef.current?.clientHeight || 0);
      };

      updateHeight();
      // Update height on window resize
      window.addEventListener("resize", updateHeight);

      return () => window.removeEventListener("resize", updateHeight);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden justify-between">
      {/* Chat Messages */}
      <ChatWrapper inputHeight={inputHeight} />
      {/* Input Area */}
      <ChatInput ref={chatInputRef} />
    </div>
  );
}
