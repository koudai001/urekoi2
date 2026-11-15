import * as authLabel from "@urekoi/core/labels/auth";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { OtpForm, useVerifyOtp } from "@/features/auth-by-email";
import { AppText } from "@/shared/ui/app-text";

export function SignupOtpPage() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const verifyOtp = useVerifyOtp();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <Stack.Screen options={{ headerShown: true, title: "" }} />
      <AppText type="title">{authLabel.otp.title}</AppText>
      <AppText>{authLabel.otp.sentTo(email)}</AppText>
      <OtpForm
        submitLabel={authLabel.signup.otpSubmit}
        onSubmit={(otp) =>
          verifyOtp.mutate(
            { email, otp },
            { onSuccess: () => router.replace("/signup/profile") },
          )
        }
      />
      {verifyOtp.isError && (
        <AppText className="text-sm font-medium text-error">
          {verifyOtp.error.message}
        </AppText>
      )}
    </ScrollView>
  );
}
