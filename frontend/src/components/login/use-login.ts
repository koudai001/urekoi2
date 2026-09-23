import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { authClient } from "../../lib/auth-client";

export const loginSchema = z.object({
  email: z.email("メールアドレスの形式が正しくありません"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error(error);
        throw new Error("メールアドレスまたはパスワードが正しくありません");
      }
    },
    onSuccess: () => {
      // TODO: ホーム画面ができたらそちらへ遷移する
      navigate({ to: "/" });
    },
  });
}
