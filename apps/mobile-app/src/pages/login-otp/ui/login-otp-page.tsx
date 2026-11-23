import * as authLabel from "@urekoi/core/labels/auth";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { OtpForm, useVerifyOtp } from "@/features/auth-by-email";
import { AppText } from "@/shared/ui/app-text";

export function LoginOtpPage() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const verifyOtp = useVerifyOtp();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <Stack.Screen
        options={{ headerShown: true, title: authLabel.login.title }}
      />
      <AppText type="title">{authLabel.otp.title}</AppText>
      <AppText>{authLabel.otp.sentTo(email)}</AppText>
      <OtpForm
        isSubmitting={verifyOtp.isPending}
        submitLabel={authLabel.login.otpSubmit}
        onSubmit={(otp) => verifyOtp.mutate({ email, otp })}
      />
      {verifyOtp.isError && (
        <AppText className="text-sm font-medium text-error">
          {verifyOtp.error.message}
        </AppText>
      )}
    </ScrollView>
  );
}
