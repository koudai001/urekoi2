import { zValidator } from "@hono/zod-validator";
import { flattenError, type ZodType } from "zod";

// バリデーション失敗時のエラー形式を各featureで揃えるためのラッパー
export function validateJson<T extends ZodType>(schema: T) {
  return zValidator("json", schema, (result, c) => {
    if (!result.success) {
      return c.json({ error: flattenError(result.error) }, 400);
    }
  });
}
