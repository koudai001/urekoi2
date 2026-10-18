import { z } from "zod";

export const signupSchema = z
  .object({
    isAdult: z.boolean(),
    agreeTerms: z.boolean(),
    email: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.isAdult) {
      ctx.addIssue({
        code: "custom",
        message: "18歳以上・独身であることの確認が必要です",
        path: ["isAdult"],
      });
    }
    if (!data.agreeTerms) {
      ctx.addIssue({
        code: "custom",
        message: "規約への同意が必要です",
        path: ["agreeTerms"],
      });
    }
    if (!z.email().safeParse(data.email).success) {
      ctx.addIssue({
        code: "custom",
        message: "メールアドレスの形式が正しくありません",
        path: ["email"],
      });
    }
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
