import React from "react";
import { Code, ImageIcon, Globe, MessageCircle } from "lucide-react";

import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { AppSidebarFooter } from "./AppSidebarFooter";
import Image from "next/image";

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-center">
        <Image src="/logo.png" width={56} height={56} alt="Assistant" className="rounded-full" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {GPTS.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}

                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
}

const GPTS = [
  { title: "Chat", icon: MessageCircle },
  { title: "Image Generation", icon: ImageIcon },
  { title: "Translator", icon: Globe },
  { title: "Code Assistant", icon: Code },
];
