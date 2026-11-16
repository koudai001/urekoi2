import { OpenAPIHono } from "@hono/zod-openapi";
import type { AuthedEnv } from "../_shared/context";
import { requireAuth } from "../_shared/require-auth";
import { createMyProfileRoute } from "./create-my-profile";
import { getMyProfileRoute } from "./get-my-profile";

// myprofile 機能の API をまとめる（全部ログイン必須）
export function myprofileRoutes() {
  return new OpenAPIHono<AuthedEnv>()
    .use(requireAuth)
    .route("/", getMyProfileRoute())
    .route("/", createMyProfileRoute());
}
