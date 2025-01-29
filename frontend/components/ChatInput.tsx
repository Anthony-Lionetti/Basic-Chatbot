"use client"
import { useState, useRef, useEffect } from 'react';
import { IconButton, TextArea } from '@radix-ui/themes';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

export const ChatInput = ({ onSend }: { onSend?: (message: string) => void }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSend(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-[50%] mx-auto fixed bottom-0 left-0 right-0">
      <div className="max-w-3xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
            <TextArea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="pr-12 resize-none min-h-[44px] max-h-[200px]"
              style={{
                paddingRight: '3.5rem',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              rows={1}
            />
          <div className="absolute right-2 bottom-2">
            <IconButton
              type="submit"
              size="2"
              variant="soft"
              color="gray"
              disabled={!message.trim()}
              className="transition-opacity hover:opacity-80"
            >
              <PaperPlaneIcon className="w-4 h-4" />
            </IconButton>
          </div>
        </form>

        <div className="mt-2 text-center">
          <span className="text-xs text-gray-400">
            Shift + Enter for new line • Enter to send
          </span>
        </div>
      </div>
    </div>
  );
};