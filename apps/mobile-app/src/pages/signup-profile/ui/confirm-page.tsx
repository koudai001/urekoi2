import { getPrefectureName } from "@urekoi/core";
import type { ProfileFormValues } from "@urekoi/core/domain/profile";
import * as authLabel from "@urekoi/core/labels/auth";
import { router, Stack } from "expo-router";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { useCreateProfile } from "@/features/create-profile";
import { AppText } from "@/shared/ui/app-text";
import { Button } from "@/shared/ui/button";
import { Text } from "@/shared/ui/text";

const label = authLabel.signup.profile.confirm;
const genderLabel = authLabel.signup.profile.gender;

// 項目名と値を1行で表示する
function Row({ name, value }: { name: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between border-b border-border pb-3">
      <AppText className="text-sm text-muted-foreground">{name}</AppText>
      <AppText className="font-bold">{value}</AppText>
    </View>
  );
}

export function SignupProfileConfirmPage() {
  const { control, handleSubmit } = useFormContext<ProfileFormValues>();
  const values = useWatch({ control });
  const { errors } = useFormState({ control });
  const validationErrorMessages = Object.values(errors).map(
    (error) => error?.message,
  );
  const createProfile = useCreateProfile();
  const apiErrorMessage = createProfile.error?.message;
  const prefectureName = getPrefectureName(values.prefectureCode);

  const onSubmit = handleSubmit((formValues) => {
    createProfile.mutate(formValues, {
      onSuccess: () => router.replace("/search"),
    });
  });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-8 px-8 pt-6"
    >
      <Stack.Screen options={{ title: "" }} />
      <AppText type="title">{label.title}</AppText>
      <View className="gap-5">
        <Row name={label.nickname} value={values.nickname ?? ""} />
        <Row
          name={label.gender}
          value={values.gender ? genderLabel[values.gender] : ""}
        />
        <Row
          name={label.birthday}
          value={label.birthdayValue(
            values.birthYear ?? "",
            values.birthMonth ?? "",
            values.birthDay ?? "",
          )}
        />
        <Row name={label.prefecture} value={prefectureName} />
      </View>
      {validationErrorMessages.map((message) => (
        <AppText key={message} className="text-sm text-error">
          {message}
        </AppText>
      ))}
      {apiErrorMessage && (
        <AppText className="text-sm text-error">{apiErrorMessage}</AppText>
      )}
      <Button
        disabled={createProfile.isPending}
        onPress={() => onSubmit()}
        className="h-12 rounded-xl"
      >
        <Text>{createProfile.isPending ? label.submitting : label.submit}</Text>
      </Button>
    </ScrollView>
  );
}
