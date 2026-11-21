import men1 from "@urekoi/core/assets/profiles/men-1.webp";
import woman1 from "@urekoi/core/assets/profiles/woman-1.webp";
import type { ProfileFormValues } from "@urekoi/core/domain/profile";
import * as authLabel from "@urekoi/core/labels/auth";
import { router, Stack } from "expo-router";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { cn } from "@/shared/lib/utils";
import { AppImage } from "@/shared/ui/app-image";
import { AppText } from "@/shared/ui/app-text";
import { Button } from "@/shared/ui/button";
import { Text } from "@/shared/ui/text";
import { StepProgress } from "./step-progress";

const label = authLabel.signup.profile.gender;
const options = [
  {
    value: "male",
    label: label.male,
    image: men1,
  },
  {
    value: "female",
    label: label.female,
    image: woman1,
  },
] as const;

export function SignupProfileGenderPage() {
  const { control, setValue } = useFormContext<ProfileFormValues>();
  const gender = useWatch({ control, name: "gender" });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <Stack.Screen options={{ title: "" }} />
      <StepProgress step={1} />
      <AppText type="title">{label.title}</AppText>
      <View className="flex-row justify-center gap-4">
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => setValue("gender", option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: gender === option.value }}
            className={cn(
              "items-center gap-3 rounded-full p-4",
              gender === option.value &&
                "bg-primary/10 border-2 border-primary",
            )}
          >
            <AppImage
              source={option.image}
              accessibilityLabel={option.label}
              className="size-24 rounded-full border-2 border-border"
            />
            <AppText className="text-lg font-bold">{option.label}</AppText>
          </Pressable>
        ))}
      </View>
      <Button
        disabled={!gender}
        onPress={() => router.push("/signup/profile/birthday")}
        className="h-12 rounded-xl"
      >
        <Text>{authLabel.signup.profile.next}</Text>
      </Button>
    </ScrollView>
  );
}
