import { sendWithCloudflare } from "./providers/cloudflare";
import { sendWithSMTP } from "./providers/smtp";
import type { EmailConfig, EmailOptions, EmailResponse } from "./types";

export async function sendEmail(
  config: EmailConfig,
  options: EmailOptions,
): Promise<EmailResponse> {
  try {
    switch (config.provider) {
      case "smtp":
        return { success: true, data: await sendWithSMTP(options, config) };
      case "cloudflare":
        return {
          success: true,
          data: await sendWithCloudflare(options, config),
        };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code:
          error instanceof Error && "code" in error
            ? String(error.code)
            : "EMAIL_SEND_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
        provider: config.provider,
        originalError: error,
      },
    };
  }
}

export { getEmailConfig } from "./config";
export type { EmailBindings } from "./config";
export type {
  EmailConfig,
  EmailOptions,
  EmailResponse,
  EmailSendBinding,
} from "./types";
export * from "./templates/otp-email";
