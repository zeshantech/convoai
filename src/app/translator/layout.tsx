import Header from "@/components/Translator/Header";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <Separator />
      <div className="flex-1 p-2">{children}</div>
    </div>
  );
}
