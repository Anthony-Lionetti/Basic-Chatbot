"use client"
// components/Sidebar.tsx
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface SidebarProps {
  conversations?: string[];
  onSelect?: (index: number) => void;
}

export const Sidebar = ({ conversations = [] }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`
      relative h-screen bg-gray-50 border-r border-gray-200
      transition-all duration-300 ease-in-out
      ${isOpen ? 'w-64' : 'w-20'}
    `}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-4 bg-white rounded-full p-1.5 
                 shadow-md border border-gray-200 hover:bg-gray-50 z-10"
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 text-gray-600" />
        )}
      </button>

      {/* Content */}
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <h2 className={`
          text-gray-600 font-semibold mb-4 
          ${isOpen ? 'text-lg' : 'text-center text-sm'}
        `}>
          {isOpen ? 'Chat History' : 'CH'}
        </h2>

        {/* Conversation List */}
        <div className="flex-1 space-y-1 overflow-y-auto">
          {conversations.map((convo, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`
                p-2 rounded-lg cursor-pointer transition-colors
                ${selectedIndex === index 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'hover:bg-gray-200'}
                ${isOpen ? 'text-sm' : 'text-xs text-center'}
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
        <div className={`mt-4 ${isOpen ? 'text-sm' : 'text-xs text-center'}`}>
          {isOpen ? (
            <>
              <div className="h-px bg-gray-200 mb-2" />
              <span className="text-gray-500">Storage: 2.5/10GB</span>
            </>
          ) : (
            <span className="text-gray-500">2.5/10</span>
          )}
        </div>
      </div>
    </div>
  );
};