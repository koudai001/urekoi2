import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { i18n, locales } from "@better-auth/i18n";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: env.APP_URL,
  plugins: [
    // エラーメッセージの日本語対応
    i18n({
      translations: {
        ja: locales.ja,
      },
    }),
  ],
  advanced: {
    disableOriginCheck: process.env.NODE_ENV === "development",
  },
});
