import ChatHeader from "@/components/chat/ChatHeader";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <SidebarInset>
        <div className="h-screen flex-1 hide-scrollbar">
          <header className="sticky top-0 z-20">
            <ChatHeader />
          </header>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
