"use client";
import React, { useState, useRef, useEffect } from "react";
import InputControls from "./InputControls";
import { useChatDispatch, useChats } from "@/context/ChatProvider";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";

export function ChatInput({ ref }: { ref?: React.Ref<HTMLDivElement> }) {
  const path = usePathname();
  console.log("Path:", path);
  const dispatch = useChatDispatch();
  const chats = useChats();
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  async function handleSubmit() {
    const trimmedMessage = message.trim();
    dispatch({ type: "setStreaming" });
    try {
      // Send messages to state
      dispatch({
        type: "add",
        completion: { id: uuidv4(), role: "user", content: trimmedMessage },
      });

      // Make Post request to endpoint with chat messages
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatHistory: chats.chatMessages,
          message: trimmedMessage,
          isReasoning: chats.isReasoning,
        }),
      });

      if (!response.body) {
        throw Error("Response body is empty.");
      }
      setMessage("");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedMessage = "";

      // While tokens are still being generated
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);

        accumulatedMessage += chunk; // Accumulate locally
        dispatch({
          type: "appendResponseChunk",
          message: chunk,
        });
      }

      // Add final output to
      dispatch({
        type: "add",
        completion: {
          id: uuidv4(),
          role: "assistant",
          content: accumulatedMessage,
        },
      });
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      dispatch({ type: "setStreaming" });
      // reset the streaming chunk
      dispatch({ type: "resetResponse" });
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  const chatPosition =
    chats.chatMessages.length === 0
      ? "w-[50%] mx-auto fixed top-1/2 -translate-y-[50%] left-0 right-0"
      : "w-[50%] mx-auto py-1";

  return (
    <div className={chatPosition} ref={ref}>
      {chats.chatMessages.length === 0 && (
        <div className="flex flex-col justify-center gap-2 pb-4">
          <h3 className="text-center text-4xl font-bold text-accent-9">
            {path === "/" ? "Chatbot" : "Assistant"}
          </h3>
          <p className="text-center text-xl font-semibold text-accent-12">
            How can we be of service today?
          </p>
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4">
        <div className="w-full border-2 border-gray-8 bg-gray-2 rounded-lg">
          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className={`bg-transparent px-3 pt-2 w-full resize-none min-h-[44px] max-h-[200px] focus:outline-none`}
            rows={2}
          />
          <InputControls
            message={message}
            isStreaming={chats.isStreaming}
            handleSubmit={handleSubmit}
            service={path === "/" ? "chat" : "assistant"}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-9">
            Shift + Enter for new line • Enter to send
          </span>
        </div>
      </div>
    </div>
  );
}
