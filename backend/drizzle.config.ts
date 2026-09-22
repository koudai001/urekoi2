import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // SQLマイグレーションファイルとスナップショットの出力先ディレクトリ
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  // tursoベース
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
