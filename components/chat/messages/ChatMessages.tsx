"use client";
import React from "react";
import { useChats } from "@/context/ChatProvider";

import { ChatRole } from "@/types/chat";
import ChatMessageRouter from "./ChatMessageRouter";

function ChatMessages() {
  const chatHistory = useChats();
  return (
    <>
      {chatHistory.chatMessages.map((turn) => {
        // check if role exsists on turn. If yes it is a user message
        if ("role" in turn) {
          return (
            <MessageWrapper key={turn.id} role={turn.role}>
              <ChatMessageRouter message={turn} />
            </MessageWrapper>
          );
        }
      })}
      {chatHistory.streamingMessage && (
        <MessageWrapper key={"streaming-response"} role={"assistant"}>
          <ChatMessageRouter message={chatHistory.streamingMessage} />
        </MessageWrapper>
      )}
    </>
  );
}

export default ChatMessages;

interface MessageWrapperProps {
  children: React.ReactNode;
  role: ChatRole;
}

function MessageWrapper({ children, role }: MessageWrapperProps) {
  return (
    <article className="w-full scroll-mb-[150px] focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
      <h6 className="sr-only">{role} said:</h6>
      <div className="m-auto text-base py-[18px] px-3 w-full md:px-5 lg:px-4 xl:px-5">
        <div className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl">
          {children}
        </div>
      </div>
    </article>
  );
}
