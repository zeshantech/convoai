"use client";

// src/components/MainContent.tsx
import React from "react";
import { Paperclip, Mic, CornerDownLeft, Rabbit, Bird, Turtle, Badge } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger } from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tooltip } from "../ui/tooltip";
import { Button } from "../ui/button";

const MainContent: React.FC = () => {
  return (
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="relative hidden flex-col items-start gap-8 md:flex">
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
            <div className="grid gap-3">
              <Label htmlFor="model">Model</Label>
              <Select>
                <SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genesis">
                    <div className="text-muted-foreground flex items-start gap-3">
                      <Rabbit className="h-5 w-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural <span className="text-foreground font-medium">Genesis</span>
                        </p>
                        <p className="text-xs" data-description>
                          Our fastest model for general use cases.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="explorer">
                    <div className="text-muted-foreground flex items-start gap-3">
                      <Bird className="h-5 w-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural <span className="text-foreground font-medium">Explorer</span>
                        </p>
                        <p className="text-xs" data-description>
                          Performance and speed for efficiency.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="quantum">
                    <div className="text-muted-foreground flex items-start gap-3">
                      <Turtle className="h-5 w-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural <span className="text-foreground font-medium">Quantum</span>
                        </p>
                        <p className="text-xs" data-description>
                          The most powerful model for complex computations.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="temperature">Temperature</Label>
              <Input id="temperature" type="number" placeholder="0.4" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="top-p">Top P</Label>
                <Input id="top-p" type="number" placeholder="0.7" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">Top K</Label>
                <Input id="top-k" type="number" placeholder="0.0" />
              </div>
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
            <div className="grid gap-3">
              <Label htmlFor="role">Role</Label>
              <Select defaultValue={{ value: "system", label: "System" }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="assistant">Assistant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="You are a..." className="min-h-[9.5rem]" />
            </div>
          </fieldset>
        </form>
      </div>
      <div className="bg-muted/50 relative flex h-full min-h-[50vh] flex-col rounded-xl p-4 lg:col-span-2">
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
        <div className="flex-1" />
        <form className="bg-background focus-within:ring-ring relative overflow-hidden rounded-lg border focus-within:ring-1">
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea id="message" placeholder="Type your message here..." className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0" />
          <div className="flex items-center p-3 pt-0">
            <Tooltip content="Attach File" placement="top">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </Tooltip>
            <Tooltip content="Use Microphone" placement="top">
              <Button variant="ghost" size="icon">
                <Mic className="h-4 w-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </Tooltip>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="h-3.5 w-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default MainContent;
