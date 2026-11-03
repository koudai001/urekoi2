import { testClient } from "hono/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AppType } from "../../app";
import { profile, user } from "../../db/schema";
import { setCurrentUserId } from "../../middleware/require-auth.mock";
import { createTestApp } from "../../test/test-app";
import type { TestDb } from "../../test/test-db";

// ミドルウェアのモック
vi.mock(
  "../../middleware/require-auth",
  () => import("../../middleware/require-auth.mock"),
);

// ユーザーとプロフィールを DB に直接作る（作った順に新しくなる）
async function createUserWithProfile(
  db: TestDb,
  nickname: string,
): Promise<string> {
  const id = crypto.randomUUID();
  await db.insert(user).values({
    id,
    name: nickname,
    email: `test-${id}@test.example.com`,
  });
  await db.insert(profile).values({
    userId: id,
    nickname,
    gender: "female",
    birthdate: "1980-01-01",
    prefectureCode: 13,
  });
  return id;
}

let client: ReturnType<typeof testClient<AppType>>;
let myId: string;
let olderId: string;
let newerId: string;

// テストごとに空の DB を作り、自分 → 相手A → 相手B の順に作る
beforeEach(async () => {
  const { app, db } = await createTestApp();
  client = testClient(app);
  myId = await createUserWithProfile(db, "自分");
  olderId = await createUserWithProfile(db, "相手A");
  newerId = await createUserWithProfile(db, "相手B");
  setCurrentUserId(myId);
});

describe("GET /api/search", () => {
  it("正常 → 200 + 新しい順で、自分は含まない", async () => {
    const res = await client.api.search.$get({ query: { limit: "2" } });
    expect(res.status).toBe(200);
    if (res.status !== 200) {
      throw new Error(`Expected 200, received ${res.status}`);
    }

    const body = await res.json();
    const ids = body.profiles.map((p) => p.userId);
    expect(ids).toEqual([newerId, olderId]);
    expect(ids).not.toContain(myId);
  });

  it("nextCursor を渡す → 次のページを返す", async () => {
    const first = await client.api.search.$get({ query: { limit: "1" } });
    if (first.status !== 200) {
      throw new Error(`Expected 200, received ${first.status}`);
    }
    const firstBody = await first.json();
    expect(firstBody.profiles.map((p) => p.userId)).toEqual([newerId]);
    expect(firstBody.nextCursor).not.toBeNull();

    const second = await client.api.search.$get({
      query: { limit: "1", cursor: firstBody.nextCursor ?? "" },
    });
    if (second.status !== 200) {
      throw new Error(`Expected 200, received ${second.status}`);
    }
    const secondBody = await second.json();
    expect(secondBody.profiles.map((p) => p.userId)).toEqual([olderId]);
  });

  it("不正な cursor → 400", async () => {
    const res = await client.api.search.$get({
      query: { cursor: "invalid" },
    });
    expect(res.status).toBe(400);
  });
});
