"use client";

import React, { useState, useMemo } from "react";
import { Highlight, Language, themes } from "prism-react-renderer";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, Sun, Moon } from "lucide-react";
import { toast } from "sonner";

interface CodeBlockProps {
  code: string;
  language: Language;
  uniqueKey: number | string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);

  const processedCode = useMemo(() => {
    return code
      .replace(/\r\n/g, "\n")
      .trim()
      .replace(/\n{3,}/g, "\n\n");
  }, [code]);

  const handleCopyCode = async () => {
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(processedCode);
        toast.success("Copied to clipboard");
      } catch (error) {
        toast("Copy failed");
      }
    } else {
      toast("Clipboard not supported");
    }
  };

  return (
    <div className="rounded-lg bg-background overflow-hidden my-4 w-full">
      <div className="flex items-center justify-between bg-muted px-3 py-1">
        <div className="text-sm font-medium text-muted-foreground">
          {language}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowLineNumbers((prev) => !prev)}
          >
            {showLineNumbers ? <EyeOff /> : <Eye />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkTheme((prev) => !prev)}
          >
            {darkTheme ? <Sun /> : <Moon />}
          </Button>

          <Button variant="ghost" size="icon" onClick={handleCopyCode}>
            <Copy />
          </Button>
        </div>
      </div>

      <Highlight key={2} code={processedCode} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-4 overflow-auto hide-scrollbar`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {showLineNumbers && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "2em",
                      userSelect: "none",
                      opacity: 0.5,
                    }}
                  >
                    {i + 1}
                  </span>
                )}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
