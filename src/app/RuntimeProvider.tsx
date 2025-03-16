"use client";

import { AssistantRuntimeProvider, CompositeAttachmentAdapter, SimpleImageAttachmentAdapter, SimpleTextAttachmentAdapter, useEdgeRuntime, WebSpeechSynthesisAdapter } from "@assistant-ui/react";

const RuntimeProvider = ({ children }: { children: React.ReactNode }) => {
  const runtime = useEdgeRuntime({
    api: "/api/chat",
    adapters: {
      speech: new WebSpeechSynthesisAdapter(),
      attachments: new CompositeAttachmentAdapter([new SimpleImageAttachmentAdapter(), new SimpleTextAttachmentAdapter()]),
      feedback: {
        submit: ({ message, type }) => {
          console.log({ message, type }); // TODO: feedback like or unlike
        },
      },
    },
  });

  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
};

export default RuntimeProvider;
