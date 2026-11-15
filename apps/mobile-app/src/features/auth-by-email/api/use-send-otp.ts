import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/shared/api/auth-client";

// 認証コードをメールに送る
export function useSendOtp() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });
      if (error) {
        throw new Error(error.message);
      }
    },
  });
}
