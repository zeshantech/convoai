"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ModelProvider } from "@/context/ModelContext";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { HotkeysProvider } from "react-hotkeys-hook";
import { Toaster } from "sonner";

export default function Providers({ session, children }: { session: Session | null; children: React.ReactNode }) {
  return (
    <div>
      <SessionProvider session={session}>
        <ModelProvider>
          <TooltipProvider>
            <HotkeysProvider>
              <Toaster position="top-center" />
              {children}
            </HotkeysProvider>
          </TooltipProvider>
        </ModelProvider>
      </SessionProvider>
    </div>
  );
}
