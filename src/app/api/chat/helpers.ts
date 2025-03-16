// customModel.ts
import { openai } from "@ai-sdk/openai";

import { anthropic } from "@ai-sdk/anthropic";
import { mistral } from "@ai-sdk/mistral";
import { google } from "@ai-sdk/google";
import { LanguageModel, experimental_wrapLanguageModel as wrapLanguageModel, Experimental_LanguageModelV1Middleware } from "ai";
import { ModelProviderEnum } from "@/context/ModelContext";

export const getModel = (id: string): LanguageModel => {
  let apiClient;
  const provider = getProvider(id);

  switch (provider) {
    case ModelProviderEnum.OpenAI:
      apiClient = openai(id);
      break;
    case ModelProviderEnum.Anthropic:
      apiClient = anthropic(id);
      break;
    case ModelProviderEnum.Mistral:
      apiClient = mistral(id);
      break;
    case ModelProviderEnum.Gemini:
      apiClient = google(id);
      break;
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }

  return wrapLanguageModel({
    model: apiClient,
    middleware: customMiddleware,
  });
};

function getProvider(modelId: string): ModelProviderEnum {
  switch (modelId) {
    case "gpt-4o":
    case "gpt-4o-mini":
    case "gpt-4-turbo":
    case "gpt-4":
    case "o1-mini":
    case "o1-preview":
    case "o1":
      return ModelProviderEnum.OpenAI;

    case "claude-3-5-sonnet-20241022":
    case "claude-3-5-sonnet-20240620":
    case "claude-3-5-haiku-20241022":
      return ModelProviderEnum.Anthropic;

    case "pixtral-large-latest":
    case "pixtral-12b-2409":
    case "mistral-large-latest":
    case "mistral-small-latest":
      return ModelProviderEnum.Mistral;

    case "gemini-2.0-flash-exp":
    case "gemini-1.5-flash":
    case "gemini-1.5-pro":
      return ModelProviderEnum.Gemini;

    default:
      throw new Error(`Unknown provider for model: ${modelId}`);
  }
}

export const customMiddleware: Experimental_LanguageModelV1Middleware = {};

export const blocksPrompt = `
Blocks is a special user interface mode that helps users with writing, editing, and other content creation tasks. When block is open, it is on the right side of the screen, while the conversation is on the left side. When creating or updating documents, changes are reflected in real-time on the blocks and visible to the user.

When asked to write code, always use blocks. When writing code, specify the language in the backticks, e.g. \`\`\`python\`code here\`\`\`. The default language is Python. Other languages are not yet supported, so let the user know if they request a different language.

DO NOT UPDATE DOCUMENTS IMMEDIATELY AFTER CREATING THEM. WAIT FOR USER FEEDBACK OR REQUEST TO UPDATE IT.

This is a guide for using blocks tools: \`createDocument\` and \`updateDocument\`, which render content on a blocks beside the conversation.

**When to use \`createDocument\`:**
- For substantial content (>10 lines) or code
- For content users will likely save/reuse (emails, code, essays, etc.)
- When explicitly requested to create a document
- For when content contains a single code snippet

**When NOT to use \`createDocument\`:**
- For informational/explanatory content
- For conversational responses
- When asked to keep it in chat

**Using \`updateDocument\`:**
- Default to full document rewrites for major changes
- Use targeted updates only for specific, isolated changes
- Follow user instructions for which parts to modify

**When NOT to use \`updateDocument\`:**
- Immediately after creating a document

Do not update document right after creating it. Wait for user feedback or request to update it.
`;

export const regularPrompt = "You are a friendly assistant! Keep your responses concise and helpful.";

export const systemPrompt = `${regularPrompt}\n\n${blocksPrompt}`;

export const codePrompt = `
You are a Python code generator that creates self-contained, executable code snippets. When writing code:

1. Each snippet should be complete and runnable on its own
2. Prefer using print() statements to display outputs
3. Include helpful comments explaining the code
4. Keep snippets concise (generally under 15 lines)
5. Avoid external dependencies - use Python standard library
6. Handle potential errors gracefully
7. Return meaningful output that demonstrates the code's functionality
8. Don't use input() or other interactive functions
9. Don't access files or network resources
10. Don't use infinite loops

Examples of good snippets:

\`\`\`python
# Calculate factorial iteratively
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

print(f"Factorial of 5 is: {factorial(5)}")
\`\`\`
`;

export const updateDocumentPrompt = (currentContent: string | null) => `\
Update the following contents of the document based on the given prompt.

${currentContent}
`;
