import React from "react";
import { Code, ImageIcon, Globe, MessageCircle } from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { AppSidebarFooter } from "./AppSidebarFooter";
import Image from "next/image";
import Link from "next/link";
import AppearanceSelector from "./AppearanceSelector";

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
              <Link href={item.link} key={item.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}

                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <AppearanceSelector />

        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

const GPTS = [
  { title: "Chat", icon: MessageCircle, link: "/chat" },
  { title: "Image Generation", icon: ImageIcon, link: "/image-generator" },
  { title: "Translator", icon: Globe, link: "/translator" },
  { title: "Code Assistant", icon: Code, link: "/code-assistant" },
];
