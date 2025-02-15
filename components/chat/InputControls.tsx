"use client";
import React from "react";
import { Toggle } from "radix-ui";
import { IconButton } from "@radix-ui/themes";
import {
  CameraIcon,
  MagicWandIcon,
  PaperPlaneIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { useChatDispatch, useChats } from "@/context/ChatProvider";

interface InputControlsProps {
  message: string;
  isStreaming: boolean;
  handleSubmit: () => void;
}
export default function InputControls({
  message,
  isStreaming,
  handleSubmit,
}: InputControlsProps) {
  // Chat context to see if we need to use the reasoning model
  const chat = useChats();
  const dispatch = useChatDispatch();
  return (
    <div className="flex flex-row pb-2 px-3 justify-between items-center">
      <div className="flex flex-row justify-start gap-2">
        <Toggle.Root
          onPressedChange={() => dispatch({ type: "setReasoning" })}
          data-state={chat.isReasoning ? "on" : "off"}
          className="flex flex-row gap-2 px-2 py-.75 items-center border-2 border-gray-5 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-1 hover:data-[state=on]:bg-accent-7 data-[state=on]:bg-accent-9"
        >
          <MagicWandIcon />
          <span className="text-sm">Reasoning</span>
        </Toggle.Root>

        <IconButton size={"2"} color="blue" variant="soft" disabled>
          <UploadIcon className="h-4 w-4" />
        </IconButton>

        <IconButton size={"2"} color="blue" variant="soft" disabled>
          <CameraIcon className="w-4 h-4" />
        </IconButton>
      </div>

      <div className="flex flex-row justify-end gap-2">
        <IconButton
          size="2"
          variant="solid"
          color="blue"
          disabled={!message.trim() || isStreaming}
          onClick={handleSubmit}
        >
          <PaperPlaneIcon className="w-4 h-4" />
        </IconButton>
      </div>
    </div>
  );
}
