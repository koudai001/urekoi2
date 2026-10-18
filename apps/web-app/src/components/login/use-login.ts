import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { authClient } from "../../lib/auth-client";

export const emailSchema = z.object({
  email: z.email("メールアドレスの形式が正しくありません"),
});

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "6桁の数字を入力してください"),
});

export type EmailFormValues = z.infer<typeof emailSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;

// ログインコードをメールに送る
export function useSendOtp() {
  return useMutation({
    mutationFn: async ({ email }: EmailFormValues) => {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });

      if (error) {
        console.error(error);
        throw new Error(error.message);
      }
    },
  });
}

// 届いたコードでログインする（未登録のメールアドレスならここでユーザーが作られる）
export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const { error } = await authClient.signIn.emailOtp({ email, otp });

      if (error) {
        console.error(error);
        throw new Error(error.message);
      }
    },
  });
}
