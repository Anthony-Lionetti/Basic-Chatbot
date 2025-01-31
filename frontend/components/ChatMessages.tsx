"use client";
import React from "react";
import { useChats } from "@/context/ChatProvider";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import {
  ChatCompletion,
  UserMessage as ChatUserMessage,
  ChatRole,
} from "@/types/chat";

function ChatMessages() {
  const chatHistory = useChats();
  return (
    <>
      {chatHistory.map((turn) => {
        // check if role exsists on turn. If yes it is a user message
        console.log(turn);
        if ("role" in turn) {
          return (
            <MessageWrapper key={turn.id} role={turn.role}>
              <UserMessage {...turn} />
            </MessageWrapper>
          );
        } else {
          return (
            <MessageWrapper key={turn.id} role={turn.choices[0].message.role}>
              <AssitantMessage {...turn} />
            </MessageWrapper>
          );
        }
      })}
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

function UserMessage({ content, role }: ChatUserMessage) {
  return (
    <div className="relative flex w-full min-w-0 flex-col">
      <div className="flex-col gap-1 md:gap-3">
        <div className="flex max-w-full flex-col flex-grow">
          <div
            data-message-author-role={role}
            className="min-h-8 flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start"
          >
            <div className="flex w-full flex-col gap-1 empty:hidden items-end rtl:items-start">
              <div className="relative max-w-[70%] rounded-3xl bg-token-message-surface px-5 py-2.5">
                <div className="whitespace-pre-wrap">{content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssitantMessage(completion: ChatCompletion) {
  const role = completion.choices[0].message.role;
  const content = completion.choices[0].message.content;
  return (
    <>
      <div className="flex-shrink-0 flex flex-col relative items-end">
        <div className="relative p-1 flex items-center justify-center h-8 w-8">
          <IconButton variant="soft">
            <MagicWandIcon className="w-4 h-4" />
          </IconButton>
        </div>
      </div>
      <div className="relative flex w-full min-w-0 flex-col">
        <div className="flex-col gap-1 md:gap-3">
          <div className="flex max-w-full flex-col flex-grow">
            <div
              data-message-author-role={role}
              className="min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start"
            >
              <div className="flex w-full flex-col gap-1 empty:hidden first:pt-[3px]">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
