import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import * as logger from "@urekoi/logger";
import { and, desc, eq, lt, ne, or, type SQL } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import type { AppEnv } from "../../app";
import { profile } from "../../db/schema";

// 1 回に返す件数（既定と上限）
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

// クエリ（?limit=&cursor=）の検証。クエリは文字列で届くので limit は数値に変換する
const QuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(MAX_LIMIT).optional(),
  cursor: z.string().optional(),
});

// レスポンスの形。続きがなければ nextCursor は null
const ResponseSchema = z.object({
  profiles: z.array(createSelectSchema(profile)),
  nextCursor: z.string().nullable(),
});

type ProfileRow = typeof profile.$inferSelect;

// 前ページ最終行の createdAt + id（新しい順で辿るので「これより前」を取る）
type SearchCursor = {
  createdAt: Date;
  id: number;
};

// timetracking の list-closing-audit-logs と同じく "ミリ秒:id" を base64 にした不透明な文字列
function encodeCursor(createdAt: Date, id: number): string {
  return btoa(`${createdAt.getTime()}:${id}`);
}

// 壊れたカーソルは undefined を返す
function decodeCursor(value: string): SearchCursor | undefined {
  try {
    const [ms, id] = atob(value).split(":").map(Number);
    if (!Number.isFinite(ms) || !Number.isInteger(id)) return undefined;
    return { createdAt: new Date(ms), id };
  } catch {
    return undefined;
  }
}

// GET /api/search の定義（OpenAPI ドキュメントにも使われる）
const route = createRoute({
  method: "get",
  path: "/",
  request: { query: QuerySchema },
  responses: {
    200: {
      description: "お相手の一覧（新しい順）",
      content: { "application/json": { schema: ResponseSchema } },
    },
    400: { description: "cursor が不正" },
    500: { description: "内部エラー" },
  },
});

export function listSearchProfilesRoute() {
  return new OpenAPIHono<{
    Bindings: AppEnv["Bindings"];
    Variables: AppEnv["Variables"] & { userId: string };
  }>().openapi(route, async (c) => {
    const db = c.var.db;
    const userId = c.get("userId");
    const query = c.req.valid("query");
    const limit = query.limit ?? DEFAULT_LIMIT;

    // 自分のプロフィールは除く
    const conditions: SQL[] = [ne(profile.userId, userId)];

    // カーソルがあれば、前ページの最後より古いものだけにする（createdAt が同じなら id で比べる）
    if (query.cursor !== undefined) {
      const cursor = decodeCursor(query.cursor);
      if (cursor === undefined) {
        return c.json({ error: "cursor が不正です" }, 400);
      }
      // WHERE created_at < :createdAt OR (created_at = :createdAt AND id < :id)
      const cursorCond = or(
        lt(profile.createdAt, cursor.createdAt),
        and(eq(profile.createdAt, cursor.createdAt), lt(profile.id, cursor.id)),
      );
      if (cursorCond !== undefined) conditions.push(cursorCond);
    }

    let rows: ProfileRow[];
    try {
      // 次ページの有無を判定するため 1 件多く取る
      rows = await db
        .select()
        .from(profile)
        .where(and(...conditions))
        .orderBy(desc(profile.createdAt), desc(profile.id))
        .limit(limit + 1);
    } catch (err) {
      logger.error("お相手一覧の取得に失敗", { error: err, userId });
      return c.json({ error: "internal server error" }, 500);
    }

    // limit + 1 件取れたら続きがある。余分な 1 件を捨て、最後の 1 件からカーソルを作る
    const hasMore = rows.length > limit;
    const profiles = hasMore ? rows.slice(0, limit) : rows;
    const last = profiles.at(-1);
    const nextCursor =
      hasMore && last !== undefined
        ? encodeCursor(last.createdAt, last.id)
        : null;

    return c.json({ profiles, nextCursor }, 200);
  });
}
