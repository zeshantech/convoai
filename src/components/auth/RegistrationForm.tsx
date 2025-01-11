'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SocialSignin from "./SocialSignin";
import { Separator } from "../ui/separator";
import Link from "next/link";
import TermAndConditionLink from "./TermAndConditionLink";

export function RegistrationForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push("/auth/signin");
    } else {
      const data = await res.json();
      console.error(data.message);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>We recommend use your Personal Email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input label="Full Name" value={name} onChange={(e) => setName(e.target?.value)} id="name" required />
              <Input label="Email" value={email} onChange={(e) => setEmail(e.target?.value)} id="email" type="email" required />
              <Input label="Password" value={password} onChange={(e) => setPassword(e.target?.value)} id="password" type="password" required />

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="login" className="underline underline-offset-4">
                Login
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
