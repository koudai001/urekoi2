import { createApp } from "../app";
import type { Auth } from "../modules/_shared/auth";
import { createTestDb } from "./test-db";

// 一時DBをつないだ app を作る
export async function createTestApp() {
  const db = await createTestDb();
  const app = createApp({ db, auth: {} as Auth });
  return { app, db };
}
