import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { createFileRoute } from "@tanstack/react-router";
import { SignupLanding } from "../../components/signup/signup-landing";
import { SignupConsent } from "../../components/signup/signup-consent";
import { SignupEmailForm } from "../../components/signup/signup-email-form";
import {
  useSignup,
  signupSchema,
  type SignupFormValues,
} from "../../components/signup/use-signup";

export const Route = createFileRoute("/signup/")({
  component: Signup,
});

type Step = "select" | "consent" | "email";

function Signup() {
  const [step, setStep] = useState<Step>("select");

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      isAdult: false,
      agreeTerms: false,
      email: "",
      password: "",
    },
  });

  const signup = useSignup();

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
          isPending={signup.isPending}
          errorMessage={signup.isError ? signup.error.message : null}
          onBack={() => setStep("consent")}
          onSubmit={(data) => signup.mutate(data)}
        />
      )}
    </FormProvider>
  );
}
