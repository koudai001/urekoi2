import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(drizzle(env.DB), {
    provider: "sqlite",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: env.AUTH_URL,
  // フロントエンド(別オリジン)からのリクエストを許可
  trustedOrigins: [env.APP_URL],
  plugins: [
    jwt({
      jwt: {
        // 認証サーバーが発行し、Go APIで利用するJWTとして設定する。
        issuer: env.AUTH_URL,
        audience: env.API_URL,
      },
    }),
  ],
});
