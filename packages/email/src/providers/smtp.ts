import nodemailer from "nodemailer";
import { render } from "react-email";
import type { EmailConfig, EmailOptions, EmailResult } from "../types";

type SmtpConfig = Extract<EmailConfig, { provider: "smtp" }>;

export async function sendWithSMTP(
  options: EmailOptions,
  config: SmtpConfig,
): Promise<EmailResult> {
  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: false,
    // SMTP はローカルの Mailpit 専用で、Mailpit は TLS を使わない
    ignoreTLS: true,
  });

  // HTML を読めないメールソフト向けに、テキスト版も一緒に送る
  const html = await render(options.react);
  const text = await render(options.react, { plainText: true });

  const info = await transporter.sendMail({
    from: config.from,
    to: options.to,
    subject: options.subject,
    html,
    text,
  });

  return {
    id: info.messageId,
    provider: "smtp",
    timestamp: new Date(),
  };
}
