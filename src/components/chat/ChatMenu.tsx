import React from "react";
import { SidebarMenuAction, useSidebar } from "../ui/sidebar";
import { Archive, Forward, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import RenameChatPopover from "./RenameChatPopover";
import { useDeleteChat } from "@/hooks/useDeleteChat";

interface ChatMenuProps {
  id: string;
  title: string;
}

export default function ChatMenu({ id, title }: ChatMenuProps) {
  const { isMobile } = useSidebar();
  const { trigger: deleteTrigger } = useDeleteChat();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          <RenameChatPopover id={id} title={title} />
          <DropdownMenuItem className="cursor-pointer">
            <Forward className="text-muted-foreground" />
            <span>Share</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Archive className="text-muted-foreground" />
            <span>Archive</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => deleteTrigger(id)}
          >
            <Trash2 className="text-muted-foreground" />
            <span>Delete Project</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
