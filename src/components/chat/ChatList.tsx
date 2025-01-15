"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ChatMenu from "./ChatMenu";
import { useGetChats } from "@/hooks/useGetChats";
import Link from "next/link";

export function ChatList() {
  const { data } = useGetChats();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {data?.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <Link href={item.id}>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
            <ChatMenu id={item.id} title={item.title} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
