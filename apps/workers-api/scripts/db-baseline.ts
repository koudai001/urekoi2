import "dotenv/config";
import { createClient } from "@libsql/client";
import * as logger from "@urekoi/logger";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

// push で作った DB に、最初のマイグレーションを適用済みとして記録する
const client = createClient({
  url: process.env.DATABASE_URL ?? "",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const result = await migrate(drizzle({ client }), {
  migrationsFolder: "./drizzle",
  init: true,
});
logger.info("db baseline", { result: result ?? "recorded" });
