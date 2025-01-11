import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function uploadToS3(body: string | Buffer, fileName: string, contentType: string) {
  const bucketName = process.env.S3_BUCKET_NAME!;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: body,
    ContentType: contentType,
  });

  await s3.send(command);

  return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
}
