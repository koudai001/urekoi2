import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import * as logger from "@urekoi/logger";
import { eq } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import type { AppEnv } from "../../app";
import { profile } from "../../db/schema";

type ProfileRow = typeof profile.$inferSelect;

// GET /api/myprofile の定義
const route = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "プロフィール取得",
      content: { "application/json": { schema: createSelectSchema(profile) } },
    },
    404: { description: "プロフィール未作成" },
    500: { description: "内部エラー" },
  },
});

export function getMyProfileRoute() {
  return new OpenAPIHono<{
    Bindings: AppEnv["Bindings"];
    Variables: AppEnv["Variables"] & { userId: string };
  }>().openapi(route, async (c) => {
    const db = c.var.db;
    const userId = c.get("userId");

    let found: ProfileRow | undefined;
    try {
      [found] = await db
        .select()
        .from(profile)
        .where(eq(profile.userId, userId))
        .limit(1);
    } catch (err) {
      logger.error("プロフィールの取得に失敗", { error: err, userId });
      return c.json({ error: "internal server error" }, 500);
    }

    if (found === undefined) {
      return c.json({ error: "profile not found" }, 404);
    }

    return c.json(found, 200);
  });
}
