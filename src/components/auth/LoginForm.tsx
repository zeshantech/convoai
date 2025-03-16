"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import SocialSignin from "./SocialSignin";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import Link from "next/link";
import TermAndConditionLink from "./TermAndConditionLink";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      callbackUrl: "/chat",
      email,
      password,
    });
    if (res?.error) {
      toast.error(res.error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Apple or Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input label="Email" value={email} onChange={(e) => setEmail(e.target?.value)} id="email" type="email" required />
              <Input label="Password" value={password} onChange={(e) => setPassword(e.target?.value)} id="password" type="password" required />
              <Link href="forgot-password" className="text-sm hover:underline flex justify-end">
                Forgot your password?
              </Link>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
            <Separator text="Or continue with" />
            <SocialSignin />
          </div>
        </CardContent>
      </Card>
      <TermAndConditionLink />
    </div>
  );
}
