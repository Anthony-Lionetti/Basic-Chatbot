import React from "react";
import { ThemeToggle } from "../ThemeToggle";

export default function ChatHeader({
  service,
}: {
  service: "chat" | "assistant" | null;
}) {
  return (
    <div className="flex flex-row text-center justify-between py-4 items-center">
      <div className="flex-1" />
      <h3 className="flex-1 justify-center text-2xl font-semibold text-accent-10">
        {service === "assistant" ? "Assistant" : "Chatbot"}
      </h3>
      <div className="flex-1 justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
