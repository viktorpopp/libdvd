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
    public: {
      authBaseUrl:
        process.env.NUXT_PUBLIC_AUTH_BASE_URL || "http://localhost:3000",
    },
  },
});
