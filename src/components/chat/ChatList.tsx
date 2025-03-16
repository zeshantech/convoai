"use client";

import React from "react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import ChatMenu from "./ChatMenu";
import { useThreadList } from "@assistant-ui/react";

export const ChatList: React.FC = () => {
  const { threads } = useThreadList();

  return (
    <div id="sidebar-scrollable">
      <SidebarGroup key={"today"}>
        <SidebarGroupLabel className="sticky top-0 bg-sidebar z-10 rounded-none">{"Today"}</SidebarGroupLabel>

        <SidebarMenu>
          {threads.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <span>{item}</span>
              </SidebarMenuButton>

              <ChatMenu id={"thread-id"} title={item} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
};
