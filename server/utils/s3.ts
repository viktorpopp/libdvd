import { S3Client } from "@aws-sdk/client-s3";

const s3ClientSingleton = () => {
  const config = useRuntimeConfig();

  return new S3Client({
    region: config.s3Region || "eu-west-1",
    endpoint: config.s3Endpoint,
    credentials: {
      accessKeyId: config.s3AccessKey,
      secretAccessKey: config.s3SecretKey,
    },
    forcePathStyle: true,
  });
};

type S3ClientSingleton = ReturnType<typeof s3ClientSingleton>;

const globalforS3Client = globalThis as unknown as {
  s3Client: S3ClientSingleton | undefined;
};

export const s3Client = globalforS3Client.s3Client ?? s3ClientSingleton();

if (process.env.NODE_ENV !== "production")
  globalforS3Client.s3Client = s3Client;
