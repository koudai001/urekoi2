import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { BackHeader } from "../ui/back-header";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLogin, loginSchema, type LoginFormValues } from "./use-login";

// メールアドレス・パスワードを入力して送信する
export function LoginEmailForm({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const login = useLogin();

  const onSubmit = handleSubmit((data) => {
    login.mutate(data, {
      onSuccess: () => navigate({ to: "/search" }),
    });
  });

  return (
    <>
      <BackHeader onBack={onBack} title="熟恋にログイン" />
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-bold">メールアドレスでログイン</h1>
        <p className="mt-4 text-base leading-7">
          登録しているメールアドレスとパスワードを入力してください。
        </p>

        <form className="mt-20 flex flex-col gap-8" onSubmit={onSubmit}>
          <div>
            <Input
              type="email"
              autoComplete="email"
              placeholder="メールアドレス"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-error">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="パスワード"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {login.isError && (
            <p className="text-sm font-medium text-error">
              {login.error.message}
            </p>
          )}

          <div className="mt-8">
            <Button type="submit" disabled={login.isPending}>
              {login.isPending ? "ログイン中..." : "ログインする"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
