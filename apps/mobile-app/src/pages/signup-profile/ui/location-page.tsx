import { PREFECTURES } from "@urekoi/core";
import type { ProfileFormValues } from "@urekoi/core/domain/profile";
import * as authLabel from "@urekoi/core/labels/auth";
import { router, Stack } from "expo-router";
import { Check } from "lucide-react-native";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { AppText } from "@/shared/ui/app-text";
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { Text } from "@/shared/ui/text";
import { StepProgress } from "./step-progress";

const label = authLabel.signup.profile.location;

export function SignupProfileLocationPage() {
  const { control, setValue } = useFormContext<ProfileFormValues>();
  const prefectureCode = useWatch({ control, name: "prefectureCode" });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <Stack.Screen options={{ title: "" }} />
      <StepProgress step={3} />
      <View className="gap-2">
        <AppText type="title">{label.title}</AppText>
        <AppText className="text-sm text-muted-foreground">
          {label.description}
        </AppText>
      </View>
      <ScrollView className="h-72" nestedScrollEnabled>
        {PREFECTURES.map((pref) => {
          const selected = prefectureCode === pref.code;
          return (
            <Pressable
              key={pref.code}
              onPress={() => setValue("prefectureCode", pref.code)}
              className="flex-row items-center gap-2.5 py-2.5"
            >
              <View className="w-4">
                {selected && (
                  <Icon as={Check} className="size-4 text-primary" />
                )}
              </View>
              <AppText
                className={
                  selected
                    ? "text-lg font-bold"
                    : "text-lg text-muted-foreground"
                }
              >
                {pref.name}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>
      <Button
        disabled={!prefectureCode}
        onPress={() => router.push("/signup/profile/nickname")}
        className="h-12 rounded-xl"
      >
        <Text>{authLabel.signup.profile.next}</Text>
      </Button>
    </ScrollView>
  );
}
