import { FaceIcon, MagicWandIcon, PersonIcon } from "@radix-ui/react-icons";
import { Heading, IconButton } from "@radix-ui/themes";
import React from "react";

function ChatMessages() {
  const placeHolderMsg =
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.";
  const chatHistory = [];
  if (chatHistory.length === 0) {
    return (
      <div className="w-[50%] h-[90dvh] mx-auto fixed top-0 left-0 right-0">
        <div className="text-center py-4 mb-auto">
          <Heading>Chatbot</Heading>
        </div>
        <div className="flex flex-col gap-12 border border-red-500">
          <ChatMessage type={"user"} />
          <ChatMessage type={"assistant"} />
          <ChatMessage2 message={placeHolderMsg} />
        </div>
      </div>
    );
  }
}

export default ChatMessages;

function ChatMessage({ type }: { type: "user" | "assistant" }) {
  const placeHolderMsg =
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.";
  return (
    <div
      className={`flex ${
        type === "user" ? "flex-row ml-auto" : "flex-row-reverse"
      } gap-2 border border-red-500`}
    >
      <p
        className={`w-[90%] p-2 rounded-md ${
          type === "user" ? "ml-auto" : "mr-auto"
        }`}
        style={{ outline: "1px solid gray" }}
      >
        {placeHolderMsg}
      </p>
      <IconButton variant="soft">
        {type === "user" && <PersonIcon className="h-6 w-6" />}
        {type === "assistant" && <MagicWandIcon className="h-6 w-6" />}
      </IconButton>
    </div>
  );
}

interface MessageProps {
  message: string;
  role: "user" | "assistant";
}

function ChatMessage2({ message, role }: MessageProps) {
  return (
    <article
      className="w-full scroll-mb-[var(--thread-trailing-height,150px)] text-token-text-primary focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
      dir="auto"
      data-testid="conversation-turn-2"
      data-scroll-anchor="false"
    >
      <h5 className="sr-only">You said:</h5>
      <div className="m-auto text-base py-[18px] px-3 w-full md:px-5 lg:px-4 xl:px-5">
        <div className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl">
          <div className="group/conversation-turn relative flex w-full min-w-0 flex-col">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-col flex-grow">
                <div
                  data-message-author-role={role}
                  dir="auto"
                  className="min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start [.text-message+&amp;]:mt-5"
                >
                  <div className="flex w-full flex-col gap-1 empty:hidden items-end rtl:items-start">
                    <div className="relative max-w-[var(--user-chat-width,70%)] rounded-3xl bg-token-message-surface px-5 py-2.5">
                      <div className="whitespace-pre-wrap">{message}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
