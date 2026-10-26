import { z } from "zod";
import type { EmailConfig, EmailSendBinding } from "./types";

/**
 * メールアドレス形式のバリデーション。
 * `user@example.com` または `Display Name <user@example.com>` を許可する。
 */
const isValidEmailFrom = (value: string): boolean => {
  const trimmed = value.trim();
  // addr-spec: user@example.com
  const addrSpec = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
  // display-name <addr-spec>: Display Name <user@example.com>
  const displayName = /^.+<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/;
  return addrSpec.test(trimmed) || displayName.test(trimmed);
};

const emailFromSchema = z
  .string()
  .trim()
  .min(1)
  // 改行が混ざるとメールのヘッダーを書き換えられるため弾く
  .refine((value) => !/[\r\n]/.test(value), {
    message: "EMAIL_FROM に改行は使えません",
  })
  .refine(isValidEmailFrom, {
    message:
      'EMAIL_FROM は "user@example.com" か "表示名 <user@example.com>" の形式にしてください',
  });

// EMAIL_PROVIDER の値によって、必須になる環境変数が変わる
const envSchema = z.discriminatedUnion("EMAIL_PROVIDER", [
  z.object({
    EMAIL_PROVIDER: z.literal("smtp"),
    EMAIL_FROM: emailFromSchema,
    SMTP_HOST: z.string().min(1),
    // 環境変数は文字列で届くので数値に変換する
    SMTP_PORT: z.coerce.number().int().positive(),
  }),
  z.object({
    EMAIL_PROVIDER: z.literal("cloudflare"),
    EMAIL_FROM: emailFromSchema,
  }),
]);

export interface EmailBindings {
  email?: EmailSendBinding;
}

/** 環境変数を検証して送信の設定を作る。設定が不正なら起動時に気づけるよう例外を投げる */
export function getEmailConfig(
  env: object,
  bindings: EmailBindings = {},
): EmailConfig {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    throw new Error(`メールの設定が不正です\n${z.prettifyError(result.error)}`);
  }

  const parsed = result.data;
  switch (parsed.EMAIL_PROVIDER) {
    case "smtp":
      return {
        provider: "smtp",
        from: parsed.EMAIL_FROM,
        smtp: { host: parsed.SMTP_HOST, port: parsed.SMTP_PORT },
      };
    case "cloudflare":
      if (bindings.email === undefined) {
        throw new Error(
          "EMAIL_PROVIDER=cloudflare のときは send_email binding（env.EMAIL）が必要です",
        );
      }
      return {
        provider: "cloudflare",
        from: parsed.EMAIL_FROM,
        cloudflare: { binding: bindings.email },
      };
  }
}
