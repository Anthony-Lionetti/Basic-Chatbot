import React from "react";
import ChatMessages from "./ChatMessages";
import { ThemeToggle } from "../ThemeToggle";

export default function ChatWrapper() {
  return (
    <div className="mx-auto fixed top-0 left-0 right-0">
      <div className="flex flex-row text-center justify-between py-4 items-center">
        <div className="flex-1" />
        <h3 className="flex-1 justify-center text-2xl font-semibold text-accent-10">
          Stealth Chatbot
        </h3>
        <div className="flex-1 justify-end">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex flex-col max-h-[80dvh] overflow-auto">
        <ChatMessages />
      </div>
    </div>
  );
}
