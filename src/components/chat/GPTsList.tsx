import { Code, MessageCircle, Image, Globe } from "lucide-react";

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function GPTsList() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {gpts.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const gpts = [
  { title: "Chat", icon: MessageCircle },
  { title: "Image Generation", icon: Image },
  { title: "Translator", icon: Globe },
  { title: "Code Assistant", icon: Code },
];
