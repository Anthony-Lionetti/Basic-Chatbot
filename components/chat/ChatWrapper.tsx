import React from "react";
import ChatMessages from "./ChatMessages";
import { ThemeToggle } from "../ThemeToggle";

export default function ChatWrapper({ inputHeight }: { inputHeight: number }) {
  return (
    <div
      className={`flex flex-col h-[calc(100vh-${inputHeight}px)] min-w-screen overflow-y-scroll`}
    >
      <div className="flex flex-row text-center justify-between py-4 items-center">
        <div className="flex-1" />
        <h3 className="flex-1 justify-center text-2xl font-semibold text-accent-10">
          Chatbot
        </h3>
        <div className="flex-1 justify-end">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex flex-col overflow-auto">
        <ChatMessages />
      </div>
    </div>
  );
}
