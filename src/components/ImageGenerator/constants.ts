export const MODELS = [
  {
    id: "dall-e-3",
    label: "DALL·E 3",
    description: "Generates high-quality images with advanced capabilities.",
    provider: "OpenAI",
    image: "/providers/openai.svg",
    supportedSizes: ["1024x1024", "1792x1024", "1024x1792"], // Added sizes
  },
  {
    id: "dall-e-2",
    label: "DALL·E 2",
    description: "Versatile image generation model with multiple size options.",
    provider: "OpenAI",
    image: "/providers/openai.svg",
    supportedSizes: ["256x256", "512x512", "1024x1024"], // Added sizes
  },
  {
    id: "imagen-3.0-generate-001",
    label: "Imagen 3.0",
    description: "Supports various aspect ratios for diverse image outputs.",
    provider: "Google Vertex",
    image: "/providers/google.svg",
    supportedSizes: ["1:1", "3:4", "4:3", "9:16", "16:9"], // Added aspect ratios
  },
  {
    id: "black-forest-labs/flux-schnell",
    label: "Flux Schnell",
    description: "Flexible aspect ratios for creative image generations.",
    provider: "Replicate",
    image: "/providers/google.svg",
    supportedSizes: ["1:1", "2:3", "3:2", "4:5", "5:4", "16:9", "9:16", "9:21", "21:9"], // Added aspect ratios
  },
  {
    id: "recraft-ai/recraft-v3",
    label: "Recraft V3",
    description: "Provides large image outputs for high-quality visualizations.",
    provider: "Replicate",
    image: "/providers/google.svg",
    supportedSizes: ["1024x1024", "1365x1024", "1024x1365", "1536x1024", "1024x1536", "1820x1024", "1024x1820", "1024x2048", "2048x1024", "1434x1024", "1024x1434", "1024x1280", "1280x1024", "1024x1707", "1707x1024"], // Added sizes
  },
];
