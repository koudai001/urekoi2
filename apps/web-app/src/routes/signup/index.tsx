import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SignupConsent } from "../../components/signup/SignupConsent";
import { SignupEmailForm } from "../../components/signup/SignupEmailForm";
import { SignupLanding } from "../../components/signup/SignupLanding";
import {
  type SignupFormValues,
  signupSchema,
} from "../../components/signup/signup-schema";

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
    },
  });

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
        <SignupEmailForm onBack={() => setStep("consent")} />
      )}
    </FormProvider>
  );
}
