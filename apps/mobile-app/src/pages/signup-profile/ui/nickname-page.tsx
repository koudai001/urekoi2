import {
  MAX_NICKNAME_LENGTH,
  type ProfileFormValues,
} from "@urekoi/core/domain/profile";
import * as authLabel from "@urekoi/core/labels/auth";
import { router, Stack } from "expo-router";
import { useFormContext, useWatch } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { AppText } from "@/shared/ui/app-text";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Text } from "@/shared/ui/text";
import { StepProgress } from "./step-progress";

const label = authLabel.signup.profile.nickname;

export function SignupProfileNicknamePage() {
  const { control, setValue } = useFormContext<ProfileFormValues>();
  const nickname = useWatch({ control, name: "nickname" });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <Stack.Screen options={{ title: "" }} />
      <StepProgress step={4} />
      <View className="gap-2">
        <AppText type="title">{label.title}</AppText>
        <AppText className="text-sm text-muted-foreground">
          {label.description}
        </AppText>
      </View>
      <Input
        value={nickname}
        onChangeText={(text) => setValue("nickname", text)}
        placeholder={label.placeholder}
        maxLength={MAX_NICKNAME_LENGTH}
      />
      <Button
        disabled={nickname.trim().length === 0}
        onPress={() => router.push("/signup/profile/confirm")}
        className="h-12 rounded-xl"
      >
        <Text>{authLabel.signup.profile.next}</Text>
      </Button>
    </ScrollView>
  );
}
