"use client";
import { useState, useRef, useEffect } from "react";
import { IconButton } from "@radix-ui/themes";
import { CameraIcon, PaperPlaneIcon, UploadIcon } from "@radix-ui/react-icons";
import { useChatDispatch, useChats } from "@/context/ChatProvider";
import { v4 as uuidv4 } from "uuid";

export const ChatInput = () => {
  const dispatch = useChatDispatch();
  const chats = useChats();
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  async function handleSubmit() {
    const trimmedMessage = message.trim();
    dispatch({ type: "setStreaming" });
    try {
      // Send messages to state
      dispatch({
        type: "add",
        completion: { id: uuidv4(), role: "user", content: trimmedMessage },
      });

      // Make Post request to endpoint with chat messages
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatHistory: chats.chatMessages,
          message: trimmedMessage,
          model: undefined,
        }),
      });

      if (!response.body) {
        throw Error("Response body is empty.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      setMessage("");

      // While tokens are still being generated
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const content = line.replace("data: ", "");
            if (content === "[DONE]") break;
            dispatch({
              type: "appendResponseChunk",
              message: content,
            });
          }
        }
      }

      // Add final output to
      const finalOutput = chats.streamingMessage;
      dispatch({
        type: "add",
        completion: {
          id: uuidv4(),
          role: "assistant",
          content: finalOutput,
        },
      });
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      dispatch({ type: "setStreaming" });
      // reset the streaming chunk
      dispatch({ type: "resetResponse" });
    }
  }

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
            className={`bg-transparent px-3 pt-2 w-full resize-none min-h-[44px] max-h-[200px] focus:outline-none`}
            rows={2}
          />
          {/* Controls */}
          <div className="flex flex-row pb-2 px-3 justify-between">
            <div className="flex flex-row justify-start gap-2">
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
                disabled={!message.trim() || chats.isStreaming}
                onClick={handleSubmit}
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
