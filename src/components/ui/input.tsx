import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { ComponentProps, useState, forwardRef } from "react";

export interface InputProps extends ComponentProps<"input"> {
  label?: string;
  error?: string;
  inputClassName?: string;
  passwordVisibility?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      type,
      label,
      error,
      passwordVisibility = true,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const isPasswordType = type === "password";
    const shouldShowPasswordToggle = isPasswordType && passwordVisibility;

    return (
      <div className={cn("space-y-2", className)}>
        {label && <Label>{label}</Label>}
        <div className="relative">
          <input
            type={isPasswordType ? (showPassword ? "text" : "password") : type}
            className={cn(
              "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
              error && "!border-error",
              shouldShowPasswordToggle && "pr-10",
              inputClassName
            )}
            ref={ref}
            {...props}
          />
          {shouldShowPasswordToggle && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };