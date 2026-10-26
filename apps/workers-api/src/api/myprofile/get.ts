import { createRoute, type RouteHandler } from "@hono/zod-openapi";
import * as logger from "@urekoi/logger";
import { myProfileService } from "../../application/myprofile/service";
import type { ProfileRow } from "../../application/myprofile/repository";
import { profileResponseSchema } from "./schema";

export const route = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "プロフィール取得",
      content: { "application/json": { schema: profileResponseSchema } },
    },
    404: { description: "プロフィール未作成" },
    500: { description: "内部エラー" },
  },
});

export const handler: RouteHandler<
  typeof route,
  { Bindings: Env; Variables: { userId: string } }
> = async (c) => {
  const userId = c.get("userId");

  let found: ProfileRow | null;
  try {
    found = await myProfileService.getProfile(userId);
  } catch (err) {
    logger.error("プロフィールの取得に失敗", { error: err, userId });
    return c.json({ error: "internal server error" }, 500);
  }

  if (found === null) {
    return c.json({ error: "profile not found" }, 404);
  }

  return c.json(found, 200);
};
