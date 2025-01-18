import React, { useState } from "react";
import { SidebarHeader, SidebarInput, useSidebar } from "../ui/sidebar";
import { Plus, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { generateObjectId } from "@/lib/utils";

export default function ChatSidebarHeader() {
  const { open } = useSidebar();
  const router = useRouter();
  const [showInput, setShowInput] = useState(false);

  return (
    <SidebarHeader>
      <div className={`flex ${open ? "flex-row" : "flex-col"} justify-end gap-1`}>
        <Button onClick={() => setShowInput(!showInput)} size={"icon"} variant={"outline"}>
          {showInput ? <X /> : <Search />}
        </Button>
        <Button onClick={() => router.push(`/chat/${generateObjectId()}`)} size={"icon"} variant={"outline"}>
          <Plus />
        </Button>
      </div>
      {showInput ? <SidebarInput autoFocus id="search" placeholder="Search the docs..." /> : null}
    </SidebarHeader>
  );
}
