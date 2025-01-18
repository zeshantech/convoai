"use client";

import { Badge, ChevronsUpDown, Key, LogOut, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Fragment } from "react";
import { signOut, useSession } from "next-auth/react";

export function AppSidebarFooter() {
  const { data } = useSession();
  const { isMobile } = useSidebar();

  const menuList = [
    {
      title: "Upgrade to Pro",
      icon: <Sparkles />,
      onClick: () => alert("upgrade"),
    },

    { title: "Api Keys", icon: <Key />, onClick: () => alert("api keys") },
    { title: "Support", icon: <Badge />, onClick: () => alert("support") },

    { title: "Log out", icon: <LogOut />, onClick: () => signOut() },
  ];

  if (!data) {
    return <></>;
  }

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={data.user.image!} alt={data.user.name!} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{data.user.name}</span>
                  <span className="truncate text-xs">{data.user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
              <DropdownMenuGroup>
                {menuList.map((item, index) => (
                  <Fragment key={index}>
                    {index === 1 || index === 3 ? <DropdownMenuSeparator key={index} /> : null}
                    <DropdownMenuItem className="cursor-pointer" onClick={item.onClick}>
                      {item.icon}
                      {item.title}
                    </DropdownMenuItem>
                  </Fragment>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
