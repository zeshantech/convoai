"use client";

// src/components/SettingsDrawer.tsx
import React from "react";
import { Settings, Rabbit, Bird, Turtle, Sidebar } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SidebarContent, SidebarHeader, SidebarTrigger } from "../ui/sidebar";

const SettingsDrawer: React.FC = () => {
  return (
    <Sidebar>
      <SidebarTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </SidebarTrigger>
      <SidebarContent className="max-h-[80vh]">
        <SidebarHeader></SidebarHeader>
        <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
          {/* Settings Fieldset */}
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
            <div className="grid gap-3">
              <Label htmlFor="model">Model</Label>
              <Select>
                <SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genesis" label="Neural Genesis">
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
                  <SelectItem value="explorer" label="Neural Explorer">
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
                  <SelectItem value="quantum" label="Neural Quantum">
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
            <div className="grid gap-3">
              <Label htmlFor="top-p">Top P</Label>
              <Input id="top-p" type="number" placeholder="0.7" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="top-k">Top K</Label>
              <Input id="top-k" type="number" placeholder="0.0" />
            </div>
          </fieldset>
          {/* Messages Fieldset */}
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
            <div className="grid gap-3">
              <Label htmlFor="role">Role</Label>
              <Select>
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
              <Textarea id="content" placeholder="You are a..." />
            </div>
          </fieldset>
        </form>
      </SidebarContent>
    </Sidebar>
  );
};

export default SettingsDrawer;
