import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LoginEmailForm } from "../components/login/LoginEmailForm";
import { LoginLanding } from "../components/login/LoginLanding";

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
