import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: env.API_URL,
  trustedOrigins: [env.WEB_URL],
  advanced: {
    // ローカル開発時のみtrue
    disableOriginCheck: process.env.NODE_ENV === "development",
  },
});
