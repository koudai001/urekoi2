import { createRoute, type RouteHandler } from "@hono/zod-openapi";
import * as logger from "@urekoi/logger";
import { myProfileService } from "../../application/myprofile/service";
import type { ProfileRow } from "../../application/myprofile/repository";
import { createProfileSchema, profileResponseSchema } from "./schema";

export const route = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: { "application/json": { schema: createProfileSchema } },
    },
  },
  responses: {
    201: {
      description: "プロフィール作成完了",
      content: { "application/json": { schema: profileResponseSchema } },
    },
    400: { description: "バリデーションエラー" },
    500: { description: "内部エラー" },
  },
});

export const handler: RouteHandler<
  typeof route,
  { Bindings: Env; Variables: { userId: string } }
> = async (c) => {
  const userId = c.get("userId");
  const data = c.req.valid("json");

  let created: ProfileRow;
  try {
    created = await myProfileService.createProfile(userId, data);
  } catch (err) {
    logger.error("プロフィールの作成に失敗", { error: err, userId });
    return c.json({ error: "internal server error" }, 500);
  }

  return c.json(created, 201);
};
