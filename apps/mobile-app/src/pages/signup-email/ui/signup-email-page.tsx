import * as authLabel from "@urekoi/core/labels/auth";
import { router, Stack } from "expo-router";
import { ScrollView } from "react-native";
import { EmailForm, useSendOtp } from "@/features/auth-by-email";
import { AppText } from "@/shared/ui/app-text";

export function SignupEmailPage() {
  const sendOtp = useSendOtp();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <Stack.Screen options={{ headerShown: true, title: "" }} />
      <AppText type="title">{authLabel.signup.withEmail}</AppText>
      <AppText className="text-sm text-muted-foreground">
        {authLabel.signup.emailTermsNotice}
      </AppText>
      <EmailForm
        isSubmitting={sendOtp.isPending}
        onSubmit={(email) =>
          sendOtp.mutate(email, {
            onSuccess: () =>
              router.push({ pathname: "/signup/otp", params: { email } }),
          })
        }
      />
      {sendOtp.isError && (
        <AppText className="text-sm font-medium text-error">
          {sendOtp.error.message}
        </AppText>
      )}
    </ScrollView>
  );
}
