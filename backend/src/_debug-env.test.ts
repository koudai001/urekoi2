import { env } from "cloudflare:workers";
import { test } from "vitest";

// 一時確認用。DBには一切触れない
test("debug: どのTURSO DBに繋がっているか", () => {
  console.log("TURSO_DATABASE_URL:", env.TURSO_DATABASE_URL);
});
