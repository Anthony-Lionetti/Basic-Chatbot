import React from "react";
import { Heading } from "@radix-ui/themes";
import ChatMessages from "./ChatMessages";

export default function ChatWrapper() {
  return (
    <div className="mx-auto fixed top-0 left-0 right-0">
      <div className="text-center py-4 mb-auto">
        <Heading color="blue">Chatbot</Heading>
      </div>
      <div className="flex flex-col max-h-[80dvh] overflow-auto">
        <ChatMessages />
      </div>
    </div>
  );
}
