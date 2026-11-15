import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/shared/api/auth-client";

// 届いたコードでログインする（未登録のメールアドレスならここでユーザーが作られる）
export function useVerifyOtp() {
  return useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const { error } = await authClient.signIn.emailOtp({ email, otp });
      if (error) {
        throw new Error(error.message);
      }
    },
  });
}
