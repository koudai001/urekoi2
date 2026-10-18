import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { BackHeader } from "../ui/BackHeader";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { OtpStep } from "./OtpStep";
import { useSendOtp, emailSchema, type EmailFormValues } from "./use-login";

// メールアドレスにログインコードを送り、届いたコードでログインする
export function LoginEmailForm({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();

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
          <OtpStep
            email={sentEmail}
            submitLabel="ログインする"
            onSuccess={() => navigate({ to: "/search" })}
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
