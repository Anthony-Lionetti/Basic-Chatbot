import { ChatInput } from "@/components/ chat/ChatInput";
import { Sidebar } from "@/components/Sidebar";
import { Flex } from "@radix-ui/themes";
import ChatWrapper from "@/components/ chat/ChatWrapper";

export default function ChatInterface() {
  return (
    <section className="bg-background h-[100vh]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <Flex direction="column" flexGrow="1" height={"full"}>
        {/* Chat Messages */}
        <ChatWrapper />

        {/* Input Area */}
        <ChatInput />
      </Flex>
    </section>
  );
}
