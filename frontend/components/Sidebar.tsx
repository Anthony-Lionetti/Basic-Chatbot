"use client";
// components/Sidebar.tsx
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface SidebarProps {
  conversations?: string[];
  onSelect?: (index: number) => void;
}

export const Sidebar = ({ conversations = [] }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
        className="absolute -right-3 top-4 bg-gray-1 rounded-full p-1.5 
                 shadow-md border border-gray-5 hover:bg-gray-2 z-10"
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-4 w-4 text-gray-12" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 text-gray-12" />
        )}
      </button>

      {/* Content */}
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <h2
          className={`
          text-accent-11 font-semibold mb-4 
          ${isOpen ? "text-lg" : "text-center text-sm"}
        `}
        >
          {isOpen ? "Chat History" : "CH"}
        </h2>

        {/* Conversation List */}
        <div className="flex-1 space-y-1 overflow-y-auto">
          {conversations.map((convo, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`
                p-2 rounded-lg cursor-pointer transition-colors
                ${
                  selectedIndex === index
                    ? "bg-accent-3 text-accent-8"
                    : "hover:bg-gray-2"
                }
                ${isOpen ? "text-sm" : "text-xs text-center"}
              `}
            >
              {isOpen ? (
                <span className="truncate">{convo}</span>
              ) : (
                // Show first letters when collapsed
                <span>{convo.slice(0, 2)}</span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-4 ${isOpen ? "text-sm" : "text-xs text-center"}`}>
          {isOpen ? (
            <>
              <div className="h-px bg-gray-2 mb-2" />
              <span className="text-gray-11">Storage: 2.5/10GB</span>
            </>
          ) : (
            <span className="text-gray-11">2.5/10</span>
          )}
        </div>
      </div>
    </div>
  );
};
