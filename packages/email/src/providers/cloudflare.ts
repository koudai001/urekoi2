import { render } from "react-email";
import type { EmailConfig, EmailOptions, EmailResult } from "../types";

type CloudflareConfig = Extract<EmailConfig, { provider: "cloudflare" }>;

export async function sendWithCloudflare(
  options: EmailOptions,
  config: CloudflareConfig,
): Promise<EmailResult> {
  const html = await render(options.react);
  const text = await render(options.react, { plainText: true });

  const { messageId } = await config.cloudflare.binding.send({
    from: parseFrom(config.from),
    to: options.to,
    subject: options.subject,
    html,
    text,
  });

  return { id: messageId, provider: "cloudflare", timestamp: new Date() };
}

// "表示名 <addr>" は { name, email } に分けて渡す
function parseFrom(from: string): string | { name: string; email: string } {
  const matched = /^(.+?)\s*<([^\s<>]+)>$/.exec(from.trim());
  if (matched === null) return from.trim();
  return { name: matched[1].trim(), email: matched[2] };
}
