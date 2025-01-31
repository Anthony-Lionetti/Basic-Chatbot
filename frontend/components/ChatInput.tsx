"use client";
import { useState, useRef, useEffect } from "react";
import { IconButton } from "@radix-ui/themes";
import { CameraIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

export const ChatInput = ({
  onSend,
}: {
  onSend?: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSend(trimmedMessage);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-[50%] mx-auto fixed bottom-0 left-0 right-0">
      <div className="max-w-3xl mx-auto p-4">
        <div className="w-full border-2 border-gray-8 bg-gray-2 rounded-lg">
          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="bg-transparent px-3 pt-2 w-full resize-none min-h-[44px] max-h-[200px] focus:outline-none"
            rows={2}
          />
          {/* Controls */}
          <div className="flex flex-row pb-2 px-3 justify-between">
            <div className="flex flex-row justify-start gap-2"></div>
            <div className="flex flex-row justify-end gap-2">
              <IconButton size={"2"} color="blue" variant="soft" disabled>
                <CameraIcon className="w-4 h-4" />
              </IconButton>
              <IconButton
                size="2"
                variant="soft"
                color="blue"
                disabled={!message.trim()}
              >
                <PaperPlaneIcon className="w-4 h-4" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-400">
            Shift + Enter for new line • Enter to send
          </span>
        </div>
      </div>
    </div>
  );
};
