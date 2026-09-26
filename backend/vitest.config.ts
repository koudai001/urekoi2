import { config } from "dotenv";
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

const { parsed, error } = config({ path: ".env.test" });

if (error || !parsed?.TURSO_DATABASE_URL || !parsed.TURSO_AUTH_TOKEN) {
  throw new Error(".env.test の Turso 接続設定を確認してください");
}

export default defineConfig({
  plugins: [
    cloudflareTest({
      wrangler: { configPath: "./wrangler.jsonc" },
      miniflare: {
        // テスト用ワーカーに環境変数を渡す
        bindings: {
          TURSO_DATABASE_URL: parsed.TURSO_DATABASE_URL,
          TURSO_AUTH_TOKEN: parsed.TURSO_AUTH_TOKEN,
        },
      },
    }),
  ],
});
