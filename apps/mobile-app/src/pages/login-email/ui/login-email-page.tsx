import * as authLabel from "@urekoi/core/labels/auth";
import { router, Stack } from "expo-router";
import { ScrollView } from "react-native";
import { EmailForm, useSendOtp } from "@/features/auth-by-email";
import { AppText } from "@/shared/ui/app-text";

export function LoginEmailPage() {
  const sendOtp = useSendOtp();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <Stack.Screen
        options={{ headerShown: true, title: authLabel.login.title }}
      />
      <AppText type="title">{authLabel.login.emailTitle}</AppText>
      <EmailForm
        isSubmitting={sendOtp.isPending}
        onSubmit={(email) =>
          sendOtp.mutate(email, {
            onSuccess: () =>
              router.push({ pathname: "/login/otp", params: { email } }),
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
