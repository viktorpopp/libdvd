export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  typescript: {
    nodeTsConfig: {
      include: ["../prisma.config.ts"],
      compilerOptions: {
        types: ["@types/node"],
      },
    },
  },
  runtimeConfig: {
    s3AccessKey: process.env.RUSTFS_ACCESS_KEY,
    s3SecretKey: process.env.RUSTFS_SECRET_KEY,
    s3Endpoint: process.env.RUSTFS_ENDPOINT,
    s3Region: process.env.RUSTFS_REGION,
    s3BucketName: process.env.RUSTFS_BUCKET_NAME,
    public: {
      authBaseUrl: process.env.BETTER_AUTH_URL,
    },
  },
});
