"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatMessages from "./messages/ChatMessages";
import { useChats } from "@/context/ChatProvider";
import ChatHeader from "./ChatHeader";
import { usePathname } from "next/navigation";

export default function ChatWrapper() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [userInterrupted, setUserInterrupted] = useState(false);
  const chatHistory = useChats();
  const path = usePathname();

  const handleScroll = () => {
    // Only set interrupted if we're currently streaming a message
    if (chatHistory.streamingMessage) {
      setUserInterrupted(true);
    }
  };

  useEffect(() => {
    // Reset the interrupted state when a new message starts streaming
    if (chatHistory.streamingMessage) {
      setUserInterrupted(false);
    }
  }, [chatHistory.streamingMessage?.id]); // Only reset when a new message starts

  useEffect(() => {
    if (!userInterrupted) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory.chatMessages, chatHistory.streamingMessage, userInterrupted]);

  return (
    <div className="h-full flex flex-col">
      <ChatHeader service={path === "/" ? "chat" : "assistant"} />
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto"
      >
        <ChatMessages />
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
