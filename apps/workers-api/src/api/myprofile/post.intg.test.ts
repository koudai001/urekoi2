import { testClient } from "hono/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "../../db";
import { user } from "../../db/schema";
import { routes } from "../../index";
import { setCurrentUserId } from "../../middleware/require-auth.mock";

// ミドルウェアのモック
vi.mock(
  "../../middleware/require-auth",
  () => import("../../middleware/require-auth.mock"),
);

let userId: string;

// userを作成して、requireAuthミドルウェアのモックにセットする
beforeEach(async () => {
  userId = crypto.randomUUID();
  await db.insert(user).values({
    id: userId,
    name: "テストユーザー",
    email: `test-${userId}@test.example.com`,
  });
  setCurrentUserId(userId);
});

const validBody = {
  nickname: "テスト太郎",
  gender: "male" as const,
  birthdate: "1990-01-01",
  prefectureCode: 13,
};

const client = testClient(routes);

describe("POST /api/myprofile", () => {
  it("バリデーション不正 → 400", async () => {
    const res = await client.api.myprofile.$post({
      // @ts-expect-error 意図的に不正な値を送ってバリデーションをテストする
      json: { ...validBody, gender: "invalid" },
    });
    expect(res.status).toBe(400);
  });

  it("正常 → 201 + 作成したプロフィール", async () => {
    const res = await client.api.myprofile.$post({ json: validBody });
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body).toMatchObject({ userId, nickname: "テスト太郎" });
  });
});
