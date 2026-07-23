import { createAuthClient } from "better-auth/vue";

let clientInstance: ReturnType<typeof createAuthClient> | null = null;

export const useAuth = () => {
  if (!clientInstance) {
    const config = useRuntimeConfig();

    if (!config.public.authBaseUrl) {
      console.log("give me auth url pls");
      process.exit(69);
    }

    clientInstance = createAuthClient({
      baseURL: config.public.authBaseUrl,
    });
  }

  return clientInstance;
};
