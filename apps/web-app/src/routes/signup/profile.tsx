import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  type ProfileFormValues,
  profileSchema,
} from "@urekoi/core/domain/profile";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SignupBirthday } from "../../components/signup/profile/SignupBirthday";
import { SignupConfirm } from "../../components/signup/profile/SignupConfirm";
import { SignupGender } from "../../components/signup/profile/SignupGender";
import { SignupIntro } from "../../components/signup/profile/SignupIntro";
import { SignupLocation } from "../../components/signup/profile/SignupLocation";
import { SignupNickname } from "../../components/signup/profile/SignupNickname";
import { useCreateProfile } from "../../features/create-profile";
import { queryKeys } from "../../shared/api/query-keys";

export const Route = createFileRoute("/signup/profile")({
  component: SignupProfile,
});

type Step =
  | "intro"
  | "gender"
  | "birthday"
  | "location"
  | "nickname"
  | "confirm";

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
  const createProfile = useCreateProfile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCreateProfile = form.handleSubmit((values) => {
    createProfile.mutate(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: queryKeys.myprofile });
        navigate({ to: "/search" });
      },
    });
  });

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
            onNext={() => handleCreateProfile()}
            isSubmitting={createProfile.isPending}
            apiErrorMessage={createProfile.error?.message ?? null}
          />
        )}
      </main>
    </FormProvider>
  );
}
