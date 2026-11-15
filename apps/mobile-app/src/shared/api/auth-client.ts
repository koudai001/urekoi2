import { expoClient } from "@better-auth/expo/client";
import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/shared/config/api-url";

export const authClient = createAuthClient({
  baseURL: API_URL,
  plugins: [
    expoClient({
      scheme: "mobileapp",
      storagePrefix: "urekoi",
      storage: SecureStore,
    }),
    emailOTPClient(),
  ],
});
