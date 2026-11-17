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
// init は drizzle-kit pull --init が使う内部オプションで、型に出ていないため変数で渡す
const config = { migrationsFolder: "./drizzle", init: true };
const result = await migrate(drizzle({ client }), config);
logger.info("db baseline", { result: result ?? "recorded" });
