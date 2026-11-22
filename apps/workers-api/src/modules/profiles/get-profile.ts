import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import * as logger from "@urekoi/logger";
import { eq } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { profile } from "../../db/schema";
import type { AuthedEnv } from "../_shared/context";

type ProfileRow = typeof profile.$inferSelect;

// パス（/:id）の検証。文字列で届くので数値に変換する
const ParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// GET /api/profiles/{id} の定義
const route = createRoute({
  method: "get",
  path: "/{id}",
  request: { params: ParamsSchema },
  responses: {
    200: {
      description: "お相手のプロフィール",
      content: { "application/json": { schema: createSelectSchema(profile) } },
    },
    400: { description: "id が不正" },
    404: { description: "プロフィールが存在しない" },
    500: { description: "内部エラー" },
  },
});

export function getProfileRoute() {
  return new OpenAPIHono<AuthedEnv>().openapi(route, async (c) => {
    const db = c.var.db;
    const userId = c.get("userId");
    const { id } = c.req.valid("param");

    let found: ProfileRow | undefined;
    try {
      [found] = await db
        .select()
        .from(profile)
        .where(eq(profile.id, id))
        .limit(1);
    } catch (err) {
      logger.error("お相手のプロフィールの取得に失敗", {
        error: err,
        userId,
        id,
      });
      return c.json({ error: "internal server error" }, 500);
    }

    if (found === undefined) {
      return c.json({ error: "profile not found" }, 404);
    }

    return c.json(found, 200);
  });
}
