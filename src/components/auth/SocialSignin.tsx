import React from "react";
import { Button } from "../ui/button";
import { Apple, Github, GoalIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SocialSignin() {
  const handleOnGoogleSignin = async () => {
    await signIn("google", { callbackUrl: "/chat/n" });
  };

  const handleOnGithubSignin = async () => {
    await signIn("github", { callbackUrl: "/chat/n" });
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" className="w-full">
        <Apple />
      </Button>
      <Button onClick={handleOnGoogleSignin} variant="outline" className="w-full">
        <GoalIcon />
      </Button>
      <Button onClick={handleOnGithubSignin} variant="outline" className="w-full">
        <Github />
      </Button>
    </div>
  );
}
