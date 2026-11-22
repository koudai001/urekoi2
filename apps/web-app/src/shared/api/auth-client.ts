import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { API_URL } from "../config/api-url";
import { fetchWithTimeout } from "./fetch-with-timeout";

export const authClient = createAuthClient({
  baseURL: API_URL,
  fetchOptions: { customFetchImpl: fetchWithTimeout },
  plugins: [emailOTPClient()],
});
