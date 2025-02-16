"use client";
import { useState } from "react";
import {
  ChevronUpIcon,
  PinLeftIcon,
  PinRightIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { Avatar, Card, Tooltip } from "@radix-ui/themes";

export const Sidebar = () => {
  const conversations = useMockHistory();
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const toggleSidebar = () => setIsHovered(!isHovered);

  const isOpen = isHovered || isPinned;

  return (
    <div
      className={`
      fixed h-screen bg-gray-2
      transition-all duration-300 ease-in-out z-10
      ${isOpen ? "w-64" : "w-0"}
    `}
      onMouseEnter={toggleSidebar}
      onMouseLeave={toggleSidebar}
    >
      <div className="p-4 h-full flex flex-col items-start">
        {/* Header */}
        <div className="flex w-full">
          <Link
            href="/"
            className="flex flex-1 flex-row gap-1 w-auto items-end mb-12"
          >
            <h2 className="top-4 text-left text-xl font-bold text-gray-12">
              Chatbot
            </h2>
          </Link>

          {/* Pin Sidebar */}
          {isOpen && (
            <Tooltip content="Pin taskbar">
              <button
                onClick={() => setIsPinned(!isPinned)}
                className="h-6 w-6 p-1 rounded-md bg-gray-5"
              >
                {isPinned ? <PinLeftIcon /> : <PinRightIcon />}
              </button>
            </Tooltip>
          )}
        </div>

        {isOpen && (
          <Card
            className={`flex w-full bg-accent-8 flex-row gap-3 items-center px-2 py-1 transition-color duration-300 ease-in-out hover:cursor-pointer hover:bg-accent-7`}
          >
            <PlusIcon className="w-5 h-5 font-bold" />
            <p className="font-semibold text-md">New Chat</p>
          </Card>
        )}
        {/* Conversation List */}
        <div className="flex-1 space-y-1 overflow-y-auto mt-12">
          {isOpen && (
            <>
              <h4 className="text-lg font-semibold gray-12 mb-2">
                Chat History
              </h4>

              <div className="flex flex-col gap-2">
                {conversations.map((convo, idx) => {
                  return (
                    <Card
                      key={`${convo.slice(0, 5)}-${idx}`}
                      className="p-1 transition-colors duration-300 ease-in-out hover:bg-gray-4 hover:cursor-pointer"
                    >
                      <p className="max-w-[31ch] text-sm">
                        {convo.slice(0, 28)}...
                      </p>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4">
          {isOpen ? (
            <Card className="flex gap-2 p-2 items-center transition-colors duration-300 ease-in-out hover:bg-gray-4 hover:cursor-pointer">
              <Avatar fallback="AL" size={"2"} />
              <span className="text-sm text-gray-11">
                lionetti.tech@gmail.com
              </span>
              <ChevronUpIcon />
            </Card>
          ) : (
            <div className="p-2">
              <Avatar fallback="AL" size={"2"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function useMockHistory() {
  const history = [
    "Tell me a story about the most recent election",
    "Can you tell me how quantum mechanics works as if I were a 5th grader?",
    "This is another random prompt",
    "This is yet another random prompt example",
  ];
  return history;
}
