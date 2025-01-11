"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";
import DOMPurify from "dompurify";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Sanitize the content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <ReactMarkdown
      children={sanitizedContent}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        img({ node, ...props }) {
          return (
            <Image
              src={props.src || ""}
              alt={props.alt || "Image"}
              width={500} // Adjust width as needed
              height={300} // Adjust height as needed
              className="rounded-md object-contain"
            />
          );
        },
      }}
    />
  );
};

export default MarkdownRenderer;
