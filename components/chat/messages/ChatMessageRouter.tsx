import React from "react";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { ChatUserMessage, ChatAssistantMessage } from "@/types/chat";
import { IconButton } from "@radix-ui/themes";
import { CustomMarkdown } from "@/lib/CustomMarkdown";
import { processReasoningContent } from "@/lib/reasoningParsing";
import ReasoningOutput from "./ReasoningOutput";

// Type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

export default function ChatMessageRouter({
  message,
}: {
  message: string | ChatUserMessage | ChatAssistantMessage;
}) {
  if (isString(message)) {
    return <StreamingMessage content={message} />;
  } else if ("role" in message && message.role === "user") {
    return <UserMessage {...message} />;
  } else if ("role" in message && message.role === "assistant") {
    return <AssitantMessage {...message} />;
  }
  return null;
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
              <div className="relative max-w-[70%] rounded-lg bg-gray-3 px-5 py-2.5">
                <div className="whitespace-pre-wrap">{content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StreamingMessage({ content }: { content: string }) {
  const { cleaned, thoughts } = processReasoningContent(content);
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
              data-message-author-role={"assistant"}
              className="min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start"
            >
              <div className="flex w-full flex-col gap-1 empty:hidden first:pt-[3px]">
                {thoughts.length != 0 && (
                  <ReasoningOutput thoughts={thoughts} />
                )}
                <CustomMarkdown content={cleaned} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AssitantMessage(completion: ChatAssistantMessage) {
  const role = completion.role;
  const content = completion.content;
  const { cleaned, thoughts } = processReasoningContent(content);

  return (
    <>
      <div className="flex-shrink-0 flex flex-col relative items-end">
        <div className="relative p-1 flex items-center justify-center h-8 w-8">
          <IconButton variant="soft">
            <MagicWandIcon className="w-4 h-4" />
          </IconButton>
        </div>
      </div>
      <div className="relative w-full min-w-0 flex-col">
        <div className="flex-col gap-1 md:gap-3">
          <div className="flex max-w-full flex-col flex-grow">
            <div
              data-message-author-role={role}
              className="min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start"
            >
              <div className="flex w-full flex-col gap-1 empty:hidden first:pt-[3px]">
                {thoughts.length != 0 && (
                  <ReasoningOutput thoughts={thoughts} />
                )}
                <CustomMarkdown content={cleaned} />
                {/* {content} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
