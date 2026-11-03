import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import * as logger from "@urekoi/logger";
import { createSelectSchema } from "drizzle-zod";
import type { AppEnv } from "../../app";
import { profile } from "../../db/schema";

type ProfileRow = typeof profile.$inferSelect;

// リクエストボディの検証
const BodySchema = z.object({
  nickname: z.string().trim().min(1).max(20),
  gender: z.enum(["male", "female"]),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  prefectureCode: z.number().int().min(1).max(47),
});

// POST /api/myprofile の定義
const route = createRoute({
  method: "post",
  path: "/",
  request: {
    body: { content: { "application/json": { schema: BodySchema } } },
  },
  responses: {
    201: {
      description: "プロフィール作成完了",
      content: { "application/json": { schema: createSelectSchema(profile) } },
    },
    400: { description: "バリデーションエラー" },
    500: { description: "内部エラー" },
  },
});

export function createMyProfileRoute() {
  return new OpenAPIHono<{
    Bindings: AppEnv["Bindings"];
    Variables: AppEnv["Variables"] & { userId: string };
  }>().openapi(route, async (c) => {
    const db = c.var.db;
    const userId = c.get("userId");
    const body = c.req.valid("json");

    let created: ProfileRow;
    try {
      [created] = await db
        .insert(profile)
        .values({ userId, ...body })
        .returning();
    } catch (err) {
      logger.error("プロフィールの作成に失敗", { error: err, userId });
      return c.json({ error: "internal server error" }, 500);
    }

    return c.json(created, 201);
  });
}
