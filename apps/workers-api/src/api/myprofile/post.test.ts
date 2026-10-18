import { testClient } from "hono/testing";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { auth } from "../../lib/auth";
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
  const ctx = await auth.$context;
  const user = await ctx.internalAdapter.createUser({
    name: "テストユーザー",
    email: `test-${crypto.randomUUID()}@test.example.com`,
  });
  userId = user.id;
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
  test("異常：バリデーション不正で400", async () => {
    const res = await client.api.myprofile.$post({
      // @ts-expect-error 意図的に不正な値を送ってバリデーションをテストする
      json: { ...validBody, gender: "invalid" },
    });
    expect(res.status).toBe(400);
  });

  test("正常：201でプロフィールを作成し、has_profile=trueのCookieをセットする", async () => {
    const res = await client.api.myprofile.$post({ json: validBody });
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body).toMatchObject({ userId, nickname: "テスト太郎" });

    const cookie = res.headers.get("set-cookie") ?? "";
    expect(cookie).toContain("has_profile=true");
  });
});
