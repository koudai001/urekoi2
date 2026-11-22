import type { AppType } from "@urekoi/workers-api";
import { hc } from "hono/client";
import { API_URL } from "../config/api-url";
import { fetchWithTimeout } from "./fetch-with-timeout";

export const apiClient = hc<AppType>(API_URL, {
  fetch: fetchWithTimeout,
  init: { credentials: "include" },
});
