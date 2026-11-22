/** biome-ignore-all lint/suspicious/noConsole: 手元で実行するスクリプト */
import "dotenv/config";
import { createClient } from "@libsql/client";
import { PREFECTURES as prefectures } from "@urekoi/core";
import { drizzle } from "drizzle-orm/libsql";
import { prefecture, profile, user } from "./schema";

const { DATABASE_URL, DATABASE_AUTH_TOKEN } = process.env;
if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
  throw new Error(
    "DATABASE_URL と DATABASE_AUTH_TOKEN を .env に設定してください",
  );
}

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

const db = drizzle({ client });

async function main() {
  for (const row of prefectures) {
    await db
      .insert(prefecture)
      .values(row)
      .onConflictDoUpdate({
        target: prefecture.code,
        set: {
          name: row.name,
        },
      });
  }
  console.log(`Seeded ${prefectures.length} prefectures`);

  await seedProfiles();
}

const SEED_PROFILE_COUNT = 40;

// 検索画面の確認用に、ダミーのユーザーとプロフィールを入れる（何度実行しても増えない）
async function seedProfiles() {
  const now = new Date();
  for (let i = 1; i <= SEED_PROFILE_COUNT; i++) {
    const no = String(i).padStart(2, "0");
    const userId = `seed-user-${no}`;
    const gender = i % 2 === 0 ? "male" : "female";
    // 女性は30〜59歳、男性は20〜35歳（年齢ルールの範囲内）
    const age = gender === "female" ? 30 + (i % 30) : 20 + (i % 16);
    const birthYear = now.getFullYear() - age - 1;
    const birthdate = `${birthYear}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`;
    // 新しい順の並びを確認できるよう、作成日時を1分ずつずらす
    const createdAt = new Date(now.getTime() - i * 60_000);

    await db
      .insert(user)
      .values({
        id: userId,
        name: `シード${no}`,
        email: `seed-${no}@example.com`,
        emailVerified: true,
      })
      .onConflictDoNothing();

    await db
      .insert(profile)
      .values({
        userId,
        nickname: `シード${no}`,
        gender,
        birthdate,
        prefectureCode: (i % 47) + 1,
        createdAt,
      })
      .onConflictDoNothing();
  }
  console.log(`Seeded ${SEED_PROFILE_COUNT} profiles`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => client.close());
