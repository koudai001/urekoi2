import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { authClient } from "../lib/auth-client";
import { SignupLanding } from "../components/signup/signup-landing";
import { SignupConsent } from "../components/signup/signup-consent";
import { SignupEmailForm } from "../components/signup/signup-email-form";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

const signupSchema = z
  .object({
    isAdult: z.boolean(),
    agreeTerms: z.boolean(),
    email: z.string(),
    password: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.isAdult) {
      ctx.addIssue({
        code: "custom",
        message: "18歳以上・独身であることの確認が必要です",
        path: ["isAdult"],
      });
    }
    if (!data.agreeTerms) {
      ctx.addIssue({
        code: "custom",
        message: "規約への同意が必要です",
        path: ["agreeTerms"],
      });
    }
    if (!z.string().email().safeParse(data.email).success) {
      ctx.addIssue({
        code: "custom",
        message: "メールアドレスの形式が正しくありません",
        path: ["email"],
      });
    }
    if (data.password.length < 8) {
      ctx.addIssue({
        code: "custom",
        message: "パスワードは8文字以上で入力してください",
        path: ["password"],
      });
    }
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

type Step = "select" | "consent" | "email";

function Signup() {
  const [step, setStep] = useState<Step>("select");
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      isAdult: false,
      agreeTerms: false,
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: SignupFormValues) {
    setIsPending(true);
    setErrorMessage(null);

    const { error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.email,
    });

    setIsPending(false);

    if (error) {
      setErrorMessage(error.message ?? "登録に失敗しました");
      return;
    }

    // TODO: プロフィール入力画面ができたらそちらへ遷移する
    navigate({ to: "/welcome" });
  }

  if (step === "select") {
    return <SignupLanding onSelectEmail={() => setStep("consent")} />;
  }

  return (
    <FormProvider {...form}>
      {step === "consent" ? (
        <SignupConsent
          onBack={() => setStep("select")}
          onNext={() => setStep("email")}
        />
      ) : (
        <SignupEmailForm
          isPending={isPending}
          errorMessage={errorMessage}
          onBack={() => setStep("consent")}
          onSubmit={handleSubmit}
        />
      )}
    </FormProvider>
  );
}
