"use client";
import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Card, IconButton } from "@radix-ui/themes";

export const Sidebar = () => {
  const conversations = useMockHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`
      relative h-screen bg-gray-2 border-r border-gray-5
      transition-all duration-300 ease-in-out
      ${isOpen ? "w-64" : "w-20"}
    `}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-5 bg-gray-1 rounded-full p-1.5 
                 shadow-md border border-gray-5 hover:bg-gray-2 z-10"
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-4 w-4 text-gray-12" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 text-gray-12" />
        )}
      </button>

      {/* Content */}
      <div className="p-4 h-full flex flex-col items-center">
        {/* Header */}
        <Link href="/" className="flex flex-row gap-1 w-auto items-end mb-8">
          <Image
            src={"/logo.png"}
            alt="logo"
            height={36}
            width={48}
            className="w-12 h-8 inline-block"
          />
          {isOpen && (
            <h2 className="text-left text-xl font-bold text-gray-12">
              Stealth Chatbot
            </h2>
          )}
        </Link>

        {isOpen ? (
          <Card className="flex w-full bg-accent-8 flex-row gap-3 items-center p-1 transition-color duration-300 ease-in-out hover:cursor-pointer hover:bg-accent-7">
            <PlusIcon className="w-4 h-4" />
            {isOpen && (
              <p className="font-semibold text-md">Start a New Chat</p>
            )}
          </Card>
        ) : (
          <IconButton size={"2"} className="bg-accent-8">
            <PlusIcon className="w-4 h-4" />
          </IconButton>
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
            <Card className="flex gap-2 items-center transition-colors duration-300 ease-in-out hover:bg-gray-4 hover:cursor-pointer">
              <Avatar fallback="AL" size={"2"} />
              <span className="text-sm text-gray-11">
                lionetti.tech@gmail.com
              </span>
            </Card>
          ) : (
            <Avatar fallback="AL" size={"2"} />
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
