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
import { apiClient, SERVER_ERROR_MESSAGE } from "../../lib/api-client";

export const Route = createFileRoute("/signup/profile")({
  component: SignupProfile,
});

type Step =
  "intro" | "gender" | "birthday" | "location" | "nickname" | "confirm";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateProfile = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    const values = form.getValues();

    const res = await apiClient.api.myprofile.$post({
      json: {
        nickname: values.nickname,
        gender: values.gender!,
        birthdate: `${values.birthYear}-${values.birthMonth.padStart(2, "0")}-${values.birthDay.padStart(2, "0")}`,
        prefectureCode: values.prefectureCode!,
      },
    });

    if (!res.ok) {
      setIsSubmitting(false);
      switch (res.status) {
        case 400:
          setErrorMessage("入力内容に誤りがあります。");
          break;
        case 500:
          setErrorMessage(SERVER_ERROR_MESSAGE);
          break;
        default:
          // exhaustive check
          const _exhaustiveCheck: never = res;
          throw new Error(`Unexpected status code: ${_exhaustiveCheck}`);
      }
      return;
    }

    navigate({ to: "/search" });
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
            errorMessage={errorMessage}
          />
        )}
      </main>
    </FormProvider>
  );
}
