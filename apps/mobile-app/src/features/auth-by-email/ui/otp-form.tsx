import { zodResolver } from "@hookform/resolvers/zod";
import * as authLabel from "@urekoi/core/labels/auth";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { AppText } from "@/shared/ui/app-text";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Text } from "@/shared/ui/text";
import { type OtpFormValues, otpSchema } from "../model/otp-schema";

// 6桁のコードを入力して、送信ボタンで親に渡す
export function OtpForm({
  submitLabel,
  onSubmit,
  isSubmitting,
}: {
  submitLabel: string;
  onSubmit: (otp: string) => void;
  isSubmitting: boolean;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  return (
    <View className="gap-6">
      <View>
        <Controller
          control={control}
          name="otp"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={authLabel.otp.placeholder}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              maxLength={6}
            />
          )}
        />
        {errors.otp && (
          <AppText className="mt-2 text-sm text-error">
            {errors.otp.message}
          </AppText>
        )}
      </View>

      <Button
        disabled={isSubmitting}
        onPress={() => handleSubmit(({ otp }) => onSubmit(otp))()}
        className="h-12 rounded-xl"
      >
        <Text>{isSubmitting ? authLabel.otp.submitting : submitLabel}</Text>
      </Button>
    </View>
  );
}
