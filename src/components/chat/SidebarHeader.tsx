import React from "react";
import { SidebarHeader, useSidebar } from "../ui/sidebar";
import { Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { generateObjectId } from "@/lib/utils";

export default function ChatSidebarHeader() {
  const { open } = useSidebar();
  const router = useRouter();

  return (
    <SidebarHeader className={`${open ? "flex-row" : "flex-col"} justify-end`}>
      <Button size={"icon"} variant={"outline"}>
        <Search />
      </Button>
      <Button
        onClick={() => router.push(`/chat/${generateObjectId()}`)}
        size={"icon"}
        variant={"outline"}
      >
        <Plus />
      </Button>
    </SidebarHeader>
  );
}
