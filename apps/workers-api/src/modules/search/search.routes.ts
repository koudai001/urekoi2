import { OpenAPIHono } from "@hono/zod-openapi";
import type { AuthedEnv } from "../_shared/context";
import { requireAuth } from "../_shared/require-auth";
import { listSearchProfilesRoute } from "./list-search-profiles";

// search 機能の API をまとめる（全部ログイン必須）
export function searchRoutes() {
  return new OpenAPIHono<AuthedEnv>()
    .use(requireAuth)
    .route("/", listSearchProfilesRoute());
}
