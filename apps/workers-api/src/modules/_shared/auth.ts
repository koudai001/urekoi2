import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { expo } from "@better-auth/expo";
import { i18n, locales } from "@better-auth/i18n";
import { type EmailConfig, OtpEmail, sendEmail } from "@urekoi/email";
import * as logger from "@urekoi/logger";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import type { AppConfig } from "../../config";
import type { Db } from "../../db";
import * as schema from "../../db/schema";

export type Auth = ReturnType<typeof createAuth>;

interface AuthDeps {
  config: AppConfig;
  db: Db;
  emailConfig: EmailConfig;
}

export function createAuth({ config, db, emailConfig }: AuthDeps) {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: schema,
    }),
    baseURL: config.appUrl,
    secret: config.betterAuthSecret,
    trustedOrigins: [
      "mobileapp://",
      ...(process.env.NODE_ENV === "development" ? ["exp://"] : []),
    ],
    plugins: [
      expo(),
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
}
