import { useFormContext } from "react-hook-form";
import type { SignupFormValues } from "./use-signup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { BackHeader } from "../ui/back-header";

// メールアドレス・パスワードを入力して送信する
export function SignupEmailForm({
  isPending,
  errorMessage,
  onBack,
  onSubmit,
}: {
  isPending: boolean;
  errorMessage: string | null;
  onBack: () => void;
  onSubmit: (data: SignupFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SignupFormValues>();

  return (
    <>
      <BackHeader onBack={onBack} />
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-bold">メールアドレスで新規登録</h1>
        <p className="mt-4 text-base leading-7">
          メールアドレスとパスワードを入力してください。
        </p>

        <form
          className="mt-20 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              autoComplete="new-password"
              placeholder="パスワード"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            アカウント登録すると、利用規約・プライバシーポリシー・コミュニティガイドラインに同意したこととみなします。
          </p>

          {errorMessage && (
            <p className="text-sm font-medium text-error">{errorMessage}</p>
          )}

          <div className="mt-8">
            <Button type="submit" disabled={isPending}>
              {isPending ? "登録中..." : "登録する"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
