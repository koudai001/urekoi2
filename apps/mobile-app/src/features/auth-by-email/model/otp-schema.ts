import * as authLabel from "@urekoi/core/labels/auth";
import { z } from "zod";

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, authLabel.otp.invalid),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
