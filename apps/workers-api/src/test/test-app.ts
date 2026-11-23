import { createApp } from "../app";
import { configFromProcessEnv } from "../config";
import { createTestAuth } from "./test-auth";
import { createTestDb } from "./test-db";

// 一時DBをつないだ app を作る
export async function createTestApp() {
  const db = await createTestDb();
  const app = createApp({
    config: configFromProcessEnv({}),
    db,
    auth: createTestAuth(),
  });
  return { app, db };
}
