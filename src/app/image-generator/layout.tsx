import Header from "@/components/ImageGenerator/Header";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex-1 hide-scrollbar">
      <Header />
      {children}
    </div>
  );
}
