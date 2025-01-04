import React from "react";
import { SidebarHeader, useSidebar } from "../ui/sidebar";
import { Plus, Search } from "lucide-react";
import { Button } from "../ui/button";

export default function ChatSidebarHeader() {
  const { open } = useSidebar();

  return (
    <SidebarHeader className={`${open ? "flex-row" : "flex-col"} justify-end`}>
      <Button size={"icon"} variant={"outline"}>
        <Search />
      </Button>
      <Button size={"icon"} variant={"outline"}>
        <Plus />
      </Button>
    </SidebarHeader>
  );
}
