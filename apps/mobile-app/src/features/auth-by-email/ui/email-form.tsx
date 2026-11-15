import { zodResolver } from "@hookform/resolvers/zod";
import * as authLabel from "@urekoi/core/labels/auth";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { AppText } from "@/shared/ui/app-text";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Text } from "@/shared/ui/text";
import { type EmailFormValues, emailSchema } from "../model/email-schema";

// メールアドレスを入力して、送信ボタンで親に渡す
export function EmailForm({ onSubmit }: { onSubmit: (email: string) => void }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  return (
    <View className="gap-6">
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={authLabel.email.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          )}
        />
        {errors.email && (
          <AppText className="mt-2 text-sm text-error">
            {errors.email.message}
          </AppText>
        )}
      </View>

      <Button
        onPress={() => handleSubmit(({ email }) => onSubmit(email))()}
        className="h-12 rounded-xl"
      >
        <Text>{authLabel.email.submit}</Text>
      </Button>
    </View>
  );
}
