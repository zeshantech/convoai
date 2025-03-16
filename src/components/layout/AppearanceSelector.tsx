import React from "react";
import { SidebarMenuButton } from "../ui/sidebar";
import { SidebarMenu } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../ui/dropdown-menu";
import { Laptop, Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "@/context/Theme.context";

export default function AppearanceSelector() {
  const { setTheme } = useTheme();

  return (
    <SidebarMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <SunMoon />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-32 rounded-lg" side="right" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Laptop className="h-4 w-4" />
              System
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenu>
  );
}
