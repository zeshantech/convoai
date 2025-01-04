import React from "react";
import { SidebarMenuAction, useSidebar } from "../ui/sidebar";
import { Archive, Forward, MoreHorizontal, PenIcon, Trash2 } from "lucide-react";
import { DropdownMenuItem, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator } from "../ui/dropdown-menu";

export default function ChatMenu() {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction showOnHover>
          <MoreHorizontal />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 rounded-lg" side={isMobile ? "bottom" : "right"} align={isMobile ? "end" : "start"}>
        <DropdownMenuItem className="cursor-pointer">
          <PenIcon className="text-muted-foreground" />
          <span>Rename</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Forward className="text-muted-foreground" />
          <span>Share</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Archive className="text-muted-foreground" />
          <span>Archive</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Trash2 className="text-muted-foreground" />
          <span>Delete Project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
