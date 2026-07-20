import { createAuthClient } from "better-auth/vue";

let clientInstance: ReturnType<typeof createAuthClient> | null = null;

export const useAuth = () => {
  if (!clientInstance) {
    const config = useRuntimeConfig();

    clientInstance = createAuthClient({
      baseURL: (config.public.authBaseUrl as string) || "http://localhost:3000",
    });
  }

  return clientInstance;
};
