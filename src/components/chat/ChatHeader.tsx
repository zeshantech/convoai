import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { ModelSelector } from "./ModelSelector";
import { Separator } from "../ui/separator";

export default function ChatHeader() {
  return (
    <div className="flex items-center p-4 gap-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" />
      <ModelSelector />
    </div>
  );
}
