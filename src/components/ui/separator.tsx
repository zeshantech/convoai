"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  text?: React.ReactNode;
}

const Separator = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(({ className, orientation = "horizontal", decorative = true, text, ...props }, ref) => {
  if (text) {
    return (
      <div className={cn("flex items-center", className)} {...props}>
        <span className="flex-grow border-t border-border"></span>
        <span className="mx-2 text-sm text-muted-foreground">{text}</span>
        <span className="flex-grow border-t border-border"></span>
      </div>
    );
  }

  return <SeparatorPrimitive.Root ref={ref} decorative={decorative} orientation={orientation} className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)} {...props} />;
});

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
