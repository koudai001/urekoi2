import * as authLabel from "@urekoi/core/labels/auth";
import { z } from "zod";

export const emailSchema = z.object({
  email: z.email(authLabel.email.invalid),
});

export type EmailFormValues = z.infer<typeof emailSchema>;
