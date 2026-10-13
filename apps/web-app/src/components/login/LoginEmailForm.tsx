import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { BackHeader } from "../ui/BackHeader";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  useLogin,
  useSendOtp,
  emailSchema,
  otpSchema,
  type EmailFormValues,
  type OtpFormValues,
} from "./use-login";

// メールアドレスにログインコードを送り、届いたコードでログインする
export function LoginEmailForm({ onBack }: { onBack: () => void }) {
  // コード送信済みのメールアドレス。null の間はメールアドレス入力を表示する
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  return (
    <>
      <BackHeader
        onBack={sentEmail === null ? onBack : () => setSentEmail(null)}
        title="熟恋にログイン"
      />
      <div className="px-8 pt-6">
        {sentEmail === null ? (
          <EmailStep onSent={setSentEmail} />
        ) : (
          <OtpStep email={sentEmail} />
        )}
      </div>
    </>
  );
}

function EmailStep({ onSent }: { onSent: (email: string) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const sendOtp = useSendOtp();

  const onSubmit = handleSubmit((data) => {
    sendOtp.mutate(data, {
      onSuccess: () => onSent(data.email),
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold">
        メールアドレスを<br></br>入力してください
      </h1>
      <form className="mt-8 flex flex-col gap-6" onSubmit={onSubmit}>
        <div>
          <Input
            type="email"
            autoComplete="email"
            placeholder="例）urekoi@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-error">{errors.email.message}</p>
          )}
        </div>

        {sendOtp.isError && (
          <p className="text-sm font-medium text-error">
            {sendOtp.error.message}
          </p>
        )}

        <div>
          <Button type="submit" disabled={sendOtp.isPending}>
            {sendOtp.isPending ? "送信中..." : "コードを送る"}
          </Button>
        </div>
      </form>
    </>
  );
}

function OtpStep({ email }: { email: string }) {
  const navigate = useNavigate();

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
    login.mutate(
      { email, otp },
      {
        onSuccess: () => navigate({ to: "/search" }),
      },
    );
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
            {login.isPending ? "ログイン中..." : "ログインする"}
          </Button>
        </div>
      </form>
    </>
  );
}
