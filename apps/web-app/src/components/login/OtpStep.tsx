import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useLogin, otpSchema, type OtpFormValues } from "./use-login";

// 届いたコードを入力してログイン/新規登録する
export function OtpStep({
  email,
  onSuccess,
  submitLabel,
}: {
  email: string;
  onSuccess: () => void;
  submitLabel: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const login = useLogin();

  const onSubmit = handleSubmit(({ otp }) => {
    login.mutate({ email, otp }, { onSuccess });
  });

  return (
    <>
      <h1 className="text-2xl font-bold">認証コードを入力してください</h1>
      <p className="mt-4 text-base leading-7">
        {email} にお送りした6桁のコードを入力してください。
      </p>

      <form className="mt-8 flex flex-col gap-6" onSubmit={onSubmit}>
        <div>
          <Input
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="6桁のコード"
            {...register("otp")}
          />
          {errors.otp && (
            <p className="mt-2 text-sm text-error">{errors.otp.message}</p>
          )}
        </div>

        {login.isError && (
          <p className="text-sm font-medium text-error">
            {login.error.message}
          </p>
        )}

        <div>
          <Button type="submit" disabled={login.isPending}>
            {login.isPending ? "送信中..." : submitLabel}
          </Button>
        </div>
      </form>
    </>
  );
}
