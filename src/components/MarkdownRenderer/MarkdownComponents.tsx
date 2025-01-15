"use client";

import React from "react";
import Image from "next/image";
import { CodeBlock } from "./CodeBlock";

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export const MarkdownComponents = {
  code: ({ node, className, children }: CodeProps) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    const code = String(children).replace(/\n$/, "");
    const uniqueKey = node?.position?.start.line ?? Math.random();
    if (language) {
      return (
        <CodeBlock code={code} language={language} uniqueKey={uniqueKey} />
      );
    }
    return (
      <code className="rounded-sm bg-muted px-1 py-0.5 text-sm">
        {children}
      </code>
    );
  },
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    return (
      <Image
        src={src || ""}
        alt={alt || "Image"}
        width={600} // Adjust as needed
        height={400} // Adjust as needed
        className="rounded-md object-contain my-4"
      />
    );
  },
  // table: ({ children }: { children: React.ReactNode }) => (
  //   <div className="w-full overflow-auto my-4">
  //     <table className="w-full border-collapse border border-gray-200">
  //       {children}
  //     </table>
  //   </div>
  // ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-left">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="border border-gray-200 px-4 py-2">{children}</td>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="my-2 list-disc list-inside">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="my-2 list-decimal list-inside">{children}</ol>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {children}
    </a>
  ),
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2">
      {children}
    </h3>
  ),
};
