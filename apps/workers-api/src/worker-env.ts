import type { EmailSendBinding } from "@urekoi/email";

/** Cloudflare Workers の env（wrangler.jsonc の vars と secret）。 */
export interface WorkerEnv {
  /** アプリ（画面）のベース URL。CORS と trustedOrigins に使う。 */
  WEB_URL: string;
  /** API 自身のベース URL。better-auth の baseURL に使う。 */
  BETTER_AUTH_URL: string;
  /** メール送信プロバイダ（"cloudflare" / "smtp"）。 */
  EMAIL_PROVIDER: string;
  /** 送信元（From）ヘッダ。 */
  EMAIL_FROM: string;
  /** Cloudflare Email の送信 binding。 */
  EMAIL: EmailSendBinding;
  /** ローカルの SMTP（Mailpit）のホスト。 */
  SMTP_HOST?: string;
  /** ローカルの SMTP（Mailpit）のポート。 */
  SMTP_PORT?: string;
  // 以下は secret（wrangler secret put で入れる）。
  /** Turso の接続 URL。 */
  TURSO_DATABASE_URL: string;
  /** Turso の認証トークン。 */
  TURSO_AUTH_TOKEN: string;
  /** better-auth のセッション署名鍵。 */
  BETTER_AUTH_SECRET: string;
}
