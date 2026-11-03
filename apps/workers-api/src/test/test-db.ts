import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { createClient } from "@libsql/client";
import { PREFECTURES } from "@urekoi/core";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import type { Logger } from "drizzle-orm/logger";
import { onTestFinished } from "vitest";
import { prefecture } from "../db/schema";

const migrationsFolder = fileURLToPath(
  new URL("../../drizzle", import.meta.url),
);

export type TestDb = ReturnType<typeof drizzle>;

interface CreateTestDbOptions {
  readonly logger?: Logger;
}

/**
 * テストごとに一時ファイルの SQLite DB を作り、本番と同じマイグレーションを適用する。
 * トランザクションで接続が切り替わっても同じ DB を使えるよう、file SQLite を使う。
 * beforeEach またはテスト内から呼び出し、テスト終了時に接続と一時ファイルを片付ける。
 */
export async function createTestDb(
  options: CreateTestDbOptions = {},
): Promise<TestDb> {
  const dir = mkdtempSync(join(tmpdir(), "urekoi2-test-"));
  const dbPath = join(dir, "test.db");

  try {
    // PRAGMA を確実に効かせるため接続を1本に固定する
    const client = createClient({ url: `file:${dbPath}`, concurrency: 1 });
    try {
      await client.execute("PRAGMA foreign_keys = ON;");
      // 最大5秒、ロックが空くのを待つ
      await client.execute("PRAGMA busy_timeout = 5000;");
      const db = drizzle({ client, logger: options.logger });
      await migrate(db, { migrationsFolder });
      // マスタデータを入れる
      await db.insert(prefecture).values([...PREFECTURES]);

      onTestFinished(() => {
        try {
          client.close();
        } finally {
          rmSync(dir, { recursive: true, force: true });
        }
      });

      return db;
    } catch (error) {
      client.close();
      throw error;
    }
  } catch (error) {
    rmSync(dir, { recursive: true, force: true });
    throw error;
  }
}
