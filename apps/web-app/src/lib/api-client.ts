import type { AppType } from "@urekoi/workers-api";
import { hc } from "hono/client";
import { API_URL } from "./api-url";

export const apiClient = hc<AppType>(API_URL, {
  init: { credentials: "include" },
});
