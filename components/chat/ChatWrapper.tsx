"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatMessages from "./ChatMessages";
import { ThemeToggle } from "../ThemeToggle";
import { useChats } from "@/context/ChatProvider";

export default function ChatWrapper() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [userInterrupted, setUserInterrupted] = useState(false);
  const chatHistory = useChats();

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
      <div className="flex flex-row text-center justify-between py-4 items-center">
        <div className="flex-1" />
        <h3 className="flex-1 justify-center text-2xl font-semibold text-accent-10">{" "}</h3>
        <div className="flex-1 justify-end">
          <ThemeToggle />
        </div>
      </div>
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
