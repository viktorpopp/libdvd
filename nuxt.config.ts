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
    s3AccessKey: process.env.RUSTFS_ACCESS_KEY || "",
    s3SecretKey: process.env.RUSTFS_SECRET_KEY || "",
    s3Endpoint: process.env.RUSTFS_ENDPOINT || "http://rustfs:9000",
    s3Region: process.env.RUSTFS_REGION,
    s3BucketName: process.env.RUSTFS_BUCKET_NAME || "images",
    public: {
      authBaseUrl:
        process.env.NUXT_PUBLIC_AUTH_BASE_URL || "http://localhost:3000",
    },
  },
});
