import * as authLabel from "@urekoi/core/labels/auth";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { AppText } from "@/shared/ui/app-text";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Text } from "@/shared/ui/text";

export function SignupConsentPage() {
  const [isAdult, setIsAdult] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const canProceed = isAdult && agreeTerms;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="px-8 pt-6"
    >
      <Stack.Screen options={{ headerShown: true, title: "" }} />
      <AppText className="mb-8 text-center text-sm text-muted-foreground">
        {authLabel.signup.consent.lead}
      </AppText>

      <View className="gap-4">
        <Pressable
          onPress={() => setIsAdult(!isAdult)}
          className="flex-row items-center gap-3"
        >
          <Checkbox
            checked={isAdult}
            onCheckedChange={setIsAdult}
            className="size-6"
          />
          <AppText>{authLabel.signup.consent.ageRule}</AppText>
        </Pressable>

        <Pressable
          onPress={() => setAgreeTerms(!agreeTerms)}
          className="flex-row items-center gap-3"
        >
          <Checkbox
            checked={agreeTerms}
            onCheckedChange={setAgreeTerms}
            className="size-6"
          />
          <AppText>
            {authLabel.signup.consent.termsPrefix}
            <AppText className="text-primary">*</AppText>
            {authLabel.signup.consent.termsSuffix}
          </AppText>
        </Pressable>
      </View>

      <AppText className="mt-5 text-sm font-medium text-primary">
        {authLabel.signup.consent.termsNote}
      </AppText>

      <Button
        disabled={!canProceed}
        onPress={() => router.push("/signup/email")}
        className="mt-8 h-12 rounded-xl"
      >
        <Text>{authLabel.signup.consent.submit}</Text>
      </Button>
    </ScrollView>
  );
}
