// components/ui/Typography.tsx

import React from "react";
import { cn } from "@/lib/utils"; // Utility function for class merging, optional

type TypographyVariants = "heading" | "subtitle" | "body" | "caption";

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TypographyVariants;
  as?: React.ElementType;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  as: Component = "p",
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    heading: "text-2xl font-bold text-current",
    subtitle: "text-lg font-semibold text-muted",
    body: "text-base text-current",
    caption: "text-sm text-muted",
  };

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
