import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SignupIntro } from "../../components/signup/profile/signup-intro";
import { SignupGender } from "../../components/signup/profile/signup-gender";
import { SignupBirthday } from "../../components/signup/profile/signup-birthday";
import { SignupLocation } from "../../components/signup/profile/signup-location";
import { SignupNickname } from "../../components/signup/profile/signup-nickname";
import { SignupConfirm } from "../../components/signup/profile/signup-confirm";
import {
  profileSchema,
  type ProfileFormValues,
} from "../../components/signup/profile/profile-schema";

export const Route = createFileRoute("/signup/profile")({
  component: SignupProfile,
});

type Step = "intro" | "gender" | "birthday" | "location" | "nickname" | "confirm";

function SignupProfile() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      nickname: "",
    },
  });
  const [step, setStep] = useState<Step>("intro");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // TODO: バックエンドにPOST /myprofileができたらここで呼び出す。今はフロントの流れだけ作る
  const handleCreateProfile = () => {
    setIsSubmitting(true);
    navigate({ to: "/" });
  };

  return (
    <FormProvider {...form}>
      <main className="flex min-h-svh flex-col">
        {step === "intro" ? (
          <SignupIntro onNext={() => setStep("gender")} />
        ) : step === "gender" ? (
          <SignupGender
            onBack={() => setStep("intro")}
            onNext={() => setStep("birthday")}
          />
        ) : step === "birthday" ? (
          <SignupBirthday
            onBack={() => setStep("gender")}
            onNext={() => setStep("location")}
          />
        ) : step === "location" ? (
          <SignupLocation
            onBack={() => setStep("birthday")}
            onNext={() => setStep("nickname")}
          />
        ) : step === "nickname" ? (
          <SignupNickname
            onBack={() => setStep("location")}
            onNext={() => setStep("confirm")}
          />
        ) : (
          <SignupConfirm
            onBack={() => setStep("nickname")}
            onNext={handleCreateProfile}
            isSubmitting={isSubmitting}
          />
        )}
      </main>
    </FormProvider>
  );
}
