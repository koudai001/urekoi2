import type { AppType } from "@urekoi/workers-api";
import { hc } from "hono/client";
import { authClient } from "@/shared/api/auth-client";
import { fetchWithTimeout } from "@/shared/api/fetch-with-timeout";
import { API_URL } from "@/shared/config/api-url";

export const apiClient = hc<AppType>(API_URL, {
  fetch: fetchWithTimeout,
  headers: async () => ({ Cookie: await authClient.getCookie() }),
  init: { credentials: "omit" },
});
