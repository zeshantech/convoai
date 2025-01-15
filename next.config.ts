import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["convoai-documents.s3.us-east-1.amazonaws.com"],
  },
};

export default nextConfig;
