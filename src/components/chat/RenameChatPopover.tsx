import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PenIcon } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useUpdateChat } from "@/hooks/useUpdateChat";

interface RenameChatPopoverProps {
  title: string;
  id: string;
}

export default function RenameChatPopover({
  title,
  id,
}: RenameChatPopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const { trigger } = useUpdateChat();

  const handleSave = async () => {
    setPopoverOpen(false);
    await trigger({ id, title: newTitle });
  };

  const handleCancel = () => {
    setPopoverOpen(false);
    alert("Canceling rename");
  };

  return (
    <Popover open={popoverOpen}>
      <PopoverTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            setPopoverOpen(!popoverOpen);
          }}
          className="cursor-pointer"
        >
          <PenIcon className="text-muted-foreground" />
          <span>Rename</span>
        </DropdownMenuItem>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h3 className="text-lg font-semibold mb-2">Rename Chat</h3>
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value.substring(0, 80))}
          className="w-full mb-4"
          placeholder="New title"
        />
        <div className="flex justify-end space-x-2">
          <Button onClick={handleCancel} variant={"secondary"}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
