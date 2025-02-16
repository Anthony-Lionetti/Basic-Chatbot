import { Sidebar } from "@/components/Sidebar";
import ChatInterface from "@/components/chat/ChatInterface";

export default function AssitantPage() {
  return (
    <section className="bg-background h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Assistant Interface */}
      <ChatInterface />
    </section>
  );
}
