import React, { useState } from "react";
import { SidebarHeader, SidebarInput } from "../ui/sidebar";
import { Plus, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { ThreadListPrimitive } from "@assistant-ui/react";

export default function ChatSidebarHeader() {
  const [showInput, setShowInput] = useState(false);

  return (
    <SidebarHeader>
      <div className={`flex justify-end gap-1`}>
        <Button onClick={() => setShowInput(!showInput)} size={"icon"} variant={"outline"}>
          {showInput ? <X /> : <Search />}
        </Button>
        <ThreadListPrimitive.New>
          <Button size={"icon"} variant={"outline"}>
            <Plus />
          </Button>
        </ThreadListPrimitive.New>
      </div>
      {showInput ? <SidebarInput autoFocus id="search" placeholder="Search the docs..." /> : null}
    </SidebarHeader>
  );
}
