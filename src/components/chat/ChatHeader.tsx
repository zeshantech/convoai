"use client";

import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { ModelSelector } from "./ModelSelector";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ChatHeader() {
  const { status } = useSession();
  const isAuth = status === "authenticated";
  const router = useRouter();

  return (
    <header className="bg-background absolute w-full top-0 z-10 flex h-14 items-center gap-4 border-b px-4 flex-wrap">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" />
      <ModelSelector />

      {!isAuth ? (
        <div className="ml-auto space-x-2">
          <Button onClick={() => router.push("/auth/register")} className="ml-auto" variant={"outline"}>
            Create new Account
          </Button>
          <Button onClick={() => router.push("/auth/login")} className="ml-auto">
            Login
          </Button>
        </div>
      ) : null}
    </header>
  );
}
