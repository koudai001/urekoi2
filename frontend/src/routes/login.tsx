import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BackHeader } from "../components/ui/back-header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  useLogin,
  loginSchema,
  type LoginFormValues,
} from "../components/login/use-login";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
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
    login.mutate(data);
  });

  return (
    <>
      <BackHeader href="/" title="熟恋にログイン" />
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
