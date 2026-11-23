import { OpenAPIHono } from "@hono/zod-openapi";
import type { AuthedEnv } from "../_shared/context";
import { requireAuth } from "../_shared/require-auth";
import { getProfileRoute } from "./get-profile";

// profiles 機能の API をまとめる（全部ログイン必須）
export function profilesRoutes() {
  return new OpenAPIHono<AuthedEnv>()
    .use(requireAuth)
    .route("/", getProfileRoute());
}
