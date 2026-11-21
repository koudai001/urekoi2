import {
  MAX_AGE,
  MIN_AGE,
  type ProfileFormValues,
} from "@urekoi/core/domain/profile";
import * as authLabel from "@urekoi/core/labels/auth";
import { router, Stack } from "expo-router";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { AppText } from "@/shared/ui/app-text";
import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picker";
import { Text } from "@/shared/ui/text";
import { StepProgress } from "./step-progress";

const label = authLabel.signup.profile.birthday;

// 今日から指定した年数だけさかのぼった日付
function yearsAgo(years: number) {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date;
}

export function SignupProfileBirthdayPage() {
  const oldest = yearsAgo(MAX_AGE);
  const youngest = yearsAgo(MIN_AGE);
  const { control, setValue, trigger } = useFormContext<ProfileFormValues>();
  const { errors } = useFormState({ control, name: "birthDay" });
  const [year, month, day] = useWatch({
    control,
    name: ["birthYear", "birthMonth", "birthDay"],
  });
  const birthday = year
    ? new Date(Number(year), Number(month) - 1, Number(day))
    : youngest;

  const handleChange = (date: Date) => {
    setValue("birthYear", String(date.getFullYear()));
    setValue("birthMonth", String(date.getMonth() + 1));
    setValue("birthDay", String(date.getDate()));
  };

  // 年齢ルールを確認してから次へ進む
  const handleNext = async () => {
    handleChange(birthday);
    const isValid = await trigger("birthDay");
    if (isValid) router.push("/signup/profile/location");
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <Stack.Screen options={{ title: "" }} />
      <StepProgress step={2} />
      <View className="gap-2">
        <AppText type="title">{label.title}</AppText>
        <AppText className="text-sm text-muted-foreground">
          {label.note}
        </AppText>
      </View>
      <DatePicker
        value={birthday}
        range={{ start: oldest, end: youngest }}
        onChange={handleChange}
      />
      {errors.birthDay && (
        <AppText className="text-center text-sm text-error">
          {errors.birthDay.message}
        </AppText>
      )}
      <Button onPress={handleNext} className="h-12 rounded-xl">
        <Text>{authLabel.signup.profile.next}</Text>
      </Button>
    </ScrollView>
  );
}
