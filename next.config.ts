import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "convoai-documents.s3.us-east-1.amazonaws.com",
      "plugins-media.makeupar.com",
      "static.vecteezy.com",
      "cdn.pixabay.com",
      "images.pexels.com",
      "cdn.pixabay.com",
    ],
  },
};

export default nextConfig;
