import { testClient } from "hono/testing";
import { beforeEach, describe, expect, it } from "vitest";
import type { AppType } from "../../app";
import { profile, user } from "../../db/schema";
import { createTestApp } from "../../test/test-app";
import { authHeaders } from "../../test/test-auth";
import type { TestDb } from "../../test/test-db";

// 任意項目まで全部埋めた相手のプロフィール
const fullProfile = {
  nickname: "相手",
  gender: "female",
  birthdate: "1980-01-01",
  prefectureCode: 13,
  bio: "よろしくお願いします",
  occupation: "会社員",
  hometown: "東京都",
  bloodType: "A",
  mbti: "INFP",
  bodyType: "普通",
  education: "大卒",
  holiday: "土日",
  alcohol: "たまに",
  smoking: "吸わない",
  heightCm: 160,
} as const;

// ユーザーとプロフィールを DB に直接作り、user の id とプロフィールの id を返す
async function createUserWithProfile(
  db: TestDb,
  values: Omit<typeof profile.$inferInsert, "userId">,
) {
  const userId = crypto.randomUUID();
  await db.insert(user).values({
    id: userId,
    name: values.nickname,
    email: `test-${userId}@test.example.com`,
  });
  const [created] = await db
    .insert(profile)
    .values({ userId, ...values })
    .returning({ id: profile.id });
  if (created === undefined) throw new Error("profile の作成に失敗");
  return { userId, profileId: created.id };
}

let client: ReturnType<typeof testClient<AppType>>;
let guestClient: ReturnType<typeof testClient<AppType>>;
let otherProfileId: number;

// テストごとに空の DB を作り、自分と相手を作って、自分として呼ぶクライアントを用意する
beforeEach(async () => {
  const { app, db } = await createTestApp();
  const me = await createUserWithProfile(db, {
    nickname: "自分",
    gender: "male",
    birthdate: "1975-01-01",
    prefectureCode: 13,
  });
  const other = await createUserWithProfile(db, fullProfile);
  otherProfileId = other.profileId;
  client = testClient(app, undefined, undefined, {
    headers: authHeaders(me.userId),
  });
  guestClient = testClient(app);
});

describe("GET /api/profiles/{id}", () => {
  it("未ログイン → 401", async () => {
    const res = await guestClient.api.profiles[":id"].$get({
      param: { id: String(otherProfileId) },
    });
    expect(res.status).toBe(401);
  });

  it("正常 → 200 + 相手のプロフィール", async () => {
    const res = await client.api.profiles[":id"].$get({
      param: { id: String(otherProfileId) },
    });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toMatchObject({ id: otherProfileId, ...fullProfile });
  });

  it("存在しない id → 404", async () => {
    const res = await client.api.profiles[":id"].$get({
      param: { id: "99999" },
    });
    expect(res.status).toBe(404);
  });

  it("数値でない id → 400", async () => {
    const res = await client.api.profiles[":id"].$get({
      param: { id: "abc" },
    });
    expect(res.status).toBe(400);
  });
});
