import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ProfileFormValues,
  profileSchema,
} from "@urekoi/core/domain/profile";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";

export default function SignupProfileLayout() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      nickname: "",
    },
  });

  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </FormProvider>
  );
}
