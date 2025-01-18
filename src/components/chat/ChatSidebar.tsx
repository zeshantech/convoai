"use client";

import * as React from "react";
import { ChatList } from "./ChatList";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import ChatSidebarHeader from "./SidebarHeader";

export function ChatSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="left-12">
      <ChatSidebarHeader />
      <SidebarContent className="hide-scrollbar">
        <ChatList />
      </SidebarContent>
    </Sidebar>
  );
}
