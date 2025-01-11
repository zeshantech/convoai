import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION;
const bucketName = process.env.S3_BUCKET_NAME;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { fileType } = await req.json();

    const extension = fileType.split('/')[1];
    const objectKey = `uploads/${Date.now()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      ContentType: fileType,
    });

    const presignedUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600, // URL valid for 1 hour
    });

    const objectUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${objectKey}`;

    return NextResponse.json({ url: presignedUrl, objectUrl });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json({ error: "Failed to generate presigned URL" }, { status: 500 });
  }
}
