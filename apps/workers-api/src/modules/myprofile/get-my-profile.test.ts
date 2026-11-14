import { testClient } from "hono/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AppType } from "../../app";
import { user } from "../../db/schema";
import { setCurrentUserId } from "../../middleware/require-auth.mock";
import { createTestApp } from "../../test/test-app";

// ミドルウェアのモック
vi.mock(
  "../../middleware/require-auth",
  () => import("../../middleware/require-auth.mock"),
);

let client: ReturnType<typeof testClient<AppType>>;
let userId: string;

// テストごとに空の DB を作り、user を作ってモックにセットする
beforeEach(async () => {
  const { app, db } = await createTestApp();
  client = testClient(app);
  userId = crypto.randomUUID();
  await db.insert(user).values({
    id: userId,
    name: "テストユーザー",
    email: `test-${userId}@test.example.com`,
  });
  setCurrentUserId(userId);
});

describe("GET /api/myprofile", () => {
  it("プロフィール未作成 → 404", async () => {
    const res = await client.api.myprofile.$get();
    expect(res.status).toBe(404);
  });

  it("正常 → 200 + 作成済みのプロフィール", async () => {
    await client.api.myprofile.$post({
      json: {
        nickname: "テスト太郎",
        gender: "male",
        birthdate: "1990-01-01",
        prefectureCode: 13,
      },
    });

    const res = await client.api.myprofile.$get();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toMatchObject({ userId, nickname: "テスト太郎" });
  });
});
