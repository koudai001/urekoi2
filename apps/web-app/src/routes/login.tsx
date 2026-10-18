import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LoginLanding } from "../components/login/LoginLanding";
import { LoginEmailForm } from "../components/login/LoginEmailForm";

export const Route = createFileRoute("/login")({
  component: Login,
});

type Step = "select" | "email";

function Login() {
  const [step, setStep] = useState<Step>("select");

  if (step === "select") {
    return <LoginLanding onSelectEmail={() => setStep("email")} />;
  }

  return <LoginEmailForm onBack={() => setStep("select")} />;
}
