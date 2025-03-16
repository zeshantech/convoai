"use client";

import AppSidebar from "@/components/layout/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModelProvider } from "@/context/ModelContext";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { HotkeysProvider } from "react-hotkeys-hook";
import { Toaster } from "sonner";
import RuntimeProvider from "./RuntimeProvider";
import { ThemeProvider } from "@/context/Theme.context";
import "react-simple-keyboard/build/css/index.css";

export default function Providers({ session, children }: { session: Session | null; children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add("dark");
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SessionProvider session={session}>
      <ModelProvider>
        <TooltipProvider>
          <HotkeysProvider>
            <ThemeProvider>
              <RuntimeProvider>
                <SidebarProvider open={false}>
                  <AppSidebar />
                  <SidebarInset>
                    <Toaster position="top-center" richColors />
                    {children}
                  </SidebarInset>
                </SidebarProvider>
              </RuntimeProvider>
            </ThemeProvider>
          </HotkeysProvider>
        </TooltipProvider>
      </ModelProvider>
    </SessionProvider>
  );
}
