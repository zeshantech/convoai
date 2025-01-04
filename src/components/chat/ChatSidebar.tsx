"use client";

import * as React from "react";
import { ChatList } from "./ChatList";
import { ChatSidebarFooter } from "./ChatSidebarFooter";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import ChatSidebarHeader from "./SidebarHeader";
import { GPTsList } from "./GPTsList";

export function ChatSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <ChatSidebarHeader />
      <SidebarContent>
        <GPTsList />
        <ChatList />
      </SidebarContent>

      <ChatSidebarFooter />
    </Sidebar>
  );
}
