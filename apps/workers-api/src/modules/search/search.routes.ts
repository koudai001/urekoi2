import { OpenAPIHono } from "@hono/zod-openapi";
import type { AppEnv } from "../../app";
import { requireAuth } from "../../middleware/require-auth";
import { listSearchProfilesRoute } from "./list-search-profiles";

// search 機能の API をまとめる（全部ログイン必須）
export function searchRoutes() {
  return new OpenAPIHono<{
    Bindings: AppEnv["Bindings"];
    Variables: AppEnv["Variables"] & { userId: string };
  }>()
    .use(requireAuth)
    .route("/", listSearchProfilesRoute());
}
