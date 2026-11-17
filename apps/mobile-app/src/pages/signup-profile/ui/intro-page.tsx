import * as authLabel from "@urekoi/core/labels/auth";
import { router, Stack } from "expo-router";
import { ScrollView } from "react-native";
import { AppText } from "@/shared/ui/app-text";
import { Button } from "@/shared/ui/button";
import { Text } from "@/shared/ui/text";

export function SignupProfileIntroPage() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <Stack.Screen options={{ title: "" }} />
      <AppText type="title">{authLabel.signup.profile.intro.title}</AppText>
      <AppText className="text-sm text-muted-foreground">
        {authLabel.signup.profile.intro.duration}
      </AppText>
      <Button
        onPress={() => router.push("/signup/profile/gender")}
        className="h-12 rounded-xl"
      >
        <Text>{authLabel.signup.profile.next}</Text>
      </Button>
    </ScrollView>
  );
}
