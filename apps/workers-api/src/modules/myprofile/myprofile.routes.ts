import { OpenAPIHono } from "@hono/zod-openapi";
import type { AppEnv } from "../../app";
import { requireAuth } from "../../middleware/require-auth";
import { createMyProfileRoute } from "./create-my-profile";
import { getMyProfileRoute } from "./get-my-profile";

// myprofile 機能の API をまとめる（全部ログイン必須）
export function myprofileRoutes() {
  return new OpenAPIHono<{
    Bindings: AppEnv["Bindings"];
    Variables: AppEnv["Variables"] & { userId: string };
  }>()
    .use(requireAuth)
    .route("/", getMyProfileRoute())
    .route("/", createMyProfileRoute());
}
