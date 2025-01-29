import { ChatInput } from '@/components/ChatInput';
import { Sidebar } from '@/components/Sidebar';
import ChatMessages from '@/components/ChatMessages';
import { Flex } from '@radix-ui/themes';

export default function ChatInterface() {

  return (
    <Flex height="100vh">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <Flex direction="column" flexGrow="1">
        {/* Chat Messages */}
        <ChatMessages />

        {/* Input Area */}
        <ChatInput />
      </Flex>
    </Flex>
  );
}