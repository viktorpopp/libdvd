import { HeadBucketCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3";

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();
  const bucket = config.s3BucketName;

  try {
    await s3Client.send(new HeadBucketCommand({ Bucket: bucket }));
    console.log("S3 bucket already exists");
  } catch {
    await s3Client.send(new CreateBucketCommand({ Bucket: bucket }));
    console.log("Created new S3 bucket");
  }
});
