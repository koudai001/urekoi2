import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { authClient } from "../../lib/auth-client";

export const signupSchema = z
  .object({
    isAdult: z.boolean(),
    agreeTerms: z.boolean(),
    email: z.string(),
    password: z.string(),
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
    if (data.password.length < 8) {
      ctx.addIssue({
        code: "custom",
        message: "パスワードは8文字以上で入力してください",
        path: ["password"],
      });
    }
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: SignupFormValues) => {
      const { error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.email,
      });

      if (error) {
        console.error(error);
        // 翻訳済み
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      navigate({ to: "/signup/profile" });
    },
  });
}
