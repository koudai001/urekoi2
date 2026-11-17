import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // SQLマイグレーションファイルとスナップショットの出力先ディレクトリ
  out: "./drizzle",
  schema: "./src/db/schema/index.ts",
  // tursoベース
  dialect: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
});
