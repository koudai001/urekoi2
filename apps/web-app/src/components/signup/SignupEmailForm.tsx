import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { type SignupFormValues } from "./signup-schema";
import { OtpStep } from "../login/OtpStep";
import { useSendOtp } from "../login/use-login";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { BackHeader } from "../ui/BackHeader";

// メールアドレスに認証コードを送り、届いたコードで登録する
export function SignupEmailForm({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();

  // コード送信済みのメールアドレス。null の間はメールアドレス入力を表示する
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  return (
    <>
      <BackHeader
        onBack={sentEmail === null ? onBack : () => setSentEmail(null)}
      />
      <div className="px-8 pt-6">
        {sentEmail === null ? (
          <EmailStep onSent={setSentEmail} />
        ) : (
          <OtpStep
            email={sentEmail}
            submitLabel="登録する"
            onSuccess={() => navigate({ to: "/signup/profile" })}
          />
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
  } = useFormContext<SignupFormValues>();

  const sendOtp = useSendOtp();

  const onSubmit = handleSubmit(({ email }) => {
    sendOtp.mutate(
      { email },
      {
        onSuccess: () => onSent(email),
      },
    );
  });

  return (
    <>
      <h1 className="text-2xl font-bold">メールアドレスで新規登録</h1>
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

        <p className="text-sm leading-relaxed text-muted-foreground">
          アカウント登録すると、利用規約・プライバシーポリシー・コミュニティガイドラインに同意したこととみなします。
        </p>

        {sendOtp.isError && (
          <p className="text-sm font-medium text-error">
            {sendOtp.error.message}
          </p>
        )}

        <div className="mt-8">
          <Button type="submit" disabled={sendOtp.isPending}>
            {sendOtp.isPending ? "送信中..." : "コードを送る"}
          </Button>
        </div>
      </form>
    </>
  );
}
