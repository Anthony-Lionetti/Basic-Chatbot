import { Sidebar } from "@/components/Sidebar";
import ChatInterface from "@/components/chat/ChatInterface";

export default function ChatPage() {
  return (
    <section className="bg-background h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <ChatInterface />
    </section>
  );
}
