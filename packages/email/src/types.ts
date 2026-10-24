import type { ReactElement } from "react";

export type EmailProvider = "smtp" | "cloudflare";

/**
 * 本番の送信に使う env.EMAIL（send_email binding）の型。
 * @cloudflare/workers-types を入れると Node や DOM の型とぶつかるので、
 * 使う send() の形だけをここに書く。
 */
export interface EmailSendBinding {
  send(message: {
    from: string | { name: string; email: string };
    to: string;
    subject: string;
    html: string;
    text: string;
  }): Promise<{ messageId: string }>;
}

/** 送信先ごとに必要な設定が揃っていることを型で保証する */
export type EmailConfig =
  | {
      provider: "smtp";
      from: string;
      smtp: { host: string; port: number };
    }
  | {
      provider: "cloudflare";
      from: string;
      cloudflare: { binding: EmailSendBinding };
    };

export interface EmailOptions {
  to: string;
  subject: string;
  react: ReactElement;
}

export interface EmailResult {
  id: string;
  provider: EmailProvider;
  timestamp: Date;
}

export interface EmailError {
  code: string;
  message: string;
  provider: EmailProvider;
  originalError: unknown;
}

export type EmailResponse =
  | { success: true; data: EmailResult }
  | { success: false; error: EmailError };
