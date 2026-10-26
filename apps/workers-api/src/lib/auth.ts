import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { i18n, locales } from "@better-auth/i18n";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { getEmailConfig, OtpEmail, sendEmail } from "@urekoi/email";
import * as logger from "@urekoi/logger";
import { db } from "../db";
import * as schema from "../db/schema";

const emailConfig = getEmailConfig(env, { email: env.EMAIL });

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
  }),
  baseURL: env.APP_URL,
  plugins: [
    emailOTP({
      storeOTP: "hashed",
      async sendVerificationOTP({ email, otp }) {
        const result = await sendEmail(emailConfig, {
          to: email,
          subject: "認証コード",
          react: OtpEmail({ otp }),
        });
        if (!result.success) {
          logger.error("認証コードのメール送信に失敗しました", {
            error: result.error,
          });
          throw new Error(result.error.message);
        }
      },
    }),
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
