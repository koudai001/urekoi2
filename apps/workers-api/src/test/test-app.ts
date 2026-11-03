import { createApp } from "../app";
import type { auth } from "../lib/auth";
import { createTestDb } from "./test-db";

// 一時DBをつないだ app を作る
export async function createTestApp() {
  const db = await createTestDb();
  const app = createApp({ db, auth: {} as typeof auth });
  return { app, db };
}
